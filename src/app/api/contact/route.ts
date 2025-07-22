import { sendContactEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    const errors: string[] = [];

    if (!name || typeof name !== "string") {
      errors.push("Nome inválido");
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      errors.push("Email inválido");
    }

    if (!message || typeof message !== "string") {
      errors.push("Mensagem inválida");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    await sendContactEmail({ name, email, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json({ error: "Erro interno do servidor. Tente novamente mais tarde." }, { status: 500 });
  }
}