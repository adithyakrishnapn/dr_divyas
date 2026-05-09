import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`;
  const resolvedTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const metadataTitle = absoluteTitle ? { absolute: resolvedTitle } : title;

  return {
    title: metadataTitle,
    description,
    keywords,
    alternates: { canonical: url },
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
