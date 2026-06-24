import { NextResponse } from "next/server";
import { getPortalSession } from "@/lib/auth";
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export async function GET() {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Firebase Admin is not configured." }, { status: 503 });
  }

  try {
    const db = getFirebaseAdminDb();
    const leadsSnapshot = await db.collection("contactLeads").orderBy("createdAt", "desc").get();

    const leads = leadsSnapshot.docs.map((doc) => {
      const data = doc.data();
      let createdAtIso = null;
      if (data.createdAt) {
        if (typeof data.createdAt.toDate === "function") {
          createdAtIso = data.createdAt.toDate().toISOString();
        } else if (data.createdAt._seconds) {
          createdAtIso = new Date(data.createdAt._seconds * 1000).toISOString();
        } else {
          createdAtIso = new Date(data.createdAt).toISOString();
        }
      }

      return {
        id: doc.id,
        name: String(data.name || "Unknown"),
        phone: String(data.phone || ""),
        email: String(data.email || ""),
        concern: String(data.concern || ""),
        message: String(data.message || ""),
        source: String(data.source || "website"),
        createdAt: createdAtIso,
      };
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}
