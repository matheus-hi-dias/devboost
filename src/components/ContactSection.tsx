"use client";

import { HttpError } from "@/types/HttpError";
import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Toast } from "./Toast";
import { ContactData } from "@/types/contact";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validateFields(data: ContactData) {
    const errors: FieldErrors = {};
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim() === ""
    ) {
      errors.name = "Nome é obrigatório";
    }

    if (
      !data.email ||
      typeof data.email !== "string" ||
      !data.email.includes("@")
    ) {
      errors.email = "Email inválido";
    }

    if (
      !data.message ||
      typeof data.message !== "string" ||
      data.message.trim() === ""
    ) {
      errors.message = "Mensagem é obrigatória";
    }
    return errors;
  }

  function handleFieldChange(field: keyof FieldErrors, value: string) {
    const currentValues = {
      name:
        field === "name"
          ? value
          : (document.forms[0].elements.namedItem("name") as HTMLInputElement)
              ?.value || "",
      email:
        field === "email"
          ? value
          : (document.forms[0].elements.namedItem("email") as HTMLInputElement)
              ?.value || "",
      message:
        field === "message"
          ? value
          : (
              document.forms[0].elements.namedItem(
                "message",
              ) as HTMLInputElement
            )?.value || "",
    };

    // Valide todos os campos, mas só atualize o erro do campo alterado
    const errors = validateFields(currentValues as ContactData);
    setFieldErrors(prev => ({
      ...prev,
      [field]: errors[field],
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setSuccess(false);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const errors = validateFields(data as ContactData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const field = event.currentTarget.elements.namedItem(
        firstErrorField,
      ) as HTMLElement | null;
      field?.focus();
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        let errorMsg = "Erro desconhecido";
        if (Array.isArray(result.error)) {
          errorMsg = result.error.join(", ");
        } else if (typeof result.error === "string") {
          errorMsg = result.error;
        }
        throw new HttpError(errorMsg, res.status);
      }
      setSuccess(true);
      setFieldErrors({});
      if (event.currentTarget instanceof HTMLFormElement) {
        event.currentTarget.reset();
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      if (error instanceof HttpError) {
        setError(`Erro ${error.status}: ${error.message}`);
      } else {
        setError("Erro ao enviar a mensagem. Tente novamente mais tarde.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-background py-20 px-4 transition-colors"
    >
      <div className="container max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-3">
          Fale com a gente
        </h2>
        <p className="mb-8 text-center text-muted">
          Tem dúvidas ou sugestões? Envie uma mensagem para nossa equipe.
        </p>
        <form
          className="flex flex-col gap-5 bg-contact rounded-2xl shadow-card px-6 py-8"
          onSubmit={handleSubmit}
          aria-label="Formulário de contato"
          noValidate
        >
          <label className="flex flex-col gap-2">
            Seu nome
            <input
              required
              name="name"
              type="text"
              className={`rounded-md border p-3 bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none text-black
                ${fieldErrors.name ? "border-error" : "border-gray-300"}
              `}
              aria-label="Seu nome"
              aria-required="true"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              autoComplete="name"
              onChange={e => handleFieldChange("name", e.target.value)}
            />
            {fieldErrors.name && (
              <span id="name-error" className="text-error text-sm" role="alert">
                {fieldErrors.name}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2">
            Seu e-mail
            <input
              required
              name="email"
              type="email"
              className={`rounded-md border p-3 bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none text-black ${
                fieldErrors.email ? "border-error" : "border-gray-300"
              }`}
              aria-label="Seu e-mail"
              aria-required="true"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              autoComplete="email"
              onChange={e => handleFieldChange("email", e.target.value)}
            />
            {fieldErrors.email && (
              <span
                id="email-error"
                className="text-error text-sm"
                role="alert"
              >
                {fieldErrors.email}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2">
            Sua mensagem
            <textarea
              required
              name="message"
              rows={4}
              className={`rounded-md border p-3 resize-none bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none text-black ${
                fieldErrors.message ? "border-error" : "border-gray-300"
              }`}
              aria-label="Sua mensagem"
              aria-required="true"
              aria-invalid={!!fieldErrors.message}
              aria-describedby={
                fieldErrors.message ? "message-error" : undefined
              }
              onChange={e => handleFieldChange("message", e.target.value)}
            />
            {fieldErrors.message && (
              <span
                id="message-error"
                className="text-error text-sm"
                role="alert"
              >
                {fieldErrors.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3 text-base font-bold transition hover:bg-[hsl(var(--primary)/0.9)] focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="h-5 w-5" />
                Enviar
              </>
            )}
          </button>
        </form>
        {success && (
          <Toast
            message="Mensagem enviada com sucesso!"
            type="success"
            onClose={() => setSuccess(false)}
          />
        )}
        {error && (
          <Toast message={error} type="error" onClose={() => setError(null)} />
        )}
      </div>
    </section>
  );
}
