import { sendContactEmail } from "@/lib/email";
import rateLimit from "next-rate-limit";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";


const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
})
export async function POST(request: NextRequest) {
  try {
    const headers = limiter.checkNext(request, 10);
    if (headers instanceof Error) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente mais tarde." },
        { status: 429 }
      )
    }

    const body = await request.json();
    const errors: string[] = [];

    const name = validator.escape(body.name || "");
    const email = validator.normalizeEmail(body.email || "") || "";
    const message = validator.escape(body.message || "");

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
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    await sendContactEmail({ name, email, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json({ error: "Erro interno do servidor. Tente novamente mais tarde." }, { status: 500 });
  }
}