import nodemailer from "nodemailer";
import { ContactData } from "@/types/contact";


export async function sendContactEmail(data: ContactData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const message = `
      <h1>New Contact Message</h1>
      <p>
        <strong>Nome: </strong> ${data.name}
      </p>
      <p>
        <strong>Email: </strong> ${data.email}
      </p>
      <p>
        <strong>Mensagem: </strong><br/> ${data.message}
      </p>
    `

  await transporter.sendMail({
    from: `Contato DevBoost <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: `Nova mensagem de contato de ${data.name}`,
    html: message,
  })
}