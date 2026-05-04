"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Sparkles, Users, Heart, CheckCircle2, MapPin } from "lucide-react";
import { sampleImages } from "@/lib/site";

const expertise = [
  { title: "10 Years", description: "Clinical dermatology experience" },
  { title: "4K+", description: "Satisfied patients transformed" },
  { title: "Advanced Tech", description: "Latest treatment technologies" },
  { title: "Premium Care", description: "Personalized treatment plans" },
];

const values = [
  {
    icon: Heart,
    title: "Patient-Centric",
    description:
      "Your comfort and satisfaction are at the heart of everything we do.",
  },
  {
    icon: Sparkles,
    title: "Science-Based",
    description:
      "Evidence-driven treatments with proven, safe clinical approaches.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Commitment to the highest standards of dermatological care.",
  },
  {
    icon: Users,
    title: "Personalized",
    description: "Customized solutions tailored to your unique skin needs.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-luxury-light overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="page-shell relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <motion.h1
                  className="text-5xl md:text-6xl font-bold text-amber-900 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  About Dr Divya
                </motion.h1>
                <motion.p
                  className="text-xl text-slate-700 leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Board-certified dermatologist dedicated to transforming skin and hair with advanced technology, compassionate care, and proven results in Coimbatore. Dr Divya brings 10 years of experience serving 4K+ patients.
                </motion.p>
              </div>

              <motion.div
                className="grid grid-cols-2 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {expertise.map(({ title, description }) => (
                  <motion.div
                    key={title}
                    className="bg-white rounded-lg p-4 shadow-md"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <p className="text-2xl font-bold text-gradient-gold">{title}</p>
                    <p className="text-sm text-slate-600">{description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={sampleImages.consultation}
                  alt="Dr Divya's Clinic"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-lg p-6 shadow-xl max-w-xs"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-amber-900">Located in Coimbatore</p>
                    <p className="text-sm text-slate-600">Best clinic in Tamil Nadu</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="page-shell">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Guiding principles that shape how we care for every patient
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                className="card-premium p-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="h-14 w-14 rounded-lg bg-gradient-warm flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">{title}</h3>
                <p className="text-slate-700">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-luxury-light">
        <div className="page-shell">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src={sampleImages.hero}
                alt="Advanced Clinic Technology"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                  Clinical Excellence
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  With over a decade of dermatological practice, Dr Divya combines cutting-edge technology with time-tested clinical methodologies to deliver exceptional results.
                </p>
              </div>

              <motion.div
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Advanced laser technology for acne, scars, and pigmentation",
                  "Non-invasive hair loss treatments and restoration",
                  "Personalized skincare protocols for all skin types",
                  "Comprehensive pre- and post-treatment care",
                  "Regular follow-ups and customized maintenance plans",
                ].map((item) => (
                  <motion.div
                    key={item}
                    className="flex gap-4 items-start"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 font-medium">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Dr Divya Section */}
      <section className="py-20">
        <div className="page-shell">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Why Patients Choose Dr Divya
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              A commitment to excellence that shows in every interaction
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Personalized Approach",
                description:
                  "Every patient is unique. Dr Divya customizes treatment plans based on individual skin concerns and goals.",
              },
              {
                title: "Proven Results",
                description:
                  "Consistent, visible improvements across acne, pigmentation, hair loss, and anti-aging treatments.",
              },
              {
                title: "Patient Comfort",
                description:
                  "A warm, welcoming clinic environment where questions are answered and concerns are addressed.",
              },
              {
                title: "Latest Technology",
                description:
                  "Investment in advanced, FDA-approved equipment for safe and effective treatments.",
              },
              {
                title: "Comprehensive Care",
                description:
                  "From consultation to long-term maintenance, we guide you through every step of your skin journey.",
              },
              {
                title: "Honest Communication",
                description:
                  "Transparent about treatment options, timelines, and realistic expectations for your specific concerns.",
              },
            ].map(({ title, description }) => (
              <motion.div
                key={title}
                className="card-premium p-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold text-amber-900 mb-3">{title}</h3>
                <p className="text-slate-700">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="page-shell relative z-10 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Skin?
          </motion.h2>

          <motion.p
            className="text-lg text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Schedule a consultation with Dr Divya and discover how personalized dermatology care can transform your confidence.
          </motion.p>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-amber-900 font-bold shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Book Your Consultation
          </motion.a>
        </div>
      </section>
    </main>
  );
}
