import { siteConfig } from "@/lib/site";

export type SeoLandingSection = {
  title: string;
  items: string[];
};

export type SeoLandingFaq = {
  question: string;
  answer: string;
};

export type SeoLandingPage = {
  slug: string;
  pageType: "treatment" | "area";
  locationName: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  h1: string;
  intro: string[];
  trustPoints: string[];
  sections: SeoLandingSection[];
  nearbyAreas: Array<{ label: string; href: string }>;
  landmarks: string[];
  semanticKeywords: string[];
  longTailKeywords: string[];
  faqs: SeoLandingFaq[];
  internalLinks: Array<{ label: string; href: string }>;
  imageAlts: [string, string, string];
  blogTopics: string[];
  backlinkOpportunities: string[];
};

const commonTreatmentAreas = [
  { label: "Saravanampatti", href: "/coimbatore/saravanampatti" },
  { label: "Ganapathy", href: "/coimbatore/ganapathy" },
  { label: "Peelamedu", href: "/coimbatore/peelamedu" },
  { label: "Thudiyalur", href: "/coimbatore/thudiyalur" },
  { label: "RS Puram", href: "/coimbatore/rs-puram" },
  { label: "Gandhipuram", href: "/coimbatore/gandhipuram" },
];

const commonLandingLinks = [
  { label: "Treatments overview", href: "/treatments" },
  { label: "Clinic profile", href: "/about" },
  { label: "Book appointment", href: "/contact" },
  { label: "Dermatology articles", href: "/blog" },
];

function buildIntro(serviceName: string, cityContext: string) {
  return [
    `If you are searching for ${serviceName.toLowerCase()} in ${cityContext}, this page is designed to answer the practical questions patients usually have before booking a consultation.`,
    `Patients from nearby parts of Coimbatore often want a dermatologist who can explain the issue clearly, outline the treatment plan, and make follow-up easy from areas such as Saravanampatti, Ganapathy, Peelamedu, Thudiyalur, RS Puram, and Gandhipuram.`,
  ];
}

function buildTreatmentFaqs(serviceName: string, cityContext: string): SeoLandingFaq[] {
  return [
    {
      question: `Is ${serviceName.toLowerCase()} suitable if I am searching from ${cityContext}?`,
      answer:
        `Yes. The page is built for people in ${cityContext} and nearby Coimbatore localities who want a clear, doctor-led plan for their skin concern.`,
    },
    {
      question: `Do you also help people looking for a dermatologist near me?`,
      answer:
        "Yes. Many patients arrive through near-me searches and want a clinic that balances diagnosis, treatment planning, and follow-up in one place.",
    },
    {
      question: `Can I combine ${serviceName.toLowerCase()} with pigmentation or acne care?`,
      answer:
        "In many cases, yes. Patients often need a combination plan, especially when acne marks, pigmentation, scars, or scalp concerns overlap.",
    },
    {
      question: `How do I book a consultation before travelling in?`,
      answer:
        "Use the appointment, WhatsApp, or call options on the site so you can confirm the visit before you leave home.",
    },
  ];
}

function buildAreaFaqs(areaName: string): SeoLandingFaq[] {
  return [
    {
      question: `Is this page relevant if I live in ${areaName}?`,
      answer:
        `Yes. It is written for patients from ${areaName} who want a nearby skin doctor, dermatologist, or hair specialist with a simple booking path.`,
    },
    {
      question: `Which nearby areas can also use this page?`,
      answer:
        "Patients from surrounding Coimbatore neighborhoods often use the same clinic pages for acne, hair fall, pigmentation, laser, and routine skin care.",
    },
    {
      question: `Do you handle skin doctor near me searches?`,
      answer:
        "Yes. The page is optimized for local intent, mobile users, and voice-style searches that ask for a trusted clinic nearby.",
    },
    {
      question: `Can I call before I visit from ${areaName}?`,
      answer:
        "Yes. Calling or sending a WhatsApp message first is the quickest way to confirm timing and consultation availability.",
    },
  ];
}

