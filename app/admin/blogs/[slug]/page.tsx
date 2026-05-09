import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { getPostBySlug } from "@/lib/blog";
import { BlogEditorForm } from "../new/new-blog-form";
import { buildMetadata } from "@/lib/seo";

type BlogEditPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogEditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return buildMetadata({
    title: post ? `Edit ${post.title}` : "Edit Blog Post",
    description: post
      ? `Edit the SEO, content, and publishing details for ${post.title}.`
      : "Edit an existing clinic blog post from the admin dashboard.",
    path: `/admin/blogs/${slug}`,
    keywords: ["edit blog post", "blog cms", "clinic content"],
  });
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  await requireAdminSession();
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogEditorForm
      mode="edit"
      currentSlug={slug}
      submitLabel="Update Blog"
      initialValues={{
        title: post.title,
        slug: post.slug,
        description: post.description,
        image: post.image,
        keywords: post.keywords.join(", "),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        contentHtml: post.contentHtml,
        published: post.published,
      }}
    />
  );
}