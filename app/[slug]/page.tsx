import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { GoogleReviews } from "@/components/google-reviews";
import { buildMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  getSeoLandingPage,
  seoLandingPageSlugs,
} from "@/lib/seo-landing-pages";
import { sampleImages, siteConfig } from "@/lib/site";

type SeoLandingPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return seoLandingPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SeoLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);

  if (!page) {
    return buildMetadata({
      title: "Skin & Hair Landing Page",
      description: "Specialist skin and hair care in Coimbatore.",
      path: `/${slug}`,
    });
  }

  return buildMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: [page.focusKeyword, ...page.semanticKeywords],
    image: sampleImages.hero,
  });
}

function formatWhatsappLink(message: string) {
  const digits = siteConfig.phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export default async function SeoLandingPage({ params }: SeoLandingPageProps) {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);

  if (!page) {
    notFound();
  }

  const whatsappMessage = `Hello, I want to book a consultation for ${page.focusKeyword} at ${siteConfig.name}.`;
  const imageSources = [sampleImages.hero, sampleImages.consultation, sampleImages.treatment1];

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
              <Link href="/" className="hover:text-amber-700">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href={page.pageType === "area" ? "/coimbatore" : "/treatments"} className="hover:text-amber-700">
                {page.pageType === "area" ? "Coimbatore Areas" : "Treatments"}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">{page.h1}</span>
            </nav>

            <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
              {page.pageType === "area" ? `Local clinic guide for ${page.h1}` : `Treatment guide for ${page.h1}`}
            </p>
            <h1 className="text-4xl font-bold text-amber-900 md:text-6xl">{page.h1}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700 md:text-xl">{page.metaDescription}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-warm px-6 py-4 font-semibold text-white shadow-lg"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={formatWhatsappLink(whatsappMessage)}
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
        <div className="page-shell grid gap-6 md:grid-cols-3">
          {page.trustPoints.map((point) => (
            <div key={point} className="card-premium flex items-start gap-3 p-6">
              <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-amber-600" />
              <p className="text-sm leading-7 text-slate-700">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {imageSources.map((src, index) => (
              <figure key={page.imageAlts[index]} className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-xl">
                <Image
                  src={src}
                  alt={page.imageAlts[index]}
                  width={900}
                  height={650}
                  className="h-64 w-full object-cover"
                />
                <figcaption className="p-4 text-sm leading-6 text-slate-600">{page.imageAlts[index]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-shell">
          <article className="card-premium p-8 md:p-10">
            <h2 className="text-3xl font-bold text-amber-900">What this page covers</h2>
            <div className="mt-6 space-y-5 text-slate-700 leading-8">
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 60)}>{paragraph}</p>
              ))}
              {page.expandedParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 60)}>{paragraph}</p>
              ))}
            </div>

            {page.pageType === "treatment" && (
              <div className="mt-10 border-t border-amber-100 pt-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-amber-500 shadow-md">
                  <Image
                    src="/images/dr.jpg"
                    alt={siteConfig.doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Medical Author & Reviewer</p>
                  <h3 className="text-lg font-bold text-slate-900">{siteConfig.doctor.name}</h3>
                  <p className="text-sm text-slate-600 font-medium">
                    {siteConfig.doctor.degree} | Registration No: {siteConfig.doctor.regNo} (Tamil Nadu Medical Council)
                  </p>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    This medical content has been authored, reviewed, and approved by a registered dermatologist to ensure clinical accuracy and adherence to healthcare guidelines. Last reviewed: August 2026.
                  </p>
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      {page.beforeAfter.length > 0 ? (
        <section className="py-12 md:py-16 bg-luxury-light/70">
          <div className="page-shell">
            <h2 className="text-3xl font-bold text-amber-900">Treatment results gallery</h2>
            <p className="mt-3 max-w-3xl text-slate-700 leading-8">
              Representative outcomes from doctor-guided treatment plans. Individual results vary based on skin type, severity, and aftercare consistency.
            </p>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {page.beforeAfter.map((item) => (
                <figure key={item.caption} className="card-premium overflow-hidden p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Before</p>
                      <Image
                        src={item.beforeImage}
                        alt={item.beforeAlt}
                        width={500}
                        height={360}
                        className="h-48 w-full rounded-xl object-cover"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">After</p>
                      <Image
                        src={item.afterImage}
                        alt={item.afterAlt}
                        width={500}
                        height={360}
                        className="h-48 w-full rounded-xl object-cover"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-4 text-sm leading-7 text-slate-600">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.caseStudies.length > 0 ? (
        <section className="py-12 md:py-16">
          <div className="page-shell">
            <h2 className="text-3xl font-bold text-amber-900">Patient case studies</h2>
            <p className="mt-3 max-w-3xl text-slate-700 leading-8">
              Problem → Treatment → Result summaries from typical clinic cases. Details are anonymised for privacy.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {page.caseStudies.map((study) => (
                <article key={study.problem.slice(0, 40)} className="card-premium flex flex-col gap-4 p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-rose-700">Problem</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{study.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Treatment</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{study.treatment}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Result</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{study.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell grid gap-8 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} className="card-premium p-8">
              <h2 className="text-2xl font-bold text-amber-900">{section.title}</h2>
              <ul className="mt-5 space-y-3 text-slate-700 leading-7">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-gradient-warm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="card-premium p-8">
            <h2 className="text-2xl font-bold text-amber-900">Nearby areas</h2>
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
            <div className="mt-8 space-y-3 text-sm text-slate-600">
              {page.landmarks.map((item) => (
                <p key={item} className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                  <span>{item}</span>
                </p>
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

      {page.pageType === "treatment" ? <GoogleReviews /> : null}

      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell max-w-4xl">
          <div className="card-premium p-8 md:p-10">
            <h2 className="text-3xl font-bold text-amber-900">FAQs</h2>
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
            <h2 className="text-3xl font-bold md:text-5xl">Book a consultation today</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-white/90">
              If you are comparing a dermatologist near me, a skin clinic near {page.locationName}, or a treatment page that feels trustworthy and local, this is the right next step.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 font-semibold text-amber-900 shadow-lg"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={formatWhatsappLink(whatsappMessage)}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(page)) }} />
    </main>
  );
}