function buildTreatmentPage(config: {
  slug: string;
  serviceName: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  h1: string;
  treatmentAngles: string[];
  landmarks: string[];
  semanticKeywords: string[];
  longTailKeywords: string[];
  blogTopics: string[];
  backlinkOpportunities: string[];
  relatedLinks: Array<{ label: string; href: string }>;
}): SeoLandingPage {
  return {
    slug: config.slug,
    pageType: "treatment",
    locationName: "Coimbatore",
    seoTitle: config.seoTitle,
    metaDescription: config.metaDescription,
    focusKeyword: config.focusKeyword,
    h1: config.h1,
    intro: buildIntro(config.serviceName, "Coimbatore"),
    trustPoints: [
      "Doctor-led evaluation before treatment is recommended",
      "Plans designed for first visits and follow-up care",
      "Built for local patients, mobile searches, and near-me intent",
    ],
    sections: [
      {
        title: `Why people search for ${config.serviceName.toLowerCase()} locally`,
        items: config.treatmentAngles,
      },
      {
        title: `What the consultation usually covers`,
        items: [
          "A skin or scalp assessment based on the main concern",
          "A clear explanation of likely causes and triggers",
          "A practical treatment plan that is easy to follow between visits",
          "Advice on home care, maintenance, and follow-up timing",
        ],
      },
      {
        title: "Local reach across Coimbatore",
        items: [
          "Patients commonly travel from Saravanampatti, Ganapathy, Peelamedu, Thudiyalur, RS Puram, and Gandhipuram.",
          "The page supports Coimbatore-specific searches without sounding forced or repetitive.",
          "It also reinforces topical authority for skin, hair, acne, pigmentation, and laser care.",
        ],
      },
    ],
    nearbyAreas: commonTreatmentAreas,
    landmarks: config.landmarks,
    semanticKeywords: config.semanticKeywords,
    longTailKeywords: config.longTailKeywords,
    faqs: buildTreatmentFaqs(config.serviceName, "Coimbatore"),
    internalLinks: [...commonLandingLinks, ...config.relatedLinks],
    imageAlts: [
      `Doctor consultation for ${config.serviceName.toLowerCase()} in Coimbatore`,
      `Patient-friendly dermatology clinic for ${config.serviceName.toLowerCase()} near Coimbatore`,
      `Treatment planning session for local skin and hair patients in Coimbatore`,
    ],
    blogTopics: config.blogTopics,
    backlinkOpportunities: config.backlinkOpportunities,
  };
}

function buildAreaPage(config: {
  slug: string;
  areaName: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  h1: string;
  localAngles: string[];
  landmarks: string[];
  semanticKeywords: string[];
  longTailKeywords: string[];
  blogTopics: string[];
  backlinkOpportunities: string[];
  relatedLinks: Array<{ label: string; href: string }>;
}): SeoLandingPage {
  return {
    slug: config.slug,
    pageType: "area",
    locationName: config.areaName,
    seoTitle: config.seoTitle,
    metaDescription: config.metaDescription,
    focusKeyword: config.focusKeyword,
    h1: config.h1,
    intro: [
      `People searching from ${config.areaName} usually want a clinic that is close enough for repeat visits and strong enough for proper diagnosis.`,
      `This page is written to strengthen local relevance for ${config.areaName}, while still connecting naturally to Coimbatore-wide treatment searches and nearby neighborhoods.`,
    ],
    trustPoints: [
      "Easy to understand booking path for local patients",
      "Useful for near-me searches and mobile users",
      "Supports follow-up visits and ongoing skin care",
    ],
    sections: [
      {
        title: `Why patients from ${config.areaName} choose this clinic`,
        items: config.localAngles,
      },
      {
        title: "Nearby landmarks and route cues",
        items: config.landmarks,
      },
      {
        title: `Common skin and hair concerns seen from ${config.areaName}`,
        items: [
          "Acne and acne marks",
          "Pigmentation and tanning concerns",
          "Hair fall, dandruff, and scalp irritation",
          "Laser and skin rejuvenation enquiries",
        ],
      },
    ],
    nearbyAreas: [
      { label: "Coimbatore areas hub", href: "/coimbatore" },
      { label: "Saravanampatti", href: "/coimbatore/saravanampatti" },
      { label: "Ganapathy", href: "/coimbatore/ganapathy" },
      { label: "Peelamedu", href: "/coimbatore/peelamedu" },
      { label: "Thudiyalur", href: "/coimbatore/thudiyalur" },
    ],
    landmarks: config.landmarks,
    semanticKeywords: config.semanticKeywords,
    longTailKeywords: config.longTailKeywords,
    faqs: buildAreaFaqs(config.areaName),
    internalLinks: [...commonLandingLinks, ...config.relatedLinks],
    imageAlts: [
      `Dermatology consultation for patients from ${config.areaName}`,
      `Skin clinic route and visit guidance for ${config.areaName} patients`,
      `Nearby Coimbatore patient care for ${config.areaName} searches`,
    ],
    blogTopics: config.blogTopics,
    backlinkOpportunities: config.backlinkOpportunities,
  };
}

