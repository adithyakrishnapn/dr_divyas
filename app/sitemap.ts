import type { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "@/lib/blog";
import { localAreaPages } from "@/lib/local-area-pages";
import { seoLandingPageSlugs } from "@/lib/seo-landing-pages";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsForSitemap();

  const staticRoutes = ["", "/about", "/treatments", "/blog", "/contact", "/coimbatore"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    }),
  );

  const areaRoutes = localAreaPages.map((page) => ({
    url: `${siteConfig.url}/coimbatore/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const seoLandingRoutes = seoLandingPageSlugs.map((slug) => ({
    url: `${siteConfig.url}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...areaRoutes, ...seoLandingRoutes, ...blogRoutes];
}
