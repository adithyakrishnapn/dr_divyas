"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Zap,
  Sun,
  Heart,
  MapPin,
  Phone,
  Clock,
  Star,
  Shield,
} from "lucide-react";
import { sampleImages } from "@/lib/site";

const treatments = [
  {
    title: "Acne Treatment",
    description: "Advanced solutions for acne and acne scars with proven results",
    icon: Zap,
  },
  {
    title: "Hair Fall Treatment",
    description: "Comprehensive hair loss treatment and scalp rejuvenation",
    icon: Award,
  },
  {
    title: "Vitiligo & Melasma",
    description: "Specialized pigmentation disorder treatments with advanced technology",
    icon: Sun,
  },
  {
    title: "Skin Removal Procedures",
    description: "Safe mole, wart & skin tag removal using RF and electrocautery",
    icon: Shield,
  },
  {
    title: "Chemical Peeling",
    description: "Advanced chemical peels for skin rejuvenation and improvement",
    icon: Sparkles,
  },
  {
    title: "Scar Treatments",
    description: "Subcision and dermaroller therapy for depressed and atrophic scars",
    icon: Award,
  },
];

const highlights = [
  { count: "4K+", label: "Happy Patients", icon: Users },
  { count: "10 Years", label: "Years Experience", icon: Award },
  { count: "4.9/5", label: "Patient Rating", icon: Star },
  { count: "24/7", label: "Support Available", icon: Clock },
];

