import type { SeoLandingFaq, SeoLandingSection } from "@/lib/seo-landing-pages";
import { sampleImages } from "@/lib/site";

export type TreatmentCaseStudy = {
  problem: string;
  treatment: string;
  result: string;
};

export type BeforeAfterItem = {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  caption: string;
};

export type TreatmentRichContent = {
  intro: string[];
  expandedParagraphs: string[];
  sections: SeoLandingSection[];
  faqs: SeoLandingFaq[];
  metaDescription: string;
  caseStudies: TreatmentCaseStudy[];
  beforeAfter: BeforeAfterItem[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const acneTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Expert acne treatment in Coimbatore for active breakouts, scars & marks. Doctor-led plans, visible results in weeks. Book your free consultation today — call +91 9994759380.",
  intro: [
    "Acne is one of the most common reasons people search for a dermatologist in Coimbatore. Heat, humidity, pollution, stress, and inconsistent skincare can all trigger breakouts that leave behind marks and scars if not treated early.",
    "At Dr Divya's Skin & Hair Clinic, acne treatment starts with understanding your skin type, identifying triggers, and building a plan that controls active pimples while protecting the skin barrier. Patients from Saravanampatti, Peelamedu, RS Puram, Ganapathy, and across Coimbatore visit for doctor-led acne care that goes beyond over-the-counter products.",
    "Whether you are a teenager with hormonal acne, an adult with recurring breakouts along the jawline, or someone dealing with post-acne marks and texture, this page explains what causes acne, which treatments work, how long results take, and what aftercare keeps skin clear.",
  ],
  expandedParagraphs: [
    "Coimbatore's climate creates a perfect storm for acne. High humidity increases oil production, dust and pollution clog pores, and many people skip sunscreen because creams feel heavy — which worsens post-acne pigmentation. Office workers in the IT corridor often report stress-related flare-ups, while students near Peelamedu and Hope College frequently struggle with combination skin that is oily in the T-zone but dry on the cheeks.",
    "A good acne treatment plan does not rely on a single cream or tablet. It combines medical-grade topicals, oral medication when needed, in-clinic procedures for scars and marks, and a home routine you can actually follow. Dr Divya evaluates whether your acne is comedonal, inflammatory, hormonal, or scarring-dominant before recommending treatment — because the wrong approach can irritate skin and make breakouts worse.",
    "Most patients notice reduced active breakouts within 4–8 weeks of starting a consistent plan. Acne marks and redness fade over 2–4 months with sunscreen, pigment-safe actives, and optional peels or laser sessions. Deep scars require longer timelines — often 4–8 sessions of subcision, microneedling, or laser — spaced 4–6 weeks apart for safe, progressive improvement.",
  ],
  sections: [
    {
      title: "Common causes of acne in Coimbatore",
      items: [
        "Excess sebum production worsened by heat and humidity",
        "Clogged pores from pollution, sweat, and heavy makeup or sunscreen",
        "Hormonal fluctuations — common in teens and adult women",
        "Bacterial overgrowth (Cutibacterium acnes) inside blocked follicles",
        "Stress, irregular sleep, and high-glycaemic diets triggering flare-ups",
        "Using harsh scrubs or too many actives that damage the skin barrier",
      ],
    },
    {
      title: "Acne treatment options we offer",
      items: [
        "Topical retinoids and benzoyl peroxide for active breakouts",
        "Salicylic acid and azelaic acid for clogged pores and marks",
        "Oral antibiotics or hormonal therapy when clinically indicated",
        "Chemical peels for acne marks, dullness, and uneven texture",
        "Laser toning and scar revision for post-acne redness and depressed scars",
        "Subcision and dermaroller for tethered, rolling acne scars",
      ],
    },
    {
      title: "Expected results timeline",
      items: [
        "Week 1–2: Reduced new breakouts; some dryness or purging is normal with retinoids",
        "Week 4–6: Fewer active pimples; skin texture begins to smooth",
        "Month 2–3: Acne marks and redness start fading with sun protection",
        "Month 3–6: Significant improvement in scars with in-clinic procedures",
        "Ongoing: Maintenance routine to prevent recurrence — acne control is long-term",
      ],
    },
    {
      title: "Aftercare for lasting clear skin",
      items: [
        "Use a gentle, pH-balanced cleanser — never scrub active breakouts",
        "Apply broad-spectrum SPF 50 daily, even indoors and on cloudy days",
        "Avoid picking or squeezing pimples to prevent scars and dark marks",
        "Stick to your prescribed routine — skipping nights slows progress",
        "Return for follow-up so your plan can be adjusted as skin improves",
        "Keep hair products and phone screens away from the face when possible",
      ],
    },
    {
      title: "Who should visit a dermatologist for acne?",
      items: [
        "Breakouts that persist beyond 3 months despite home care",
        "Painful cystic acne or nodules that leave scars",
        "Acne that affects confidence, work, or social life",
        "Marks or dark spots that remain after pimples heal",
        "Acne that flares with periods, stress, or certain medications",
      ],
    },
  ],
  faqs: [
    {
      question: "How many sessions are needed for acne scars?",
      answer:
        "Mild scars may improve in 3–4 sessions of microneedling or laser toning spaced 4–6 weeks apart. Moderate to deep scars often need 6–8 sessions, sometimes combined with subcision. Results build gradually — most patients see meaningful improvement by session 4–5. Dr Divya assesses scar type (ice pick, rolling, boxcar) before recommending the right protocol.",
    },
    {
      question: "How long before I see results from acne treatment?",
      answer:
        "Active breakouts usually reduce within 4–8 weeks of starting a doctor-guided plan. Marks and redness take 2–4 months with consistent sunscreen and treatment. Deep scars need longer — expect progressive improvement over 4–6 months with in-clinic procedures.",
    },
    {
      question: "Is acne treatment safe for teenagers?",
      answer:
        "Yes. Teenage acne is very common in Coimbatore's humid climate. Treatment is tailored to age, severity, and skin sensitivity. Early dermatologist care helps prevent scarring that becomes harder to treat later.",
    },
    {
      question: "Can I combine acne treatment with pigmentation care?",
      answer:
        "Often yes. Many patients have both active acne and post-acne marks. A combined plan addresses breakouts first while using pigment-safe products and procedures for marks — see our pigmentation treatment page for more detail.",
    },
    {
      question: "What is the cost of acne treatment in Coimbatore?",
      answer:
        "Cost depends on severity and whether you need only topicals or in-clinic procedures too. Consultation fees and treatment plans are discussed upfront at your first visit. Book a consultation for a personalised estimate.",
    },
    {
      question: "Do you treat acne for patients from Saravanampatti and Peelamedu?",
      answer:
        "Yes. Patients travel from Saravanampatti, Peelamedu, Ganapathy, RS Puram, Thudiyalur, and across Coimbatore. You can book via phone, WhatsApp, or the contact form before visiting.",
    },
  ],
  caseStudies: [
    {
      problem: "24-year-old IT professional with recurring cystic acne on cheeks and jawline, plus dark marks after each breakout.",
      treatment: "Topical retinoid at night, benzoyl peroxide spot treatment, oral antibiotic for 8 weeks, and SPF 50 daily. Added salicylic acid peel at week 6 for marks.",
      result: "Active breakouts reduced by 70% in 6 weeks. Marks faded significantly over 3 months. Maintenance topicals continued to prevent recurrence.",
    },
    {
      problem: "19-year-old student with oily skin, blackheads, and inflammatory pimples worsening in humid weather.",
      treatment: "Gentle cleanser, niacinamide serum, adapalene gel, and lifestyle advice on diet and pillowcase hygiene.",
      result: "Clearer skin within 5 weeks. Blackheads reduced with consistent retinoid use. No new deep scars after stopping picking habit.",
    },
    {
      problem: "32-year-old woman with adult hormonal acne along the chin and post-acne rolling scars.",
      treatment: "Hormonal assessment, topical + oral plan for active acne, then 5 sessions of microneedling for scars over 5 months.",
      result: "Breakouts controlled in 2 months. Scar depth visibly reduced by session 4. Patient continues maintenance care and annual review.",
    },
  ],
  beforeAfter: [
    {
      beforeImage: sampleImages.acneBefore,
      afterImage: sampleImages.acneAfter,
      beforeAlt: "Before acne treatment in Coimbatore — active inflammatory breakouts on cheeks",
      afterAlt: "After acne treatment in Coimbatore — clearer skin with reduced breakouts and marks",
      caption: "Active acne control with doctor-guided topicals and peel support over 8 weeks",
    },
    {
      beforeImage: sampleImages.treatment2,
      afterImage: sampleImages.treatment1,
      beforeAlt: "Before acne scar treatment — uneven texture and post-acne marks",
      afterAlt: "After acne scar treatment — smoother skin texture after microneedling sessions",
      caption: "Acne mark and texture improvement with in-clinic procedures and home care",
    },
  ],
  relatedLinks: [
    { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
    { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" },
    { label: "Subcision & dermaroller in Coimbatore", href: "/subcision-dermaroller-coimbatore" },
    { label: "Melasma treatment in Coimbatore", href: "/melasma-treatment-coimbatore" },
  ],
};

export const hairFallTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Hair fall treatment in Coimbatore for men & women. Indian climate-specific care, PRP & scalp therapy. Book a scalp assessment today — call +91 9994759380.",
  intro: [
    "Hair fall is one of the top concerns for both men and women searching for a dermatologist in Coimbatore. Shedding 50–100 hairs daily is normal, but when clumps appear on your pillow, in the shower, or when you run your fingers through your hair, it is time for a proper scalp evaluation.",
    "Coimbatore's hot, humid climate, hard water in many areas, stress from long commutes, and nutritional gaps all contribute to hair thinning. Dr Divya's Skin & Hair Clinic offers doctor-led hair fall treatment that identifies the root cause — whether it is androgenetic alopecia, telogen effluvium, dandruff, or scalp inflammation — before starting any therapy.",
    "This page covers hair fall causes specific to South Indian climate, treatment options available at the clinic, realistic success rates, and how to maintain results with follow-up care.",
  ],
  expandedParagraphs: [
    "Hair fall in Indian climate often has multiple triggers working together. Hard water mineral buildup can make hair brittle. Humidity promotes fungal growth on the scalp (dandruff), which accelerates shedding if untreated. Seasonal hair fall — especially during monsoon and post-illness — is common in Coimbatore. Women frequently report increased shedding 3–6 months after childbirth, surgery, or severe stress (telogen effluvium).",
    "Male pattern baldness (androgenetic alopecia) typically starts with receding hairline or thinning at the crown. Female pattern hair loss shows as widening part line and reduced volume rather than complete bald patches. A trichoscopy examination and detailed history help distinguish these patterns from reversible causes like iron deficiency or thyroid imbalance.",
    "Treatment success depends on catching hair fall early and staying consistent. Medical therapy (minoxidil, finasteride where appropriate), PRP (platelet-rich plasma) injections, scalp mesotherapy, and targeted anti-dandruff protocols each play a role. Most patients notice reduced shedding within 6–8 weeks and visible density improvement over 4–6 months with regular follow-up.",
  ],
  sections: [
    {
      title: "Hair fall causes common in Coimbatore & Indian climate",
      items: [
        "Hard water damage — mineral residue weakens hair shafts over time",
        "Heat and humidity — increased scalp sweating and fungal (dandruff) growth",
        "Monsoon-related seasonal shedding and post-viral telogen effluvium",
        "Stress from long IT corridor commutes and irregular sleep patterns",
        "Iron, vitamin D, and protein deficiency — common in women",
        "Tight hairstyles, chemical treatments, and excessive heat styling",
        "Androgenetic alopecia (genetic pattern hair loss) in men and women",
      ],
    },
    {
      title: "Hair fall treatment options",
      items: [
        "Scalp trichoscopy and blood work to identify underlying causes",
        "Minoxidil and doctor-prescribed oral therapy for pattern hair loss",
        "PRP (platelet-rich plasma) injections for follicle stimulation",
        "Scalp mesotherapy with growth factors and nutrients",
        "Anti-dandruff and anti-fungal protocols for scalp inflammation",
        "Low-level laser therapy for thinning hair in selected cases",
        "Lifestyle and nutrition guidance for long-term scalp health",
      ],
    },
    {
      title: "Expected success rates & timeline",
      items: [
        "Reduced daily shedding: usually within 6–8 weeks of starting treatment",
        "Visible new growth: 3–4 months with PRP or medical therapy",
        "Density improvement: 50–70% of patients see meaningful change by month 6",
        "Pattern baldness: best results when treatment starts early — maintenance is ongoing",
        "Telogen effluvium: often resolves in 3–6 months once trigger is addressed",
        "Dandruff-related fall: improves within 2–4 weeks with proper scalp care",
      ],
    },
    {
      title: "Aftercare for healthy hair growth",
      items: [
        "Use a sulphate-free shampoo suited to your scalp type",
        "Avoid oil-heavy scalp treatments if you have dandruff or folliculitis",
        "Do not skip prescribed minoxidil or medication — consistency matters",
        "Protect hair from direct sun and chlorinated pool water",
        "Eat adequate protein, iron, and vitamin D; consider blood tests if shedding persists",
        "Return for follow-up every 4–8 weeks during active treatment phases",
      ],
    },
  ],
  faqs: [
    {
      question: "Is laser hair removal permanent?",
      answer:
        "Laser hair removal reduces hair growth significantly, but it is not always 100% permanent for everyone. Most patients see 70–90% long-term reduction after 6–8 sessions. Hormonal areas (face, chin) may need occasional maintenance. This is different from medical hair fall treatment — if you are losing scalp hair, see our hair fall assessment rather than laser hair removal.",
    },
    {
      question: "Does PRP work for hair fall?",
      answer:
        "PRP helps many patients with early to moderate thinning by delivering growth factors directly to follicles. Best results are seen when combined with medical therapy and started before follicles become dormant. Typically 4–6 sessions spaced 4 weeks apart are recommended.",
    },
    {
      question: "Can hard water in Coimbatore cause hair fall?",
      answer:
        "Hard water can make hair dry, brittle, and prone to breakage, which looks like increased fall. Installing a shower filter, using chelating shampoos occasionally, and treating the scalp (not just hair length) helps reduce this effect.",
    },
    {
      question: "Is hair fall treatment different for women?",
      answer:
        "Yes. Women are more likely to have telogen effluvium, iron deficiency, or PCOS-related shedding. Treatment focuses on identifying hormonal and nutritional factors alongside scalp therapy. Minoxidil formulations and PRP protocols may differ from male treatment plans.",
    },
    {
      question: "How many PRP sessions do I need?",
      answer:
        "Most patients start with 4–6 sessions at 4-week intervals, then maintenance every 3–6 months. Your dermatologist adjusts based on scalp response and hair density at follow-up visits.",
    },
  ],
  caseStudies: [
    {
      problem: "35-year-old man with receding hairline and thinning crown, family history of baldness.",
      treatment: "Minoxidil 5%, finasteride (after counselling), and 5 PRP sessions over 5 months.",
      result: "Shedding reduced within 6 weeks. Visible density improvement at crown by month 5. Continues maintenance therapy.",
    },
    {
      problem: "28-year-old woman with heavy postpartum shedding 4 months after delivery.",
      treatment: "Iron and vitamin D correction, gentle scalp care, minoxidil 2%, and reassurance on timeline.",
      result: "Shedding normalised by month 3 of treatment. New baby hairs visible at hairline by month 5.",
    },
    {
      problem: "42-year-old with dandruff, itchy scalp, and hair fall worsening in monsoon.",
      treatment: "Anti-fungal shampoo, topical steroid short course, and scalp hydration routine.",
      result: "Itching stopped in 1 week. Dandruff controlled in 3 weeks. Hair fall reduced to normal levels within 6 weeks.",
    },
  ],
  beforeAfter: [
    {
      beforeImage: sampleImages.hairBefore,
      afterImage: sampleImages.hairAfter,
      beforeAlt: "Before hair fall treatment in Coimbatore — visible scalp thinning and reduced density",
      afterAlt: "After hair fall treatment in Coimbatore — improved hair density after PRP and medical therapy",
      caption: "Hair density improvement with PRP sessions and consistent medical therapy over 5 months",
    },
  ],
  relatedLinks: [
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
    { label: "Vitiligo treatment in Coimbatore", href: "/vitiligo-treatment-coimbatore" },
    { label: "Dermatologist in Saravanampatti", href: "/coimbatore/saravanampatti" },
  ],
};

export const pigmentationTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Pigmentation & melasma treatment in Coimbatore. Sun spots, melasma & acne marks — doctor-led plans that work. Book your skin assessment today!",
  intro: [
    "Uneven skin tone, dark patches, melasma, and sun spots are among the most frustrating skin concerns for Coimbatore patients. The city's strong UV exposure, even during overcast days, makes pigmentation return quickly if treatment and sun protection are not maintained together.",
    "Dr Divya's Skin & Hair Clinic provides pigmentation treatment that distinguishes between melasma (hormonal, brown patches on cheeks and forehead), post-inflammatory hyperpigmentation (dark marks after acne), and solar lentigines (sun spots) — because each type needs a different approach.",
    "This guide explains the differences, compares treatment options, shares prevention tips for Indian skin in Coimbatore weather, and sets realistic expectations for how long improvement takes.",
  ],
  expandedParagraphs: [
    "Melasma is often triggered by pregnancy, oral contraceptives, thyroid issues, or sun exposure. It appears as symmetrical brown patches on the cheeks, forehead, nose, and upper lip. Sun spots (solar lentigines) are smaller, discrete brown spots from cumulative UV damage. Post-acne marks (PIH) follow breakouts and can last months if skin is not protected. Treating all three the same way — with aggressive peels or lasers — often makes melasma worse.",
    "Coimbatore patients frequently under-use sunscreen because creams feel greasy in humidity. Without SPF 50 reapplied every 2–3 hours outdoors, even the best clinic treatment will fail. Dr Divya builds pigmentation plans that combine in-clinic procedures (peels, laser toning, topical depigmenting agents) with a home routine you can sustain in local weather.",
    "Improvement is gradual. Melasma may lighten 30–50% in 3 months with strict sun protection and topical therapy. Sun spots respond faster to laser or peel — often visible change in 2–4 sessions. Post-acne marks fade over 2–4 months when acne is controlled and SPF is used daily.",
  ],
  sections: [
    {
      title: "Melasma vs sun spots vs post-acne marks",
      items: [
        "Melasma: symmetrical brown patches, often on cheeks; worsens with sun and hormones",
        "Sun spots (solar lentigines): small, round brown spots from UV exposure; common after age 30",
        "Post-acne marks (PIH): flat dark spots where pimples healed; common on Indian skin tones",
        "Tanning: overall darkening from sun exposure — different from localised melasma patches",
        "Each type needs a different treatment intensity — melasma requires gentler, longer plans",
      ],
    },
    {
      title: "Pigmentation treatment comparison",
      items: [
        "Topical depigmenting agents (hydroquinone, kojic acid, arbutin): first-line for melasma; slow but effective with SPF",
        "Chemical peels (glycolic, salicylic, TCA): good for marks, dullness, and mild pigmentation; 4–6 sessions typical",
        "Laser toning (Q-switched / low-fluence): targets sun spots and uneven tone; not always first choice for melasma",
        "Oral tranexamic acid: may help stubborn melasma when prescribed and monitored by a dermatologist",
        "Combination plans: most Coimbatore patients need topicals + in-clinic sessions + strict sun protection",
      ],
    },
    {
      title: "Prevention tips for Coimbatore weather",
      items: [
        "Apply SPF 50 broad-spectrum sunscreen every morning — reapply if outdoors over 2 hours",
        "Choose lightweight, non-comedogenic sunscreens suited to humid climate",
        "Wear a wide-brim hat and sunglasses when driving or walking in midday sun",
        "Avoid picking acne to prevent post-inflammatory dark marks",
        "Use vitamin C serum in the morning for added UV and pollution protection",
        "Avoid bleaching creams and unverified fairness products — they often worsen pigmentation",
      ],
    },
    {
      title: "Expected results timeline",
      items: [
        "Week 2–4: Skin may look slightly brighter; strict SPF is essential from day one",
        "Month 1–2: Post-acne marks begin fading; melasma edges may soften",
        "Month 3–4: Visible lightening of melasma and sun spots with combined therapy",
        "Month 4–6: Best results for most peel and laser protocols; maintenance begins",
        "Ongoing: Pigmentation control is long-term — sun protection never stops",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between melasma and sun spots?",
      answer:
        "Melasma appears as large, symmetrical brown patches — usually on cheeks and forehead — and is driven by hormones and sun. Sun spots are smaller, individual brown marks from UV damage. Melasma needs gentler, longer treatment; sun spots often respond well to laser or peels in fewer sessions.",
    },
    {
      question: "Can pigmentation be cured permanently?",
      answer:
        "Pigmentation can be controlled and significantly lightened, but melasma in particular can return with sun exposure or hormonal changes. Maintenance with daily SPF and periodic clinic sessions keeps results stable long-term.",
    },
    {
      question: "Is laser safe for melasma?",
      answer:
        "Laser must be selected carefully for melasma — wrong settings can worsen patches. Low-fluence laser toning under dermatologist supervision may help, but topicals and peels are often the first step. Dr Divya assesses your pigmentation type before recommending laser.",
    },
    {
      question: "How many chemical peel sessions for pigmentation?",
      answer:
        "Typically 4–6 peels spaced 2–4 weeks apart for acne marks and mild pigmentation. Melasma may need more sessions combined with topicals. Recovery between peels is usually 3–5 days of mild peeling — see our chemical peel page for recovery details.",
    },
    {
      question: "Why does my pigmentation return every summer?",
      answer:
        "Coimbatore's UV index stays high even when it feels cloudy. Without daily SPF 50 and reapplication, melanocytes reactivate and dark patches return. Summer maintenance plans include stronger sun protection and sometimes adjusted topicals.",
    },
  ],
  caseStudies: [
    {
      problem: "38-year-old woman with melasma on cheeks worsening after pregnancy, tried fairness creams without success.",
      treatment: "Triple-combination topical, oral tranexamic acid for 3 months, SPF 50 routine, and 4 gentle glycolic peels.",
      result: "Melasma lightened approximately 40% in 4 months. Patient maintains topicals and daily sunscreen to prevent relapse.",
    },
    {
      problem: "26-year-old with post-acne dark marks on cheeks and forehead after clearing active breakouts.",
      treatment: "Acne maintenance topicals, vitamin C serum, salicylic acid peels x4, and strict sun protection.",
      result: "Marks faded significantly by session 3. Skin tone even by month 4. Linked to ongoing acne treatment plan.",
    },
    {
      problem: "45-year-old man with sun spots on forehead and temples from outdoor work.",
      treatment: "Q-switched laser toning x3 sessions and daily SPF 50 gel.",
      result: "Sun spots reduced by 70% after 3 sessions. Maintenance SPF prevents new spots forming.",
    },
  ],
  beforeAfter: [
    {
      beforeImage: sampleImages.pigmentationBefore,
      afterImage: sampleImages.pigmentationAfter,
      beforeAlt: "Before pigmentation treatment in Coimbatore — uneven skin tone and dark patches on face",
      afterAlt: "After pigmentation treatment in Coimbatore — brighter, more even skin tone after peel and topical therapy",
      caption: "Melasma and uneven tone improvement with combined topical and peel treatment over 4 months",
    },
  ],
  relatedLinks: [
    { label: "Melasma treatment in Coimbatore", href: "/melasma-treatment-coimbatore" },
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" },
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
  ],
};

export const extraTreatmentFaqs: Record<string, SeoLandingFaq[]> = {
  "chemical-peel-coimbatore": [
    {
      question: "What is the recovery time for chemical peels?",
      answer:
        "Superficial peels (glycolic, salicylic): 1–3 days of mild flaking, no significant downtime — you can usually work next day. Medium peels (TCA): 5–7 days of visible peeling and redness. Deep peels need longer recovery and are rarely first-line. Dr Divya selects peel depth based on your skin type and concern.",
    },
  ],
  "laser-treatment-coimbatore": [
    {
      question: "Is laser hair removal permanent?",
      answer:
        "Laser hair removal gives long-lasting reduction — typically 70–90% after a full course of 6–8 sessions — but some fine hairs may regrow and need maintenance once or twice a year. It is most effective on dark hair and lighter skin tones. Consult separately for laser hair removal vs skin laser treatments.",
    },
  ],
  "vitiligo-treatment-coimbatore": [
    {
      question: "What is the best age for vitiligo treatment?",
      answer:
        "Vitiligo can be treated at any age, but early intervention in the first 1–2 years of active spread often gives better repigmentation results. Children and adults both respond to treatment — the approach differs by age, patch location, and activity of the condition. A dermatologist assessment is the best first step regardless of age.",
    },
  ],
};

export const treatmentRichContentBySlug: Record<string, TreatmentRichContent> = {
  "acne-treatment-coimbatore": acneTreatmentContent,
  "hair-fall-treatment-coimbatore": hairFallTreatmentContent,
  "pigmentation-treatment-coimbatore": pigmentationTreatmentContent,
};
