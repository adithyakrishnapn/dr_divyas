import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PortalLoginClient from "./login-client";

export const metadata: Metadata = buildMetadata({
  title: "Portal Login",
  description: "Sign in to manage contact leads and send patient follow-ups.",
  path: "/portal/login",
  keywords: ["portal login", "leads tracking", "patient follow-up"],
});

export default function PortalLoginPage() {
  return <PortalLoginClient />;
}
