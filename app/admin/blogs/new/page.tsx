import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/auth";
import { NewBlogForm } from "./new-blog-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "New Blog Post",
  description: "Create a new SEO-friendly clinic blog post from the admin area.",
  path: "/admin/blogs/new",
  keywords: ["new blog post", "blog editor", "seo content"],
});

export default async function NewBlogPage() {
  await requireAdminSession();
  return <NewBlogForm />;
}
