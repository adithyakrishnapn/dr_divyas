import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { localAreaPages } from "@/lib/local-area-pages";

export const metadata: Metadata = buildMetadata({
  title: "Clinic Locations in Coimbatore",
  description:
    "Explore Dr Divya's Skin & Hair Clinic location pages for patients across Saravanampatti, Ganapathy, Thudiyalur, Peelamedu, Gandhipuram, RS Puram, Annur, Singanallur, Saibaba Colony, Vadavalli, Kovaipudur, Race Course, Hope College, and Avinashi Road.",
  path: "/coimbatore",
  keywords: [
    "clinic locations in coimbatore",
    "skin clinic in coimbatore",
    "coimbatore clinic locations",
    "best dermatologist in coimbatore",
  ],
});

export default function CoimbatoreAreaHubPage() {
  return (
    <main className="relative min-h-screen py-16 md:py-20">
      <div className="page-shell">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
            Coimbatore clinic locations
          </p>
          <h1 className="text-4xl font-bold text-amber-900 md:text-6xl">
            Clinic information by Coimbatore location
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 md:text-xl">
            These pages help patients quickly find clinic details, treatments, directions, and contact options for Saravanampatti, Ganapathy, Thudiyalur, Peelamedu, Gandhipuram, RS Puram, Annur, Singanallur, Saibaba Colony, Vadavalli, Kovaipudur, Race Course, Hope College, and Avinashi Road.
          </p>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {localAreaPages.map((page) => (
            <Link
              key={page.slug}
              href={`/coimbatore/${page.slug}`}
              className="card-premium group block p-6 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">{page.focusKeyword}</p>
              <h2 className="mt-3 text-2xl font-bold text-amber-900 group-hover:text-amber-700">{page.seoTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">{page.metaDescription}</p>
              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-700">
                Open page
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
