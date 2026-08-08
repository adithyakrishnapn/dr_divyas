import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone, MessageCircle, Star } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocalAreaPage, localAreaSlugs } from "@/lib/local-area-pages";
import { siteConfig } from "@/lib/site";

type AreaPageProps = {
  params: Promise<{ area: string }>;
};

export function generateStaticParams() {
  return localAreaSlugs.map((area) => ({ area }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { area } = await params;
  const page = getLocalAreaPage(area);

  if (!page) {
    return buildMetadata({
      title: "Local Area Clinic",
      description: "Specialist skin and hair care in Coimbatore.",
      path: `/coimbatore/${area}`,
    });
  }

  return buildMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/coimbatore/${page.slug}`,
    keywords: page.keywords,
  });
}

function buildFaqSchema(page: NonNullable<ReturnType<typeof getLocalAreaPage>>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(page: NonNullable<ReturnType<typeof getLocalAreaPage>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Coimbatore Areas",
        item: `${siteConfig.url}/coimbatore`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.areaName,
        item: `${siteConfig.url}/coimbatore/${page.slug}`,
      },
    ],
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area } = await params;
  const page = getLocalAreaPage(area);

  if (!page) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book a consultation for skin and hair treatment from ${page.areaName}.`,
  );
  const whatsappDigits = siteConfig.phone.replace(/\D/g, "");

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-rose-200/10 blur-3xl" />
      </div>

      <section className="relative py-16 md:py-20">
        <div className="page-shell relative z-10">
          <div className="max-w-4xl">
            <nav className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-amber-700">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/coimbatore" className="hover:text-amber-700">Coimbatore Areas</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">{page.areaName}</span>
            </nav>

            <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
              Local dermatology page for {page.areaName}
            </p>
            <h1 className="text-4xl font-bold text-amber-900 md:text-6xl">{page.h1}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700 md:text-xl">
              {page.metaDescription}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={`/contact?source=${page.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-warm px-6 py-4 font-semibold text-white shadow-lg"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappDigits}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300 bg-white px-6 py-4 font-semibold text-amber-900 shadow-sm hover:bg-amber-50"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Now
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="card-premium p-8 md:p-10">
            <h2 className="text-3xl font-bold text-amber-900">Why patients from {page.areaName} choose us</h2>
            <div className="mt-6 space-y-5 text-slate-700 leading-8">
              {page.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {page.whyChoose.map((item) => (
                <div key={item} className="rounded-2xl bg-amber-50 p-4 text-sm font-medium text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="card-premium p-8 md:p-10">
            <div className="flex items-center gap-3 text-amber-900">
              <Star className="h-5 w-5 fill-current" />
              <h2 className="text-2xl font-bold">Local access</h2>
            </div>
            <ul className="mt-5 space-y-4 text-slate-700">
              {page.localHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 flex-none text-amber-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              {page.accessibility.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell">
          <div className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-xl">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="min-h-[300px] lg:min-h-[420px]">
                <iframe
                  title="Dr. Divya's Skin Clinic location map"
                  src={siteConfig.mapsEmbedUrl}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                    Clinic location
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-amber-900">
                    Visit Dr. Divya's Skin Clinic in Coimbatore
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Use the map to find the clinic and open directions in Google Maps before your visit.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-warm px-5 py-3 font-semibold text-white shadow-lg"
                  >
                    Go to Location
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-amber-300 px-5 py-3 font-semibold text-amber-900 hover:bg-amber-50"
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell grid gap-8 lg:grid-cols-2">
          <article className="card-premium p-8">
            <h2 className="text-2xl font-bold text-amber-900">Skin treatments near {page.areaName}</h2>
            <ul className="mt-5 space-y-3 text-slate-700">
              {page.skinTreatments.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gradient-warm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card-premium p-8">
            <h2 className="text-2xl font-bold text-amber-900">Hair treatments near {page.areaName}</h2>
            <ul className="mt-5 space-y-3 text-slate-700">
              {page.hairTreatments.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gradient-warm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card-premium p-8">
            <h2 className="text-2xl font-bold text-amber-900">Acne treatment in {page.areaName}</h2>
            <ul className="mt-5 space-y-3 text-slate-700">
              {page.acneTreatments.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gradient-warm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card-premium p-8">
            <h2 className="text-2xl font-bold text-amber-900">Pigmentation and laser care</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Pigmentation treatment</h3>
                <ul className="mt-3 space-y-3 text-slate-700">
                  {page.pigmentationTreatments.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-gradient-warm" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Laser treatment</h3>
                <ul className="mt-3 space-y-3 text-slate-700">
                  {page.laserTreatments.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-gradient-warm" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="card-premium p-8">
            <h2 className="text-2xl font-bold text-amber-900">Nearby areas to consider</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.nearbyAreas.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </article>

          <article className="card-premium p-8">
            <h2 className="text-2xl font-bold text-amber-900">Useful internal links</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.internalLinks.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 font-semibold text-slate-800 hover:border-amber-300 hover:bg-amber-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell max-w-4xl">
          <div className="card-premium p-8 md:p-10">
            <h2 className="text-3xl font-bold text-amber-900">FAQs for {page.areaName}</h2>
            <div className="mt-6 space-y-6">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-slate-700 leading-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="page-shell">
          <div className="rounded-3xl bg-gradient-warm p-10 text-center text-white md:p-16">
            <h2 className="text-3xl font-bold md:text-5xl">Book a consultation from {page.areaName}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-white/90 leading-8">
              If you are searching for a dermatologist near me, skin clinic near {page.areaName}, or hair treatment clinic in Coimbatore, Dr. Divya's Skin Clinic is ready to help with personalised care and a clear treatment plan.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`/contact?source=${page.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 font-semibold text-amber-900 shadow-lg"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappDigits}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-4 font-semibold text-white hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(page)) }} />
    </main>
  );
}
