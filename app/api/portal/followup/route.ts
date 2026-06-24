import { NextResponse } from "next/server";
import { getPortalSession } from "@/lib/auth";
import { sendFollowUpEmail } from "@/lib/email";

export async function POST(request: Request) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      toEmail?: string;
      name?: string;
      subject?: string;
      message?: string;
    };

    const toEmail = String(body.toEmail || "").trim();
    const name = String(body.name || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!toEmail || !name || !subject || !message) {
      return NextResponse.json(
        { error: "Email, name, subject, and message are required." },
        { status: 400 },
      );
    }

    const result = await sendFollowUpEmail({
      toEmail,
      name,
      subject,
      message,
    });

    if (!result.sent) {
      return NextResponse.json({ error: result.reason || "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending follow-up email:", error);
    return NextResponse.json({ error: "Failed to send follow-up email." }, { status: 500 });
  }
}
