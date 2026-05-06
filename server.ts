import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails
  app.post("/api/send-email", async (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      // Configure transport (Outlook settings)
      // Note: In a real production environment, you would use secrets for these values.
      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER || "uniaoflexcomercial@outlook.com",
          pass: process.env.EMAIL_PASS || "", // User must provide this in environment variables
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

      // For this demo, if no password is set, we'll simulate success but log a warning.
      if (!process.env.EMAIL_PASS) {
        console.warn("EMAIL_PASS is not set. Simulating success response.");
        return res.json({ success: true, message: "Simulated success (configure EMAIL_PASS for real send)." });
      }

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Erro ao enviar o e-mail. Tente novamente mais tarde." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
