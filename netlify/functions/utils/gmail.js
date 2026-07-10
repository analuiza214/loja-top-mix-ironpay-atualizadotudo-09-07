const nodemailer = require("nodemailer");

/**
 * Envia email usando a conta Gmail configurada nas variáveis de ambiente:
 *   GMAIL_USER         → seu endereço @gmail.com
 *   GMAIL_APP_PASSWORD → senha de app gerada em https://myaccount.google.com/apppasswords
 *
 * Retorna: { ok: true, id } em sucesso, ou lança erro com mensagem explicativa.
 */
async function sendGmail({ to, subject, html, fromName }) {
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

  if (!GMAIL_USER) {
    throw new Error("GMAIL_USER nao configurado nas variaveis de ambiente do Netlify (seu endereco @gmail.com)");
  }
  if (!GMAIL_APP_PASSWORD) {
    throw new Error("GMAIL_APP_PASSWORD nao configurado. Gere uma senha de app em https://myaccount.google.com/apppasswords e adicione nas variaveis de ambiente do Netlify");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: fromName ? `"${fromName}" <${GMAIL_USER}>` : GMAIL_USER,
    to,
    subject,
    html,
  });

  return { ok: true, id: info.messageId };
}

module.exports = { sendGmail };
