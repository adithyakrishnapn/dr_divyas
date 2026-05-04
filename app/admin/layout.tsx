import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin",
  description: "Admin dashboard for clinic website content and analytics.",
  path: "/admin",
  keywords: ["admin", "dashboard", "clinic cms"],
});

metadata.robots = { index: false, follow: false };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
