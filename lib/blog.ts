export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "daily-skincare-routine-for-indian-weather",
    title: "Daily Skincare Routine For Indian Weather",
    description:
      "A dermatologist-approved morning and evening skincare routine that works in heat, humidity, and pollution.",
    date: "2026-04-15",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Indian weather changes quickly between heat, humidity, and dust. A simple routine is better than a complicated one.",
      "Morning: gentle cleanser, vitamin C serum, lightweight moisturizer, and broad-spectrum sunscreen SPF 50.",
      "Evening: remove sunscreen and makeup, cleanse again, apply treatment serum based on your skin concern, and finish with a barrier-support moisturizer.",
      "Do not skip sunscreen even on cloudy days. Pigmentation and tanning worsen with irregular protection.",
    ],
  },
  {
    slug: "how-to-manage-acne-without-damaging-skin",
    title: "How To Manage Acne Without Damaging Skin",
    description:
      "Safe acne care tips from Dr Divya to reduce breakouts, avoid scarring, and improve skin barrier health.",
    date: "2026-04-05",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Acne treatment should focus on reducing inflammation and protecting the skin barrier.",
      "Avoid harsh scrubs and frequent face washing. These can trigger more oil production and irritation.",
      "Use salicylic acid or adapalene only as advised. Spot treatment should be targeted and consistent.",
      "For deep acne, doctor-guided procedures and a custom plan can prevent long-term scars and dark marks.",
    ],
  },
  {
    slug: "pigmentation-treatment-options-explained",
    title: "Pigmentation Treatment Options Explained",
    description:
      "Understand causes of pigmentation and the best treatment options including peels, lasers, and topical routines.",
    date: "2026-03-22",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Pigmentation can be caused by sun exposure, acne marks, hormones, or skin inflammation.",
      "A proper treatment plan combines home care, strict sunscreen usage, and in-clinic procedures if needed.",
      "Chemical peels and laser toning are selected based on skin type, sensitivity, and depth of pigmentation.",
      "Results are gradual. Consistency and follow-up are key for even tone and healthy glow.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
