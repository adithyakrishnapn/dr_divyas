import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { getPostBySlug } from "@/lib/blog";
import { BlogEditorForm } from "../new/new-blog-form";

type BlogEditPageProps = {
  params: Promise<{ slug: string }>;
};

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