const treatmentPages: SeoLandingPage[] = [
  buildTreatmentPage({
    slug: "acne-treatment-coimbatore",
    serviceName: "Acne treatment",
    seoTitle: "Acne Treatment in Coimbatore",
    metaDescription:
      "Doctor-led acne treatment in Coimbatore for active breakouts, acne marks, and recurring skin concerns with clear consultation and follow-up support.",
    focusKeyword: "acne treatment coimbatore",
    h1: "Acne Treatment in Coimbatore for Clearer Skin and Better Control",
    treatmentAngles: [
      "Useful for people who want a dermatologist to explain why breakouts keep returning",
      "Helps patients who need treatment for active acne, acne marks, and post-acne texture concerns",
      "Built for searches that ask for an acne clinic near me or a skin specialist near me",
    ],
    landmarks: [
      "Saravanampatti IT corridor",
      "Ganapathy junction and Sathy Road access",
      "Peelamedu airport road connection",
      "RS Puram and Race Course patient catchment",
    ],
    semanticKeywords: [
      "acne clinic coimbatore",
      "pimple treatment coimbatore",
      "acne marks treatment",
      "skin doctor for acne",
      "dermatologist near me",
    ],
    longTailKeywords: [
      "best acne treatment in coimbatore for adults",
      "doctor for recurring acne marks in coimbatore",
      "skin clinic near me for pimples and scars",
      "acne consultation for teenagers in coimbatore",
    ],
    blogTopics: [
      "How to prevent acne marks from getting darker after breakouts",
      "When to visit a dermatologist for recurring pimples",
      "Simple skincare mistakes that make acne worse",
    ],
    backlinkOpportunities: [
      "Coimbatore health and lifestyle directories",
      "Local school and college wellness pages",
      "Neighbourhood business listings in Saravanampatti and Peelamedu",
    ],
    relatedLinks: [
      { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
      { label: "Hair fall treatment in Coimbatore", href: "/hair-fall-treatment-coimbatore" },
    ],
  }),
  buildTreatmentPage({
    slug: "hair-fall-treatment-coimbatore",
    serviceName: "Hair fall treatment",
    seoTitle: "Hair Fall Treatment in Coimbatore",
    metaDescription:
      "Hair fall treatment in Coimbatore focused on diagnosis, scalp health, and practical follow-up for men and women dealing with thinning or shedding.",
    focusKeyword: "hair fall treatment coimbatore",
    h1: "Hair Fall Treatment in Coimbatore for Thinning Hair and Scalp Care",
    treatmentAngles: [
      "Useful for people who want to understand the cause of hair fall before starting treatment",
      "Built for patients dealing with shedding, thinning hair, dandruff, or scalp irritation",
      "Supports near-me searches for a hair specialist or dermatologist nearby",
    ],
    landmarks: [
      "Peelamedu and Hope College corridor",
      "Ganapathy to Saravanampatti commuting belt",
      "RS Puram and Gandhipuram city-centre access",
      "Thudiyalur and north Coimbatore routes",
    ],
    semanticKeywords: [
      "hair specialist coimbatore",
      "hair loss treatment",
      "scalp doctor coimbatore",
      "prp hair treatment",
      "hair clinic near me",
    ],
    longTailKeywords: [
      "best hair fall treatment in coimbatore for women",
      "doctor for hair thinning and shedding in coimbatore",
      "scalp evaluation clinic near me",
      "hair loss consultation in coimbatore for men",
    ],
    blogTopics: [
      "Why hair fall increases during stress or seasonal changes",
      "When dandruff and hair fall happen together",
      "How to tell the difference between shedding and thinning",
    ],
    backlinkOpportunities: [
      "Local women’s health communities",
      "Coimbatore gym and wellness blogs",
      "City business profiles and doctor listings",
    ],
    relatedLinks: [
      { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
      { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
    ],
  }),
  buildTreatmentPage({
    slug: "pigmentation-treatment-coimbatore",
    serviceName: "Pigmentation treatment",
    seoTitle: "Pigmentation Treatment in Coimbatore",
    metaDescription:
      "Pigmentation treatment in Coimbatore for melasma, tanning, dark patches, and post-acne marks with a clear skin-care plan and doctor guidance.",
    focusKeyword: "pigmentation treatment coimbatore",
    h1: "Pigmentation Treatment in Coimbatore for Dark Patches and Uneven Tone",
    treatmentAngles: [
      "Helps people who want support for melasma, tanning, and post-acne marks",
      "Useful for patients searching for a dermatologist near me for pigmentation concerns",
      "Designed for recurring local searches around skin brightening and tone correction",
    ],
    landmarks: [
      "Avinashi Road and Hope College access",
      "Race Course and RS Puram patient catchment",
      "Peelamedu and airport-side travel routes",
      "Gandhipuram and central city access",
    ],
    semanticKeywords: [
      "melasma treatment coimbatore",
      "dark spots treatment",
      "skin tone correction",
      "sun tan treatment",
      "dermatology for pigmentation",
    ],
    longTailKeywords: [
      "best pigmentation treatment in coimbatore for melasma",
      "doctor for dark patches on face in coimbatore",
      "skin clinic near me for tanning and spots",
      "treatment for post acne marks in coimbatore",
    ],
    blogTopics: [
      "Melasma triggers that make pigmentation return",
      "How to protect skin from tanning in Coimbatore weather",
      "The difference between acne marks and pigmentation",
    ],
    backlinkOpportunities: [
      "Local bridal and beauty magazines",
      "Coimbatore wellness and skincare communities",
      "Regional lifestyle directories",
    ],
    relatedLinks: [
      { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
      { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" },
    ],
  }),
  buildTreatmentPage({
    slug: "laser-treatment-coimbatore",
    serviceName: "Laser treatment",
    seoTitle: "Laser Treatment in Coimbatore",
    metaDescription:
      "Laser treatment in Coimbatore for tone correction, acne scar support, pigmentation care, and skin rejuvenation with doctor supervision.",
    focusKeyword: "laser treatment coimbatore",
    h1: "Laser Treatment in Coimbatore for Skin Rejuvenation and Tone Correction",
    treatmentAngles: [
      "Useful for patients who want safe, doctor-guided laser planning rather than guesswork",
      "Supports acne scar, pigmentation, and photo-damage concerns under one treatment page",
      "Built for people searching for laser clinic near me or skin clinic near me",
    ],
    landmarks: [
      "Race Course and RS Puram residential belt",
      "Peelamedu hospital corridor",
      "Gandhipuram travel connections",
      "Saravanampatti and north Coimbatore access",
    ],
    semanticKeywords: [
      "laser skin treatment",
      "laser toning coimbatore",
      "acne scar laser",
      "skin rejuvenation laser",
      "dermatologist laser clinic",
    ],
    longTailKeywords: [
      "best laser treatment in coimbatore for acne scars",
      "doctor supervised laser toning near me",
      "laser clinic in coimbatore for pigmentation",
      "skin rejuvenation laser for dull skin",
    ],
    blogTopics: [
      "What to expect before your first laser session",
      "How laser helps with acne scars and pigmentation",
      "Who should avoid laser treatment and why",
    ],
    backlinkOpportunities: [
      "Local cosmetic and beauty blogs",
      "Coimbatore medical directory listings",
      "Neighbourhood community websites",
    ],
    relatedLinks: [
      { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
      { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" },
    ],
  }),
  buildTreatmentPage({
    slug: "chemical-peel-coimbatore",
    serviceName: "Chemical peel treatment",
    seoTitle: "Chemical Peel in Coimbatore",
    metaDescription:
      "Chemical peel treatment in Coimbatore for acne marks, dullness, pigmentation, and texture improvement with a dermatologist-guided plan.",
    focusKeyword: "chemical peel coimbatore",
    h1: "Chemical Peel in Coimbatore for Brighter, Smoother-Looking Skin",
    treatmentAngles: [
      "Useful for people who want to improve dullness, marks, and uneven texture",
      "Built for patients looking for a peel under dermatologist supervision",
      "Supports searches for skin brightening or acne mark care near me",
    ],
    landmarks: [
      "Central Coimbatore and Gandhipuram access",
      "Race Course, RS Puram, and Peelamedu catchments",
      "Saravanampatti and Ganapathy commute routes",
      "Avinashi Road patient flow",
    ],
    semanticKeywords: [
      "skin peel coimbatore",
      "acne mark peel",
      "pigmentation peel",
      "dermatology peel treatment",
      "skin brightening peel",
    ],
    longTailKeywords: [
      "best chemical peel in coimbatore for acne marks",
      "doctor guided peel treatment near me",
      "peel for pigmentation and dull skin in coimbatore",
      "chemical peel clinic in coimbatore",
    ],
    blogTopics: [
      "How chemical peels help with acne marks",
      "Who is a good candidate for a peel treatment",
      "Aftercare tips following a dermatologist peel",
    ],
    backlinkOpportunities: [
      "Coimbatore skincare and beauty feature pages",
      "Local salon and wellness referral pages",
      "Regional doctor listing sites",
    ],
    relatedLinks: [
      { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
      { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    ],
  }),
];

const areaPages: SeoLandingPage[] = [
  buildAreaPage({
    slug: "skin-doctor-saravanampatti",
    areaName: "Saravanampatti",
    seoTitle: "Skin Doctor in Saravanampatti",
    metaDescription:
      "Skin doctor in Saravanampatti for acne, pigmentation, hair fall, laser, and routine dermatology care near the IT corridor.",
    focusKeyword: "skin doctor saravanampatti",
    h1: "Skin Doctor in Saravanampatti for Local Skin and Hair Care",
    localAngles: [
      "Useful for patients around the IT corridor who want a clinic that is easy to reach for follow-up visits",
      "Built for near-me searches from apartment clusters, offices, and residential streets around Saravanampatti",
      "Supports local patients who want acne, pigmentation, and hair fall care in one place",
    ],
    landmarks: [
      "Saravanampatti Junction",
      "IT corridor and Keeranatham side roads",
      "Kalapatti Road connection",
      "Easy access from Sathy Road and nearby office zones",
    ],
    semanticKeywords: [
      "best dermatologist in saravanampatti",
      "skin clinic saravanampatti",
      "skin specialist near me",
      "dermatologist near me saravanampatti",
      "hair doctor saravanampatti",
    ],
    longTailKeywords: [
      "best skin doctor in saravanampatti for acne",
      "skin clinic near it corridor coimbatore",
      "dermatologist in saravanampatti for pigmentation",
      "skin specialist near me in saravanampatti",
    ],
    blogTopics: [
      "Why Saravanampatti patients search for a dermatologist near the IT corridor",
      "How office stress can affect acne and hair fall",
      "Simple skin routines for busy professionals in Coimbatore",
    ],
    backlinkOpportunities: [
      "Saravanampatti local business directories",
      "IT corridor community pages",
      "Nearby apartment association websites",
    ],
    relatedLinks: [
      { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
      { label: "Coimbatore areas hub", href: "/coimbatore" },
    ],
  }),
  buildAreaPage({
    slug: "skin-doctor-ganapathy",
    areaName: "Ganapathy",
    seoTitle: "Skin Doctor in Ganapathy",
    metaDescription:
      "Skin doctor in Ganapathy for acne, pigmentation, hair fall, laser, and reliable dermatology care near the north Coimbatore corridor.",
    focusKeyword: "skin doctor ganapathy",
    h1: "Skin Doctor in Ganapathy for Acne, Hair and Pigmentation Care",
    localAngles: [
      "Ideal for people travelling along Sathy Road who want a practical and easy-to-book clinic",
      "Useful for family visits and repeat appointments without complicated navigation",
      "Supports searches for a dermatologist near me in the north Coimbatore side",
    ],
    landmarks: [
      "Ganapathy bus stand and market-road access",
      "Sathy Road movement towards Saravanampatti",
      "Easy reach from Gandhipuram and Thudiyalur side routes",
      "North Coimbatore residential and retail zones",
    ],
    semanticKeywords: [
      "best skin clinic in ganapathy",
      "dermatologist ganapathy",
      "hair clinic ganapathy",
      "skin specialist near ganapathy",
      "acne doctor ganapathy",
    ],
    longTailKeywords: [
      "best dermatologist in ganapathy for acne marks",
      "skin clinic near ganapathy bus stand",
      "hair fall doctor in ganapathy coimbatore",
      "skin specialist near me in ganapathy",
    ],
    blogTopics: [
      "How north Coimbatore patients choose a skin clinic",
      "Common acne triggers for working adults",
      "When to visit a dermatologist for recurring pigmentation",
    ],
    backlinkOpportunities: [
      "Ganapathy neighbourhood directories",
      "North Coimbatore community pages",
      "Local chamber and business listing sites",
    ],
    relatedLinks: [
      { label: "Hair fall treatment in Coimbatore", href: "/hair-fall-treatment-coimbatore" },
      { label: "Coimbatore areas hub", href: "/coimbatore" },
    ],
  }),
  buildAreaPage({
    slug: "dermatologist-thudiyalur",
    areaName: "Thudiyalur",
    seoTitle: "Dermatologist in Thudiyalur",
    metaDescription:
      "Dermatologist in Thudiyalur for acne, pigmentation, hair fall, laser, and skin health support for north-west Coimbatore patients.",
    focusKeyword: "dermatologist thudiyalur",
    h1: "Dermatologist in Thudiyalur for Skin and Hair Concerns",
    localAngles: [
      "Great for families who want a dependable clinic on the north-west side of the city",
      "Built for people searching for a dermatologist near me with predictable follow-up care",
      "Useful for acne, pigmentation, hair fall, and laser-related visits",
    ],
    landmarks: [
      "Thudiyalur main road",
      "NGGO Colony side access",
      "North-west Coimbatore residential belts",
      "Easy connection toward Saravanampatti and Ganapathy",
    ],
    semanticKeywords: [
      "skin clinic in thudiyalur",
      "skin doctor thudiyalur",
      "best dermatologist near thudiyalur",
      "hair treatment thudiyalur",
      "acne clinic thudiyalur",
    ],
    longTailKeywords: [
      "best dermatologist in thudiyalur for acne treatment",
      "skin doctor near me in thudiyalur",
      "hair fall specialist in thudiyalur coimbatore",
      "skin clinic on thudiyalur main road",
    ],
    blogTopics: [
      "What Thudiyalur families should look for in a skin clinic",
      "How to manage acne and hair fall together",
      "Why follow-up matters for pigmentation treatment",
    ],
    backlinkOpportunities: [
      "Thudiyalur local groups and directories",
      "North-west Coimbatore community pages",
      "Family health and wellness listings",
    ],
    relatedLinks: [
      { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
      { label: "Coimbatore areas hub", href: "/coimbatore" },
    ],
  }),
  buildAreaPage({
    slug: "skin-clinic-peelamedu",
    areaName: "Peelamedu",
    seoTitle: "Skin Clinic in Peelamedu",
    metaDescription:
      "Skin clinic in Peelamedu for acne, pigmentation, hair fall, laser, and dermatologist-led skin care near the airport road corridor.",
    focusKeyword: "skin clinic peelamedu",
    h1: "Skin Clinic in Peelamedu for Busy Patients Who Want Reliable Care",
    localAngles: [
      "Useful for students, working professionals, and families in the Peelamedu corridor",
      "Supports searches that ask for a skin clinic near me close to airport road",
      "Good fit for patients who want efficient visits and clear treatment plans",
    ],
    landmarks: [
      "Airport Road and Peelamedu hospital belt",
      "Hope College access",
      "PSG and nearby education corridor",
      "Easy route toward Race Course and Singanallur",
    ],
    semanticKeywords: [
      "best skin clinic in peelamedu",
      "skin specialist peelamedu",
      "hair clinic peelamedu",
      "acne treatment peelamedu",
      "dermatologist peelamedu",
    ],
    longTailKeywords: [
      "skin clinic near airport road coimbatore",
      "best dermatologist in peelamedu for acne",
      "hair fall doctor near peelamedu",
      "skin specialist near me in peelamedu",
    ],
    blogTopics: [
      "How Peelamedu patients can choose a good skin clinic",
      "Acne and pigmentation care for students and professionals",
      "What to ask before starting laser treatment",
    ],
    backlinkOpportunities: [
      "Peelamedu student and alumni pages",
      "Airport road local directories",
      "Education corridor community websites",
    ],
    relatedLinks: [
      { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
      { label: "Coimbatore areas hub", href: "/coimbatore" },
    ],
  }),
  buildAreaPage({
    slug: "best-dermatologist-rs-puram",
    areaName: "RS Puram",
    seoTitle: "Best Dermatologist in RS Puram",
    metaDescription:
      "Best dermatologist in RS Puram for acne, pigmentation, hair fall, laser, and patient-friendly skin care in central Coimbatore.",
    focusKeyword: "best dermatologist rs puram",
    h1: "Best Dermatologist in RS Puram for Skin and Hair Care",
    localAngles: [
      "Great for central Coimbatore patients who want a dependable skin specialist nearby",
      "Useful for people searching for the best dermatologist near me around RS Puram",
      "Supports repeat visits for acne, pigmentation, laser, and scalp issues",
    ],
    landmarks: [
      "DB Road and RS Puram market access",
      "Brookefields and central city shopping routes",
      "Race Course and nearby residential catchment",
      "Quick access from Gandhipuram and Avinashi Road",
    ],
    semanticKeywords: [
      "skin clinic rs puram",
      "skin doctor rs puram",
      "dermatologist near rs puram",
      "best skin specialist in rs puram",
      "hair treatment rs puram",
    ],
    longTailKeywords: [
      "best dermatologist in rs puram for pigmentation",
      "skin clinic near db road coimbatore",
      "hair fall specialist in rs puram",
      "skin doctor near me in central coimbatore",
    ],
    blogTopics: [
      "Why central Coimbatore patients prefer a dermatologist nearby",
      "How to handle pigmentation in daily urban routines",
      "What makes a good long-term skin care follow-up plan",
    ],
    backlinkOpportunities: [
      "RS Puram local directories",
      "Central Coimbatore business listings",
      "Lifestyle magazines covering city medical care",
    ],
    relatedLinks: [
      { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
      { label: "Coimbatore areas hub", href: "/coimbatore" },
    ],
  }),
  buildAreaPage({
    slug: "skin-specialist-gandhipuram",
    areaName: "Gandhipuram",
    seoTitle: "Skin Specialist in Gandhipuram",
    metaDescription:
      "Skin specialist in Gandhipuram for acne, pigmentation, hair fall, laser, and routine skin care with strong local accessibility.",
    focusKeyword: "skin specialist gandhipuram",
    h1: "Skin Specialist in Gandhipuram for Local Dermatology Care",
    localAngles: [
      "Ideal for people who travel through the bus stand and want a skin clinic that is easy to book and revisit",
      "Useful for near-me searches from the city centre and commercial routes",
      "Supports families, students, and office-goers who want practical skin care guidance",
    ],
    landmarks: [
      "Gandhipuram bus stand",
      "Cross Cut Road and central market access",
      "Easy connection to RS Puram and Avinashi Road",
      "Busy transit routes that make quick consultations practical",
    ],
    semanticKeywords: [
      "skin clinic gandhipuram",
      "dermatologist gandhipuram",
      "best skin doctor in gandhipuram",
      "hair clinic gandhipuram",
      "acne clinic gandhipuram",
    ],
    longTailKeywords: [
      "best skin specialist in gandhipuram for acne",
      "skin clinic near gandhipuram bus stand",
      "dermatologist near me in gandhipuram",
      "hair fall treatment near gandhipuram",
    ],
    blogTopics: [
      "How city-centre patients choose a skin specialist",
      "Skin care tips for frequent travellers and commuters",
      "Common reasons acne returns during busy routines",
    ],
    backlinkOpportunities: [
      "Gandhipuram local business pages",
      "Transit area community listings",
      "City-centre health and lifestyle sites",
    ],
    relatedLinks: [
      { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
      { label: "Coimbatore areas hub", href: "/coimbatore" },
    ],
  }),
];

export const seoLandingPages = [...treatmentPages, ...areaPages];

export const seoLandingPageSlugs = seoLandingPages.map((page) => page.slug);

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}

export function buildLandingSchema(page: SeoLandingPage) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    name: siteConfig.name,
    url: `${siteConfig.url}/${page.slug}`,
    description: page.metaDescription,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: page.locationName,
    },
    medicalSpecialty: ["Dermatology", "Hair Restoration"],
  };
}

export function buildServiceSchema(page: SeoLandingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.focusKeyword,
    provider: {
      "@type": "MedicalClinic",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Coimbatore",
  };
}

export function buildFaqSchema(page: SeoLandingPage) {
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

export function buildBreadcrumbSchema(page: SeoLandingPage) {
  const parentLabel = page.pageType === "area" ? "Coimbatore Areas" : "Treatments";
  const parentHref = page.pageType === "area" ? "/coimbatore" : "/treatments";

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
        name: parentLabel,
        item: `${siteConfig.url}${parentHref}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.h1,
        item: `${siteConfig.url}/${page.slug}`,
      },
    ],
  };
}