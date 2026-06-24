import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  sendClinicLeadAcknowledgement,
  sendClinicLeadNotification,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      concern?: string;
      message?: string;
      source?: string;
    };

    const name = String(payload.name ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const concern = String(payload.concern ?? "").trim();
    const message = String(payload.message ?? "").trim();
    const source = String(payload.source ?? "website-popup").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone and message are required." },
        { status: 400 },
      );
    }

    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json(
        { error: "Contact capture is not configured yet." },
        { status: 503 },
      );
    }

    await getFirebaseAdminDb().collection("contactLeads").add({
      name,
      phone,
      email,
      concern,
      message,
      source,
      createdAt: FieldValue.serverTimestamp(),
    });

    const lead = { name, phone, email, concern, message, source };

    try {
      await sendClinicLeadNotification(lead);
    } catch (error) {
      console.warn("Unable to send clinic lead notification email.", error);
    }

    try {
      await sendClinicLeadAcknowledgement(lead);
    } catch (error) {
      console.warn("Unable to send clinic lead acknowledgement email.", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json({ error: "Failed to submit contact form." }, { status: 500 });
  }
}
