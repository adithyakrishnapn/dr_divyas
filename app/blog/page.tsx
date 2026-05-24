import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { BlogList } from "./blog-list";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Dermatology Blog, Skin Care Tips & Treatment Guides",
  description:
    "Read dermatologist-approved skincare articles on acne, pigmentation, anti-aging, hair health, and treatment guides from Dr Divya.",
  path: "/blog",
  keywords: [
    "skincare blog",
    "dermatology tips",
    "acne blog",
    "skin care routine",
    "hair health",
  ],
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogList posts={posts} />;
}
