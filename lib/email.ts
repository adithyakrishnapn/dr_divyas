import nodemailer from "nodemailer";

export type MailContext = {
  subject: string;
  title: string;
  preheader: string;
  body: string;
  details: Array<{ label: string; value: string }>;
  ctaText?: string;
  ctaUrl?: string;
};

type LeadEmailInput = {
  name: string;
  phone: string;
  email: string;
  concern: string;
  message: string;
  source: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  secure: boolean;
};

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "0");
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const fromEmail = process.env.SMTP_FROM_EMAIL;
  const fromName = process.env.SMTP_FROM_NAME ?? "Dr Divya's Skin & Hair Clinic";
  const toEmail = process.env.SMTP_TO_EMAIL;
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !port || !user || !password || !fromEmail || !toEmail) {
    return null;
  }

  return { host, port, user, password, fromEmail, fromName, toEmail, secure };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildEmailHtml(context: MailContext) {
  const detailsMarkup = context.details
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px 0; width: 150px; color: #7c5a35; font-size: 14px; font-weight: 700; vertical-align: top;">${escapeHtml(item.label)}</td>
          <td style="padding: 10px 0; color: #334155; font-size: 14px; line-height: 1.7;">${escapeHtml(item.value).replace(/\n/g, "<br />")}</td>
        </tr>`,
    )
    .join("");

  const ctaMarkup = context.ctaUrl && context.ctaText
    ? `
      <div style="margin-top: 28px;">
        <a href="${escapeHtml(context.ctaUrl)}" style="display:inline-block;background:linear-gradient(135deg,#b45309,#f59e0b);color:#fff;text-decoration:none;padding:14px 22px;border-radius:12px;font-weight:700;">${escapeHtml(context.ctaText)}</a>
      </div>`
    : "";

  return `
    <div style="margin:0;padding:0;background:#f8f3ea;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
        <div style="background:linear-gradient(135deg,#7c2d12,#d97706);padding:20px 24px;border-radius:22px 22px 0 0;color:#fff;">
          <div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;opacity:.9;">Dr Divya's Skin & Hair Clinic</div>
          <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">${escapeHtml(context.title)}</h1>
          <p style="margin:10px 0 0;font-size:14px;opacity:.92;">${escapeHtml(context.preheader)}</p>
        </div>
        <div style="background:#ffffff;padding:28px 24px 30px;border-radius:0 0 22px 22px;box-shadow:0 20px 45px rgba(124,58,237,0.08);">
          <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#334155;">${escapeHtml(context.body)}</p>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              ${detailsMarkup}
            </tbody>
          </table>
          ${ctaMarkup}
          <p style="margin:28px 0 0;color:#64748b;font-size:12px;line-height:1.6;">This message was sent from the clinic website. Please reply to this email or contact the patient directly if this is a lead notification.</p>
        </div>
      </div>
    </div>
  `;
}

function getTransporter() {
  const config = getSmtpConfig();

  if (!config) {
    return null;
  }

  return {
    config,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    }),
  };
}

export async function sendClinicLeadNotification(input: LeadEmailInput) {
  const transport = getTransporter();

  if (!transport) {
    return { sent: false, reason: "SMTP is not configured." };
  }

  const html = buildEmailHtml({
    subject: `New clinic lead from ${input.name}`,
    title: "New Lead Received",
    preheader: `Source: ${input.source}`,
    body: `A new contact request was submitted from the website. Review the details below and follow up promptly.`,
    details: [
      { label: "Name", value: input.name },
      { label: "Phone", value: input.phone },
      { label: "Email", value: input.email || "Not provided" },
      { label: "Concern", value: input.concern || "Not provided" },
      { label: "Message", value: input.message },
      { label: "Source", value: input.source },
    ],
  });

  await transport.transporter.sendMail({
    from: `"${transport.config.fromName}" <${transport.config.fromEmail}>`,
    to: transport.config.toEmail,
    subject: `New clinic lead from ${input.name}`,
    html,
  });

  return { sent: true };
}

export async function sendClinicLeadAcknowledgement(input: LeadEmailInput) {
  const transport = getTransporter();

  if (!transport || !input.email) {
    return { sent: false, reason: "SMTP is not configured or lead email is missing." };
  }

  const html = buildEmailHtml({
    subject: "We received your request",
    title: "Thanks for contacting us",
    preheader: "Your request has been received by Dr Divya's team.",
    body: `Hello ${input.name},\n\nThank you for reaching out to Dr Divya's Skin & Hair Clinic. Our team has received your request and will contact you soon.`,
    details: [
      { label: "Concern", value: input.concern || "Not provided" },
      { label: "Message", value: input.message },
    ],
    ctaText: "Visit the website",
    ctaUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  });

  await transport.transporter.sendMail({
    from: `"${transport.config.fromName}" <${transport.config.fromEmail}>`,
    to: input.email,
    subject: "We received your request",
    html,
  });

  return { sent: true };
}

type FollowUpSmtpConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  fromEmail: string;
  fromName: string;
  secure: boolean;
};

function getFollowUpSmtpConfig(): FollowUpSmtpConfig | null {
  const host = process.env.FOLLOWUP_SMTP_HOST || process.env.SMTP_HOST;
  const port = Number(process.env.FOLLOWUP_SMTP_PORT || process.env.SMTP_PORT || "0");
  const user = process.env.FOLLOWUP_SMTP_USER;
  const password = process.env.FOLLOWUP_SMTP_PASSWORD;
  const fromEmail = process.env.FOLLOWUP_SMTP_FROM_EMAIL;
  const fromName = process.env.SMTP_FROM_NAME ?? "Dr Divya's Skin & Hair Clinic";
  const secure = process.env.FOLLOWUP_SMTP_SECURE
    ? process.env.FOLLOWUP_SMTP_SECURE === "true"
    : process.env.SMTP_SECURE === "true";

  if (!host || !port || !user || !password || !fromEmail) {
    return null;
  }

  return { host, port, user, password, fromEmail, fromName, secure };
}

function getFollowUpTransporter() {
  const config = getFollowUpSmtpConfig();

  if (!config) {
    return null;
  }

  return {
    config,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    }),
  };
}

export async function sendFollowUpEmail({
  toEmail,
  name,
  subject,
  message,
}: {
  toEmail: string;
  name: string;
  subject: string;
  message: string;
}) {
  const transport = getFollowUpTransporter();

  if (!transport) {
    return { sent: false, reason: "Follow-up SMTP is not configured in .env." };
  }

  const html = buildEmailHtml({
    subject: subject,
    title: "Follow-up Message",
    preheader: "A message from Dr Divya's team",
    body: message,
    details: [],
  });

  await transport.transporter.sendMail({
    from: `"${transport.config.fromName}" <${transport.config.fromEmail}>`,
    to: toEmail,
    subject: subject,
    html,
  });

  return { sent: true };
}