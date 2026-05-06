import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "uniaoflexcomercial@outlook.com",
        pass: process.env.EMAIL_PASS || "",
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    const mailOptions = {
      from: `"Site União Flex" <${process.env.EMAIL_USER || "uniaoflexcomercial@outlook.com"}>`,
      to: "uniaoflexcomercial@outlook.com",
      subject: `[SUPORTE SITE] ${assunto}`,
      text: `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`,
      replyTo: email
    };

    if (!process.env.EMAIL_PASS) {
      return res.json({ success: true, message: "Simulated success (configure EMAIL_PASS for real send)." });
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Erro ao enviar o e-mail. Tente novamente mais tarde." });
  }
}
