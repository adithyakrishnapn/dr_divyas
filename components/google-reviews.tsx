import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { siteConfig } from "@/lib/site";

type GoogleReviewsProps = {
  compact?: boolean;
};

export function GoogleReviews({ compact = false }: GoogleReviewsProps) {
  const { googleReviews } = siteConfig;

  if (compact) {
    return (
      <Link
        href={googleReviews.profileUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
      >
        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
        {googleReviews.rating} on Google ({googleReviews.reviewCount}+ reviews)
      </Link>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="page-shell">
        <div className="card-premium p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Patient reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-amber-900">Trusted by Coimbatore patients</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-lg font-bold text-slate-900">{googleReviews.rating} / 5</p>
                <p className="text-sm text-slate-600">Based on {googleReviews.reviewCount}+ Google reviews</p>
              </div>
            </div>

            <Link
              href={googleReviews.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-warm px-5 py-3 font-semibold text-white shadow-lg"
            >
              Read Google Reviews
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {googleReviews.highlights.map((review) => (
              <article key={review.author} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-700">&ldquo;{review.text}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">{review.author}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
