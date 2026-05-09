import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import AdminLoginClient from "./login-client";

export const metadata: Metadata = buildMetadata({
  title: "Admin Login",
  description: "Sign in to manage clinic blogs, analytics, and website content.",
  path: "/admin/login",
  keywords: ["admin login", "clinic cms", "content management"],
});

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