const whyChoose = [
  "Board-certified dermatologist specializing in advanced skin treatments",
  "10 years of experience in dermatology and cosmetic procedures",
  "State-of-the-art clinic with latest RF and laser technology",
  "Specialized expertise in acne, vitiligo, melasma, and hair treatments",
  "Personalized treatment plans tailored to your skin concerns",
  "Safe, proven procedures with excellent results and minimal downtime",
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Coimbatore",
    message:
      "Dr Divya's clinic is absolutely amazing! My acne scars reduced significantly in just 6 sessions. The clinic is so clean and Dr Divya is very professional yet friendly.",
    rating: 5,
  },
  {
    name: "Aisha Khan",
    location: "Coimbatore",
    message:
      "Best dermatology experience ever. The treatment plan was customized just for me. I can see visible results and feel so confident now!",
    rating: 5,
  },
  {
    name: "Deepak Patel",
    location: "Coimbatore",
    message:
      "Came for hair loss treatment. Dr Divya's approach is scientific and results-oriented. Worth every penny! Highly recommended.",
    rating: 5,
  },
  {
    name: "Meera Iyer",
    location: "Coimbatore",
    message:
      "The glow facial gave my skin an instant boost! Natural results without looking overdone. Love the clinic atmosphere too!",
    rating: 5,
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

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 4, repeat: Infinity },
  },
};

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6 flex justify-center">
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-16 w-16 rounded-full bg-gradient-warm flex items-center justify-center shadow-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-gradient-gold mb-2">
          Dr Divya&apos;s Clinic
        </h2>
        <p className="text-amber-900 text-sm font-medium mb-6">
          Skin & Hair Care in Coimbatore
        </p>

        <motion.div
          className="w-48 h-1.5 bg-gradient-warm/20 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-warm"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function AnimatedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`card-premium ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {loading && <LoadingScreen />}

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-warm z-40 origin-left"
        style={{ scaleX: progress }}
      />

      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute top-20 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center py-20">
          <div className="page-shell w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/50 text-amber-900 font-semibold text-sm border border-amber-200">
                    <MapPin className="h-4 w-4" />
                    Coimbatore&apos;s Trusted Clinic
                  </span>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="text-gradient-gold">Radiant Skin,</span>
                  <br />
                  <span className="text-amber-900">Confident You</span>
                </motion.h1>

                <motion.p
                  className="text-lg text-slate-700 max-w-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Award-winning dermatology clinic in Coimbatore offering advanced skin and hair treatments with a personal touch. Dr Divya brings 10 years of expertise and has helped 4K+ patients.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 165, 116, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-warm text-white font-bold shadow-lg"
                  >
                    Book Appointment
                    <ArrowRight className="h-5 w-5" />
                  </motion.a>

                  <motion.a
                    href="/treatments"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-amber-600 text-amber-900 font-bold hover:bg-amber-50"
                  >
                    Explore Treatments
                  </motion.a>
                </motion.div>

                <motion.div
                  className="grid grid-cols-3 gap-4 pt-8 border-t border-amber-200"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {highlights.map(({ count, label, icon: Icon }) => (
                    <motion.div key={label} variants={itemVariants} className="text-center">
                      <Icon className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-amber-900">{count}</p>
                      <p className="text-xs text-slate-600">{label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={sampleImages.hero}
                    alt="Dr Divya's Skin Clinic in Coimbatore"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Floating cards */}
                <motion.div
                  className="absolute -bottom-6 -left-6 card-premium p-4 max-w-xs shadow-xl"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-amber-100">
                      <Award className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-bold text-amber-900">Trusted Choice</p>
                      <p className="text-sm text-slate-600">4K+ Success Stories</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="page-shell">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                Our Specialties
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                Comprehensive dermatology and aesthetic solutions tailored to your skin&apos;s unique needs
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {treatments.map(({ title, description, icon: Icon }) => (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <AnimatedCard className="h-full">
                    <div className="p-8">
                      <motion.div
                        className="h-14 w-14 rounded-lg bg-gradient-warm flex items-center justify-center mb-4 group-hover:scale-110"
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>

                      <h3 className="text-xl font-bold text-amber-900 mb-3">
                        {title}
                      </h3>
                      <p className="text-slate-700 mb-6">{description}</p>

                      <Link
                        href="/treatments"
                        className="inline-flex items-center gap-2 text-amber-600 font-semibold group/link hover:text-amber-700"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition" />
                      </Link>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20">
          <div className="page-shell">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/images/doctor.jpeg"
                  alt="Dr Divya Consultation"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                    Why Choose Dr Divya&apos;s?
                  </h2>
                  <p className="text-lg text-slate-700">
                    Experience trusted dermatology care that combines clinical excellence with personalized attention.
                  </p>
                </div>

                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {whyChoose.map((reason, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="flex gap-4 items-start"
                    >
                      <motion.div
                        className="flex-shrink-0 mt-1"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                      >
                        <CheckCircle2 className="h-6 w-6 text-amber-600" />
                      </motion.div>
                      <p className="text-slate-700 font-medium">{reason}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.a
                  href="/about"
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center gap-2 text-amber-600 font-bold text-lg hover:text-amber-700"
                >
                  About Dr Divya
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="page-shell">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                Patient Success Stories
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                Real stories from real patients in Coimbatore
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <AnimatedCard>
                    <div className="p-8 space-y-4">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <p className="text-lg text-slate-700 italic">
                        &quot;{testimonial.message}&quot;
                      </p>

                      <div>
                        <p className="font-bold text-amber-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="page-shell">
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-warm" />
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative px-8 py-16 md:px-16 md:py-24 text-center text-white">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Ready to Transform Your Skin?
                </motion.h2>

                <motion.p
                  className="text-lg max-w-2xl mx-auto mb-8 opacity-95"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Schedule your personalized consultation with Dr Divya today. Get a treatment plan tailored to your unique skin needs.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-amber-900 font-bold shadow-lg"
                  >
                    Book Now
                    <ArrowRight className="h-5 w-5" />
                  </motion.a>

                  <motion.a
                    href={`tel:+918765443210`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Banner */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="page-shell">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <MapPin className="h-6 w-6 mx-auto text-amber-400" />
                <h3 className="font-bold">Location</h3>
                <p className="text-sm text-slate-300">Coimbatore, Tamil Nadu</p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Phone className="h-6 w-6 mx-auto text-amber-400" />
                <h3 className="font-bold">Phone</h3>
                <Link href="tel:+918765443210" className="text-sm text-amber-400 hover:text-amber-300">
                  +91 98765 43210
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Clock className="h-6 w-6 mx-auto text-amber-400" />
                <h3 className="font-bold">Hours</h3>
                <p className="text-sm text-slate-300">Mon - Sat: 10 AM - 7 PM</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
