"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

type BlogListProps = {
  posts: BlogPost[];
};

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

export function BlogList({ posts }: BlogListProps) {
  return (
    <main className="relative min-h-screen">
      {/* Background Decorations */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-luxury-light">
        <div className="page-shell">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              Skin Care Education Hub
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
              Expert skincare guides, treatment insights, and dermatology tips from
              Dr Divya. Learn how to care for your skin with science-backed advice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-20">
        <div className="page-shell">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post, idx) => (
              <motion.article
                key={post.slug}
                className="group"
                variants={itemVariants}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="card-premium h-full overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Badge */}
                      <motion.div
                        className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-warm text-white text-xs font-bold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        Featured
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 space-y-6 flex flex-col justify-between">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-amber-600" />
                          {new Date(post.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-amber-600" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-amber-900 group-hover:text-amber-700 transition">
                          {post.title}
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                          {post.description}
                        </p>
                      </div>

                      {/* CTA */}
                      <motion.div
                        className="inline-flex items-center gap-2 text-amber-600 font-semibold group-hover:text-amber-700 pt-4"
                        whileHover={{ x: 5 }}
                      >
                        Read Full Article
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-light">
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
                Personalized Skin Care?
              </h2>

              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Learn more from our expert guides or schedule a consultation with Dr Divya to get a personalized skincare plan.
              </p>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-amber-900 font-bold shadow-lg"
              >
                Book Consultation Now
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
