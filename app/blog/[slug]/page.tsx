import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { BlogDetailClient } from "./blog-detail-client";

export const dynamic = "force-dynamic";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Blog Not Found",
      description: "The requested blog article was not found.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.image,
  });
}

function buildBlogSchema(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.doctor.name,
      jobTitle: siteConfig.doctor.role,
    },
    publisher: {
      "@type": "MedicalClinic",
      "@id": `${siteConfig.url}/#clinic`,
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogDetailClient post={post} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogSchema(post)) }}
      />
    </>
  );
}
