import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  absoluteTitle?: boolean;
  /**
   * Optional explicit canonical URL. Use only when this page should declare
   * a different URL as its canonical version (e.g. a blog post that is a
   * near-duplicate of another). When absent, the canonical is automatically
   * derived from `path` and the production origin.
   */
  canonicalUrl?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  absoluteTitle = false,
  canonicalUrl,
}: BuildMetadataInput): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`;
  const resolvedTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const metadataTitle = absoluteTitle ? { absolute: resolvedTitle } : title;

  // Use the explicit canonical when provided; otherwise self-reference using path.
  // Next.js resolves relative paths against metadataBase (siteConfig.url).
  const canonical = canonicalUrl ?? url;

  return {
    title: metadataTitle,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}
