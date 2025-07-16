'use client';

import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitting(true);
    alert("Mensagem enviada com sucesso!");
  }
  return (
    <section id="contato" className="bg-background py-20 px-4 transition-colors">
      <div className="container max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-3 text-secondary">
          Fale com a gente
        </h2>
        <p className="mb-8 text-center text-muted">
          Tem dúvidas ou sugestôes? Envie uma mensagem para nossa equipe.
        </p>
        <form className="flex flex-col gap-5 bg-contact rounded-2xl shadow-card px-6 py-8" onSubmit={handleSubmit} aria-label="Formulário de contato">

          <label className="flex flex-col gap-2">
            Seu nome
            <input required name="name" type="text" className="rounded-md border border-gray-300 p-3 bg-slate-50 focus:ring-2 focus:ring-primary focs:outline-none text-black" aria-label="Seu nome" autoComplete="name" />
          </label>
          <label className="flex flex-col gap-2">
            Seu e-mail
            <input required name="email" type="email" className="rounded-md border boder-gray-300 p-3 bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none text-black" aria-label="Seu e-mail" autoComplete="email" />
          </label>
          <label className="flex flex-col gap-2">
            Sua mensagem
            <textarea required name="message" rows={4} className="rounded-md border border-gray-300 p-3 resize-none bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none text-black" aria-label="Sua mensagem" />
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
      </div>
    </section>
  )
}