import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getPortalSession } from "@/lib/auth";
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Firebase Admin is not configured." }, { status: 503 });
  }

  const { id } = await params;

  try {
    const db = getFirebaseAdminDb();
    const followupsSnapshot = await db
      .collection("contactLeads")
      .doc(id)
      .collection("followups")
      .orderBy("sentAt", "desc")
      .get();

    const followups = followupsSnapshot.docs.map((doc) => {
      const data = doc.data();
      let sentAtIso = null;
      if (data.sentAt) {
        if (typeof data.sentAt.toDate === "function") {
          sentAtIso = data.sentAt.toDate().toISOString();
        } else if (data.sentAt._seconds) {
          sentAtIso = new Date(data.sentAt._seconds * 1000).toISOString();
        } else {
          sentAtIso = new Date(data.sentAt).toISOString();
        }
      }

      return {
        id: doc.id,
        type: String(data.type || ""),
        content: String(data.content || ""),
        subject: data.subject ? String(data.subject) : undefined,
        sentAt: sentAtIso,
        sentBy: String(data.sentBy || "system"),
      };
    });

    return NextResponse.json({ followups });
  } catch (error) {
    console.error("Error fetching followups:", error);
    return NextResponse.json({ error: "Failed to fetch followups." }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Firebase Admin is not configured." }, { status: 503 });
  }

  const { id } = await params;

  try {
    const body = (await request.json()) as {
      type: "whatsapp" | "email";
      content: string;
      subject?: string;
    };

    if (!body.type || !body.content) {
      return NextResponse.json({ error: "Type and content are required." }, { status: 400 });
    }

    const db = getFirebaseAdminDb();

    // Check if the lead exists first
    const leadRef = db.collection("contactLeads").doc(id);
    const leadDoc = await leadRef.get();
    if (!leadDoc.exists) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    const docRef = await leadRef.collection("followups").add({
      type: body.type,
      content: body.content,
      subject: body.subject || null,
      sentAt: FieldValue.serverTimestamp(),
      sentBy: session.email || session.uid,
    });

    // Update parent lead with last follow up tracking info
    await leadRef.update({
      lastFollowUpAt: FieldValue.serverTimestamp(),
      lastFollowUpType: body.type,
    });

    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (error) {
    console.error("Error logging followup:", error);
    return NextResponse.json({ error: "Failed to log followup." }, { status: 500 });
  }
}
