import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Secure admin dashboard for managing clinic website content and analytics.",
  path: "/admin",
  keywords: ["admin dashboard", "clinic cms", "content management"],
});

metadata.robots = { index: false, follow: false };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
