import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getFirebaseAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export const SESSION_COOKIE_NAME = "admin_session";

export type AdminSession = {
  uid: string;
  email?: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isFirebaseAdminConfigured()) {
    return null;
  }

  const store = await cookies();
  const sessionCookie = store.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await getFirebaseAdminAuth().verifySessionCookie(sessionCookie, true);
    return {
      uid: decoded.uid,
      email: decoded.email,
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
