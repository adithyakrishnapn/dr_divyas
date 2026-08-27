import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Sparkles, Award, Heart } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Dr. Divya Skin and Hair Clinic Coimbatore",
  description:
    "Dr. Divya Skin and Hair Clinic offers comprehensive dermatology and trichology care in Coimbatore. Expert acne, pigmentation, hair fall, and laser treatments.",
  path: "/skin-and-hair-clinic",
  keywords: [
    "dr divya skin and hair clinic",
    "skin and hair clinic coimbatore",
    "dermatologist coimbatore",
    "hair fall treatment coimbatore",
  ],
});

const faqs = [
  {
    question: "What should I expect during my first skin or hair consultation?",
    answer: "During your first visit, Dr. Divya will perform a detailed clinical evaluation of your skin or scalp, discuss your medical history, current routine, and lifestyle factors. Based on this, a custom, evidence-based treatment plan will be created.",
  },
  {
    question: "How long do typical skin and hair treatments take to show results?",
    answer: "Skin rejuvenation or acne control treatments usually show visible improvement within 4 to 6 weeks. Hair regrowth treatments generally require 3 to 6 months of consistent therapy to see noticeable changes in density and texture, as hair follows a natural growth cycle.",
  },
  {
    question: "Are the procedures performed at the clinic safe?",
    answer: "Yes, all procedures—including radiofrequency lesion removal, chemical peels, and laser toning—are performed or directly supervised by a board-certified dermatologist using approved, sterile equipment, following strict medical safety standards.",
  },
  {
    question: "How can I book an appointment at the clinic?",
    answer: "You can book an appointment by calling us directly at +91 9994759380, messaging us on WhatsApp, or using our online booking form on the contact page. We recommend booking in advance to secure your preferred slot.",
  },
];

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema() {
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
        name: "Dr. Divya Skin and Hair Clinic",
        item: `${siteConfig.url}/skin-and-hair-clinic`,
      },
    ],
  };
}


