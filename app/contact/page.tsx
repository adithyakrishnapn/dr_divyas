"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { sampleImages } from "@/lib/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactPage() {
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
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
              Have questions about our treatments? Ready to book your consultation?
              Reach out to Dr Divya's clinic in Coimbatore today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20">
        <div className="page-shell">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: MapPin,
                title: "Location",
                content: siteConfig.address,
                link: siteConfig.mapUrl,
                linkText: "View on Google Maps",
              },
              {
                icon: Phone,
                title: "Phone",
                content: siteConfig.phone,
                link: `tel:${siteConfig.phone}`,
                linkText: "Call Now",
              },
              {
                icon: Mail,
                title: "Email",
                content: siteConfig.email,
                link: `mailto:${siteConfig.email}`,
                linkText: "Send Email",
              },
              {
                icon: Clock,
                title: "Hours",
                content: "Mon - Sat: 10 AM - 7 PM",
                linkText: "",
              },
            ].map(({ icon: Icon, title, content, link, linkText }) => (
              <motion.div
                key={title}
                className="card-premium p-8 text-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="h-14 w-14 rounded-lg bg-gradient-warm flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">{title}</h3>
                <p className="text-slate-700 mb-4">{content}</p>
                {linkText && (
                  <motion.a
                    href={link}
                    target={link?.startsWith("http") ? "_blank" : undefined}
                    rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 3 }}
                    className="inline-flex text-sm font-semibold text-amber-600 hover:text-amber-700"
                  >
                    {linkText} →
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form and Image Section */}
      <section className="py-20 bg-luxury-light">
        <div className="page-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                  Book Your Consultation
                </h2>
                <p className="text-lg text-slate-700">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100 transition"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100 transition"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100 transition"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Skin Concern / Treatment Interest
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100 transition">
                    <option>Select a concern...</option>
                    <option>Acne & Scars</option>
                    <option>Pigmentation</option>
                    <option>Hair Loss</option>
                    <option>Anti-Aging</option>
                    <option>General Skin Care</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us more about your skin concerns..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100 transition resize-none"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 rounded-lg bg-gradient-warm text-white font-bold shadow-lg hover:shadow-xl transition"
                >
                  Send Consultation Request
                </motion.button>
              </form>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src={sampleImages.contact}
                alt="Dr Divya's Clinic Reception"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Contact Section */}
      <section className="py-20">
        <div className="page-shell">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Your journey to beautiful skin starts with a simple conversation
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Smartphone,
                title: "Quick Response",
                description:
                  "We'll contact you within 24 hours to confirm your appointment.",
              },
              {
                icon: MessageSquare,
                title: "Expert Consultation",
                description:
                  "Discuss your concerns with Dr Divya in a confidential setting.",
              },
              {
                icon: CheckCircle2,
                title: "Personalized Plan",
                description:
                  "Receive a customized treatment plan tailored to your needs.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                className="card-premium p-8"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="h-14 w-14 rounded-lg bg-gradient-warm flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-amber-900 mb-3">{title}</h3>
                <p className="text-slate-700">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="py-12 bg-luxury-light">
        <div className="page-shell">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-amber-900 mb-2">
              Find Us in Coimbatore
            </h2>
            <p className="text-slate-700">
              Visit our premium clinic location
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden shadow-xl h-96"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <p className="text-slate-700 font-semibold mb-4">
                  Coimbatore, Tamil Nadu
                </p>
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-warm text-white font-bold"
                >
                  Open Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="page-shell">
          <motion.div
            className="relative rounded-3xl overflow-hidden bg-gradient-warm p-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <motion.div
              className="relative z-10 space-y-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Transform Your Skin?
              </h2>

              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Take the first step towards healthier, more beautiful skin. Call us or fill out the form above today!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <motion.a
                  href={`tel:${siteConfig.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-amber-900 font-bold shadow-lg"
                >
                  <Phone className="h-5 w-5" />
                  Call Us Now
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
