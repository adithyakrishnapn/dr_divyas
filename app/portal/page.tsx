import type { Metadata } from "next";
import { requirePortalSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import PortalClient from "./portal-client";

export const metadata: Metadata = buildMetadata({
  title: "Follow-up Portal",
  description: "Secure lead tracking and follow-up portal.",
  path: "/portal",
  keywords: ["portal", "leads tracking", "follow-up manager"],
});

// Disable static rendering to ensure dynamic session cookies are evaluated
export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const session = await requirePortalSession();

  return <PortalClient sessionEmail={session.email ?? session.uid} />;
}