export default function SkinAndHairClinicPage() {
  const whatsappDigits = siteConfig.phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to book a consultation at Dr. Divya's Skin & Hair Clinic."
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-rose-200/10 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-luxury-light">
        <div className="page-shell relative z-10">
          <div className="max-w-4xl">
            <nav className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-amber-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">Skin & Hair Clinic</span>
            </nav>

            <span className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
              Comprehensive Dermatology & Trichology Care
            </span>
            <h1 className="text-4xl font-bold text-amber-900 md:text-6xl">
              Dr. Divya Skin and Hair Clinic
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700 md:text-xl">
              Dr. Divya Skin and Hair Clinic offers specialized, dermatologist-led treatments in Coimbatore. Led by Dr. Divya Shanmugam, MD (DVL), we provide personalized care pathways for acne, hyperpigmentation, advanced laser therapies, and hair restoration.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-warm px-6 py-4 font-semibold text-white shadow-lg"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </Link>
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

      {/* Skin Treatments Section */}
      <section className="py-12 md:py-16">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] items-start">
            <article className="card-premium p-8 md:p-10">
              <div className="flex items-center gap-3 text-amber-900 mb-6">
                <Sparkles className="h-7 w-7 text-amber-600" />
                <h2 className="text-3xl font-bold">Dermatologist-Led Skin Treatments</h2>
              </div>
              <div className="space-y-6 text-slate-700 leading-8">
                <p>
                  Healthy skin starts with a precise clinical evaluation. At Dr. Divya Skin and Hair Clinic, we offer advanced, dermatologist-led skin treatments that address both cosmetic concerns and underlying pathological conditions. Our medical protocols are designed to help you achieve clearer, healthier skin using proven, evidence-based methods.
                </p>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Active Acne and Breakouts</h3>
                  <p className="text-base text-slate-600">
                    We specialize in customized acne treatments that target the root causes of breakouts, such as excess sebum production, bacterial growth, and clogged pores. Our treatment plans combine topical medical therapies with in-clinic procedures to control active acne and prevent future flare-ups.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Acne Scar and Mark Revision</h3>
                  <p className="text-base text-slate-600">
                    Post-acne marks (hyperpigmentation) and depressed scars can affect skin texture and tone. We offer specialized subcision and dermaroller treatments to stimulate collagen synthesis, alongside laser-assisted toning to smooth acne scars, reduce post-inflammatory hyperpigmentation, and improve overall skin texture.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Hyperpigmentation and Melasma Care</h3>
                  <p className="text-base text-slate-600">
                    Stubborn pigmentation, sun damage, and melasma require careful clinical management to avoid worsening the condition. We design customized protocols combining dermatological chemical peels (superficial and medium peels) with targeted skincare routines to gently exfoliate, brighten, and restore an even skin tone.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Laser Toning and Skin Rejuvenation</h3>
                  <p className="text-base text-slate-600">
                    For patients seeking to address photo-damage, uneven tone, or dullness, our clinic provides supervised laser treatments. Laser toning works by targeting pigmentation deep in the skin layers, promoting natural cellular renewal, reducing sunspots, and improving skin luminosity without significant downtime.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Skin Lesion Removal</h3>
                  <p className="text-base text-slate-600">
                    Warts, moles, and skin tags are safely removed in a sterile environment using radiofrequency (RF) and electrocautery techniques. These procedural interventions are performed with local anesthesia where necessary, focusing on precise removal, safe wound healing, and minimal scar formation.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Hair Treatments Section */}
      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell">
          <article className="card-premium p-8 md:p-10">
            <div className="flex items-center gap-3 text-amber-900 mb-6">
              <Award className="h-7 w-7 text-amber-600" />
              <h2 className="text-3xl font-bold">Scientific Hair & Scalp Restoration</h2>
            </div>
            <div className="space-y-6 text-slate-700 leading-8">
              <p>
                Scalp health is fundamental to strong, healthy hair. Hair loss, thinning, and shedding can be caused by multiple factors, including genetics, hormonal changes, nutritional deficiencies, environmental stress, and chronic scalp conditions. At our clinic, we provide comprehensive, dermatologist-led trichology consultations to identify the root cause of hair shedding and design targeted treatment pathways.
              </p>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Hair Fall Evaluation</h3>
                <p className="text-base text-slate-600">
                  Every hair treatment begins with a detailed assessment of your scalp health, medical history, and hair loss pattern. We perform clinical evaluations to differentiate between temporary shedding (telogen effluvium) and progressive thinning (androgenetic alopecia), allowing us to recommend appropriate medical and supportive therapies.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">PRP and Growth Factor Treatments</h3>
                <p className="text-base text-slate-600">
                  For patients experiencing progressive hair thinning, we offer advanced growth factor therapies and Platelet-Rich Plasma (PRP) treatments under strict medical supervision. These procedures involve using the patient&apos;s own growth factors to stimulate dormant hair follicles, increase blood circulation to the scalp, and promote thicker, healthier hair growth.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Dandruff and Scalp Care</h3>
                <p className="text-base text-slate-600">
                  Stubborn dandruff, seborrheic dermatitis, and scalp itching can weaken hair roots and accelerate shedding. We prescribe medical anti-fungal shampoos, topical lotions, and anti-inflammatory treatments to soothe the scalp, balance sebum production, and create a healthy environment for active hair follicles.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Personalized Regrowth Protocols</h3>
                <p className="text-base text-slate-600">
                  We combine in-clinic treatments with practical home-care routines, including medical topicals and nutritional support. We monitor your progress closely, adjusting your treatment plan over several months to ensure sustained improvement, manage hair density, and prevent future hair thinning.
                </p>
              </div>
              <p className="text-slate-600 italic">
                By addressing both internal triggers like nutritional gaps and external issues like scalp inflammation, we provide a holistic dermatological pathway to long-term hair density. Hair restoration is a gradual process requiring patience and consistent care. We guide you through each stage, providing realistic expectations and science-backed support.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Why Choose the Clinic Section */}
      <section className="py-12 md:py-16">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Why Patients Choose Our Clinic</h2>
              <p className="text-slate-700 leading-8 mb-6">
                Choosing the right clinic for your skin and hair concerns is essential for achieving safe, effective, and lasting results. Dr. Divya Skin and Hair Clinic is built on a foundation of clinical excellence, medical qualification, and a patient-centric approach. Here is why patients across Coimbatore trust us for their dermatology and trichology care:
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Dermatologist-Led Supervision",
                    desc: "All consultations and procedures are directly conducted or supervised by Dr. Divya Shanmugam, MD (DVL), Registered Medical Practitioner No. 112496. We do not delegate clinical decision-making to assistants.",
                  },
                  {
                    title: "Evidence-Based Care",
                    desc: "Every recommendation is backed by clinical evidence and tailored to your specific skin type and medical history. We prioritize the health and integrity of your skin barrier above all else.",
                  },
                  {
                    title: "Personalized Care Pathways",
                    desc: "Your skin and hair concerns are unique. We design comprehensive plans that outline exactly what to expect, from active treatments to long-term maintenance.",
                  },
                  {
                    title: "Transparent Communication",
                    desc: "We maintain absolute honesty regarding treatment timelines and expected results, avoiding exaggerated claims to focus instead on reliable, scientifically supported improvements.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-amber-600" />
                Our Commitment to You
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                We believe in providing a safe, comfortable, and welcoming space for all our patients. Dr. DivyaShanmugam provides dedicated focus on medically proven skin and hair restoration, ensuring complete transparency between therapeutic treatments and cosmetic care.
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>• No instant or unrealistic guarantees</li>
                <li>• Clinically tested and FDA-approved modalities</li>
                <li>• Careful pre-procedure preparation and thorough aftercare</li>
                <li>• Registered and experienced specialist advice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-luxury-light/70">
        <div className="page-shell max-w-4xl">
          <div className="card-premium p-8 md:p-10">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-slate-700 leading-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-20">
        <div className="page-shell">
          <div className="rounded-3xl bg-gradient-warm p-10 text-center text-white md:p-16">
            <h2 className="text-3xl font-bold md:text-5xl">Book Your Skin & Hair Assessment</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-white/90">
              Ready to take the next step toward healthier skin and scalp? Secure a dedicated consultation time with Dr. Divya Shanmugam for an expert, evidence-based assessment.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 font-semibold text-amber-900 shadow-lg"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </Link>
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

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema()) }}
      />

    </main>
  );
}
