"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Droplets, Sun, Wind, Shield, Sparkles, ArrowRight } from "lucide-react";
import { sampleImages } from "@/lib/site";

const treatmentCategories = [
  {
    title: "Acne Treatment",
    icon: Zap,
    description: "Comprehensive acne management with advanced technology",
    treatments: [
      "Chemical peels for active acne",
      "Laser therapy for acne scars",
      "Personalized treatment protocols",
      "Follow-up care and maintenance",
    ],
    image: sampleImages.treatment2,
    href: "/acne-treatment-coimbatore",
    color: "amber",
  },
  {
    title: "Hair Fall Treatment",
    icon: Wind,
    description: "Advanced solutions for hair loss and scalp health",
    treatments: [
      "Hair loss assessment and diagnosis",
      "Growth factor treatments",
      "Scalp rejuvenation therapy",
      "Personalized regrowth protocols",
    ],
    image: sampleImages.hairFall,
    href: "/hair-fall-treatment-coimbatore",
    color: "amber",
  },
  {
    title: "Vitiligo Treatment",
    icon: Sun,
    description: "Specialized treatment for vitiligo and pigmentation disorders",
    treatments: [
      "Advanced depigmentation therapy",
      "Customized treatment plans",
      "Regular monitoring and follow-ups",
      "Preventative care protocols",
    ],
    image: sampleImages.treatment3,
    href: "/vitiligo-treatment-coimbatore",
    color: "rose",
  },
  {
    title: "Melasma Treatment",
    icon: Droplets,
    description: "Effective solutions for melasma and brown patches",
    treatments: [
      "Laser treatments for melasma",
      "Chemical peeling therapy",
      "Brightening protocols",
      "Sun damage prevention",
    ],
    image: sampleImages.treatment1,
    href: "/melasma-treatment-coimbatore",
    color: "blue",
  },
  {
    title: "Mole, Wart & Skin Tag Removal",
    icon: Shield,
    description: "Safe removal using Radio Frequency and Electrocautery",
    treatments: [
      "Radio Frequency treatment",
      "Electrocautery procedure",
      "Minimal scarring technique",
      "Quick recovery process",
    ],
    image: sampleImages.hero,
    href: "/mole-wart-skin-tag-removal-coimbatore",
    color: "purple",
  },
  {
    title: "Chemical Peeling",
    icon: Sparkles,
    description: "Advanced chemical peeling for skin rejuvenation",
    treatments: [
      "Superficial peels for maintenance",
      "Medium peels for improvement",
      "Deep peels for transformation",
      "Customized formulations",
    ],
    image: sampleImages.treatment1,
    href: "/chemical-peel-coimbatore",
    color: "pink",
  },
  {
    title: "Corn & Foot Removal",
    icon: Zap,
    description: "Specialized foot care and corn removal treatments",
    treatments: [
      "Advanced corn removal techniques",
      "Foot care solutions",
      "Prevention strategies",
      "Follow-up foot care",
    ],
    image: sampleImages.treatment2,
    href: "/corn-foot-removal-coimbatore",
    color: "emerald",
  },
  {
    title: "Subcision / Dermaroller",
    icon: Shield,
    description: "Advanced scar treatment and skin rejuvenation",
    treatments: [
      "Subcision for depressed scars",
      "Dermaroller therapy",
      "Collagen induction therapy",
      "Progressive skin improvement",
    ],
    image: sampleImages.treatment3,
    href: "/subcision-dermaroller-coimbatore",
    color: "indigo",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TreatmentsPage() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="page-shell relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              Advanced Skin & Hair Treatments
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              Comprehensive dermatology solutions in Coimbatore. Every treatment is personalized after detailed skin analysis and tailored to your unique concerns and goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-warm text-white font-bold shadow-lg"
            >
              Schedule Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20">
        <div className="page-shell">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="visible"
            animate="visible"
          >
            {treatmentCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  className="group"
                  variants={itemVariants}
                >
                  <div className="h-full rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Icon Badge */}
                      <motion.div
                        className="absolute top-4 right-4 h-12 w-12 rounded-lg bg-gradient-warm flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-slate-600">{category.description}</p>
                      </div>

                      {/* Treatment List */}
                      <ul className="space-y-3">
                        {category.treatments.map((treatment) => (
                          <motion.li
                            key={treatment}
                            className="flex items-start gap-3"
                            whileHover={{ x: 5 }}
                          >
                            <span className="h-2 w-2 rounded-full bg-gradient-warm flex-shrink-0 mt-2" />
                            <span className="text-slate-700">{treatment}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <motion.a
                        href={category.href}
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-amber-600 font-semibold group/link hover:text-amber-700 pt-4"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="page-shell">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Our Treatment Process
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              A comprehensive approach from consultation to long-term results
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="visible"
            animate="visible"
          >
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Detailed skin analysis and personalized assessment",
              },
              {
                step: "02",
                title: "Treatment Plan",
                description: "Customized protocol tailored to your needs",
              },
              {
                step: "03",
                title: "Treatment",
                description: "Professional administration with care and precision",
              },
              {
                step: "04",
                title: "Aftercare",
                description: "Ongoing support and maintenance guidance",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-4xl font-bold text-gradient-gold mb-4"
                  whileHover={{ scale: 1.2 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="page-shell">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-warm p-16 text-center">
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div
              className="relative z-10 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Find Your Perfect Treatment
              </h2>

              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Every skin is unique. Get a personalized treatment plan from Dr Divya today.
              </p>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-amber-900 font-bold shadow-lg"
              >
                Book Your Consultation
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
