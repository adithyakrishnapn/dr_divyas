export const siteConfig = {
  name: "Dr. Divya's Skin Clinic",
  description:
    "Dr. Divya's Skin Clinic in Coimbatore provides dermatologist-led care, offering advanced treatments for acne, pigmentation, hair fall, and skin rejuvenation.",
  url: "https://www.drdivyas.in",
  mapUrl: "https://maps.app.goo.gl/aEKS7UrxVSEta2Zd7",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.7834818390447!2d77.00191837482221!3d11.054853589111374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8599aa76a4b81%3A0xb6111fd2ef3ef299!2sDr.%20Divya%27s%20Skin%20Clinic!5e0!3m2!1sen!2sin!4v1778333405996!5m2!1sen!2sin",
  phone: "+91 9994759380",
  email: "drdivyaskincliniccbe@gmail.com",
  streetAddress: "2/12, Annai Velaganni Nagar Road",
  addressLocality: "Coimbatore North",
  addressRegion: "Tamil Nadu",
  postalCode: "641035",
  addressCountry: "IN",
  address: "2/12, Annai Velaganni Nagar Road, Coimbatore North, Tamil Nadu 641035",
  geo: {
    latitude: 11.0366,
    longitude: 76.9935,
  },
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"], opens: "16:30", closes: "20:30" },
    { days: ["Friday"], opens: "17:30", closes: "20:30" },
    { days: ["Sunday"], opens: "10:00", closes: "13:00" },
  ],
  hoursLabel: "Mon - Thu, Sat: 4:30 PM - 8:30 PM | Fri: 5:30 PM - 8:30 PM | Sun: 10:00 AM - 1:00 PM",
  doctor: {
    name: "Dr. Divya Shanmugam",
    degree: "MD (DVL)",
    regNo: "112496",
    role: "Dermatologist & Trichologist",
    experience: "10 Years",
    patients: "4,000+",
  },
  googleReviews: {
    rating: 4.9,
    reviewCount: 150,
    profileUrl: "https://maps.app.goo.gl/aEKS7UrxVSEta2Zd7",
    highlights: [
      {
        author: "Nandhini Vengatesh",
        rating: 5,
        text: "The best skin doctor I have ever seen..she speaks very polite and give clear answer about our doubts..but she is very sincere and her intention is to cure it as soon as possible..my son & husband's skin problem has cured after few sessions..I highly recommend 😀",
      },
      {
        author: "Praveen Kumar",
        rating: 5,
        text: "I visited for a skin infection, and she was incredibly thorough in diagnosing and treating the issue. Thanks to her guidance, the infection cleared up completely. She's knowledgeable, approachable, and highly recommended.",
      },
      {
        author: "Vivitha Anill",
        rating: 5,
        text: "She listened to my skin problems so patiently and her medication really worked for me within few days. Even reduced fees for me as a college student. I would suggest her all the time!",
      },
    ],
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const sampleImages = {
  hero:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=80",
  consultation: "/images/doctor-about.jpeg",
  hairFall: "/images/hairfall.jpeg",
  treatment1:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
  treatment2:
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80",
  treatment3:
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
  acneBefore:
    "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80",
  acneAfter:
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
  hairBefore:
    "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80",
  hairAfter: "/images/hairfall.jpeg",
  pigmentationBefore:
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
  pigmentationAfter:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  blog1:
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
  blog2:
    "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80",
  blog3:
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
  contact:
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1400&q=80",
};

export const standardTreatmentLinks = [
  { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
  { label: "Hair fall treatment in Coimbatore", href: "/hair-fall-treatment-coimbatore" },
  { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
  { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
  { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" },
  { label: "Vitiligo treatment in Coimbatore", href: "/vitiligo-treatment-coimbatore" },
];
