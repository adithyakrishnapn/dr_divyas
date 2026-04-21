import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read skincare guides and dermatologist tips from Dr Divya on acne care, pigmentation, and healthy skin routines.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogList posts={blogPosts} />;
}
