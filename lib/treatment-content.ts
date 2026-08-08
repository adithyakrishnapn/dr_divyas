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
    "Professional dermatologist-led acne and scar treatment plans in Coimbatore. Safe, evidence-based therapies custom-tailored for clear, healthy skin. Schedule a clinical consultation today.",
  intro: [
    "Acne is a highly common and persistent skin concern that affects individuals of all ages. In Coimbatore's humid climate, environmental factors like heat, dust, and pollution can significantly worsen sebum production, leading to painful breakouts that may leave behind deep scars or hyperpigmentation if untreated.",
    "At Dr. Divya's Skin Clinic, we approach acne care with clinical precision. Our treatment begins with a thorough diagnostic evaluation of your skin type, hormone triggers, and lifestyle factors to control active pimples while actively repairing the skin barrier. Patients from Saravanampatti, Peelamedu, RS Puram, Ganapathy, and across Coimbatore visit for dermatologist-led care that delivers safe, predictable results.",
    "From teenage acne to stubborn adult breakouts and post-acne scarring, we design customized, evidence-based plans combining medical topicals, chemical peels, and advanced scar procedures to restore skin health and confidence.",
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
      question: "How easily accessible is the clinic for patients traveling from other parts of Coimbatore?",
      answer:
        "Our clinic is centrally located and highly accessible for patients from all major Coimbatore neighborhoods, including Saravanampatti, Peelamedu, Ganapathy, RS Puram, and Thudiyalur. We recommend scheduling an appointment in advance via phone or WhatsApp to secure a convenient slot.",
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
  beforeAfter: [],
  relatedLinks: [
    { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
    { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" },
    { label: "Subcision & dermaroller in Coimbatore", href: "/subcision-dermaroller-coimbatore" },
    { label: "Melasma treatment in Coimbatore", href: "/melasma-treatment-coimbatore" },
  ],
};

export const hairFallTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-led hair fall and scalp restoration treatments in Coimbatore. Advanced PRP, scalp therapies, and personalized plans for thinning hair and shedding. Schedule an expert scalp evaluation.",
  intro: [
    "Experiencing hair fall or visible thinning can be deeply concerning. While shedding 50 to 100 strands a day is natural, excessive hair loss, widening parts, or localized thinning indicate that it is time for a professional medical evaluation to restore scalp and follicle health.",
    "Coimbatore's environmental conditions—including hard water mineral buildup, high humidity, and sweat accumulation—can weaken the hair shaft and promote fungal scalp irritation, accelerating hair fall. At Dr. Divya's Skin Clinic, we offer advanced trichological diagnostic support to uncover the underlying causes of shedding before starting any therapy.",
    "We combine expert clinical diagnostics (such as scalp trichoscopy) with advanced therapies like PRP and specialized scalp mesotherapy to deliver healthy, sustainable hair restoration and density improvements.",
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
  beforeAfter: [],
  relatedLinks: [
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
    { label: "Vitiligo treatment in Coimbatore", href: "/vitiligo-treatment-coimbatore" },
    { label: "Dermatologist in Saravanampatti", href: "/coimbatore/saravanampatti" },
  ],
};

export const pigmentationTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-led pigmentation and melasma treatments in Coimbatore. Safe, medically advanced chemical peels and laser toning for uneven skin tone and dark spots. Book your skin assessment today.",
  intro: [
    "Uneven skin tone, dark patches, melasma, and sun spots are highly common concerns for patients in Coimbatore. Due to persistent UV exposure—even on cloudy or overcast days—pigmentation can reactivate rapidly, making consistent professional care and medical-grade sun protection vital.",
    "At Dr. Divya's Skin Clinic, we specialize in distinguishing between various forms of hyperpigmentation. We carefully assess whether your patches represent melasma (hormonally triggered), post-inflammatory hyperpigmentation (dark marks left by acne), or solar lentigines (sun spots), as each type requires a completely different clinical approach to prevent worsening.",
    "We focus on identifying the precise depth and type of pigmentation to design highly targeted, safe, and sustainable skin-brightening plans combining dermatologist-supervised chemical peels, laser toning, and customized topical routines.",
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
  beforeAfter: [],
  relatedLinks: [
    { label: "Melasma treatment in Coimbatore", href: "/melasma-treatment-coimbatore" },
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" },
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
  ],
};

export const laserTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-supervised laser skin treatments in Coimbatore. Safe skin rejuvenation, scar care, and pigment toning with advanced technology. Book a skin analysis today.",
  intro: [
    "Laser skin treatments use focused light energy to address targeted concerns like acne scars, dark spots, uneven skin tone, and early signs of aging.",
    "At Dr. Divya's Skin Clinic, all laser sessions are selected and supervised by a qualified dermatologist. We evaluate your skin type, history of sun exposure, and concerns to select the safest wavelengths and parameters."
  ],
  expandedParagraphs: [
    "Skins of color require cautious settings. Incorrect laser settings can cause thermal irritation, resulting in post-inflammatory hyperpigmentation (PIH). That is why we prioritize low-fluence laser toning and gradual, safe improvements rather than quick, aggressive protocols.",
    "Common concerns treated include post-acne pigmentation, sun spots, melasma (as a supportive option), and mild skin texture irregularities. Expect a thorough diagnostic consultation before starting any laser protocol."
  ],
  sections: [
    {
      title: "Laser treatments we offer",
      items: [
        "Laser toning for skin pigmentation and sun damage",
        "Targeted laser sessions for dark spots and solar lentigines",
        "Fractional laser support for acne scar remodeling",
        "Gentle, low-downtime skin rejuvenation protocols"
      ]
    },
    {
      title: "Safety, side effects, and limitations",
      items: [
        "Mild redness and warmth are common but typically fade within a few hours.",
        "Strict sun protection (SPF 50 daily) is mandatory after every session.",
        "Results are gradual; most concerns require 4 to 6 sessions for visible improvement.",
        "Lasers may not be suitable for active skin infections or severe inflammatory conditions."
      ]
    }
  ],
  faqs: [
    {
      question: "How many laser sessions will I need?",
      answer: "Most patients require 4 to 6 sessions spaced 3 to 4 weeks apart. The exact timeline depends on your skin's response, the severity of the concern, and the specific laser settings recommended."
    },
    {
      question: "Is there downtime after laser toning?",
      answer: "Laser toning is a gentle procedure with minimal downtime. You might experience mild redness for 2 to 4 hours. You can resume normal activities immediately, provided you avoid direct sun exposure and apply sunscreen."
    }
  ],
  caseStudies: [],
  beforeAfter: [],
  relatedLinks: [
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" }
  ]
};

export const chemicalPeelContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-supervised chemical peels in Coimbatore for active acne, acne marks, and skin texture. Safe, medical-grade peels. Schedule a consultation.",
  intro: [
    "Chemical peeling involves applying medical-grade exfoliating solutions to the skin to gently shed dead cells, clear pores, and stimulate skin renewal.",
    "At Dr. Divya's Skin Clinic, chemical peels are chosen based on your specific concern—whether active acne, superficial marks, or dullness. A dermatologist assessment is crucial to pick the right peel depth and formula."
  ],
  expandedParagraphs: [
    "Peels are categorized into superficial, medium, and deep. For most concerns, superficial peels (like salicylic or glycolic acid) are preferred due to their safety profile and minimal downtime. They work by clearing excess sebum, reducing acne-causing bacteria, and fading dark spots.",
    "Regular sun protection is essential before and after peeling, as newly exposed skin is sensitive to UV rays. Self-treatment with strong acids at home is highly unsafe and can lead to chemical burns or permanent hyperpigmentation."
  ],
  sections: [
    {
      title: "Peels offered at the clinic",
      items: [
        "Salicylic acid peels for active acne and clogged pores",
        "Glycolic acid peels for superficial dark spots and skin radiance",
        "Combination peels for post-inflammatory hyperpigmentation",
        "Gentle mandelic acid peels for sensitive skin types"
      ]
    },
    {
      title: "What to expect during and after peeling",
      items: [
        "A mild tingling or warm sensation during application, which is normal",
        "Mild flaking or peeling for 2 to 5 days following the procedure",
        "Daily application of moisturizer and broad-spectrum sunscreen is required",
        "Avoiding makeup, scrubbing, or active serums for 48 hours post-peel"
      ]
    }
  ],
  faqs: [
    {
      question: "What is the recovery time after a chemical peel?",
      answer: "Superficial peels have minimal downtime, with mild skin flaking for 2 to 3 days. Medium peels may cause redness and visible peeling for 5 to 7 days. Your dermatologist will advise on the expected recovery based on the peel selected."
    },
    {
      question: "How many peel sessions are recommended?",
      answer: "Usually, a series of 4 to 6 sessions spaced 2 to 4 weeks apart is recommended for optimal results. Maintenance sessions can be done every few months to sustain skin health."
    }
  ],
  caseStudies: [],
  beforeAfter: [],
  relatedLinks: [
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" }
  ]
};

export const vitiligoTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-led vitiligo and white patch care in Coimbatore. Evidence-based medical treatments and repigmentation planning. Book a clinical consultation.",
  intro: [
    "Vitiligo is a skin condition characterized by the loss of pigment, resulting in white patches on various parts of the body.",
    "At Dr. Divya's Skin Clinic, we offer medically sound, evidence-based treatments to stabilize pigment loss and support repigmentation. Early dermatologist consultation is highly recommended to improve treatment outcomes."
  ],
  expandedParagraphs: [
    "Vitiligo is an autoimmune condition where the body's immune system attacks pigment-producing cells (melanocytes). Treatment aims to stop active progression and stimulate pigment cells from hair follicles or surrounding skin.",
    "Clinical evaluation involves identifying the type of vitiligo (segmental or non-segmental) and assessing if the condition is active or stable. Treatment depends on patch location, size, and activity of the condition."
  ],
  sections: [
    {
      title: "Medical management options",
      items: [
        "Topical immunosuppressants and anti-inflammatory creams",
        "Targeted phototherapy or systemic treatments for active spread",
        "Personalized guidelines for stable vitiligo management",
        "Detailed counseling regarding trigger factors and sun protection"
      ]
    },
    {
      title: "Safety, expectations, and limitations",
      items: [
        "Repigmentation is a slow process and varies significantly between patients.",
        "Treatments are safe but require consistent follow-ups to monitor progress and adjust dosage.",
        "Depigmented skin is highly sensitive to sunburn; daily sunscreen application is mandatory.",
        "Stable patches that do not respond to medical therapy may require surgical considerations in later stages."
      ]
    }
  ],
  faqs: [
    {
      question: "What is the best age to start vitiligo treatment?",
      answer: "Vitiligo can be treated at any age. Early medical intervention, particularly within the first 1 to 2 years of active spread, yields better repigmentation results. Dermatologist assessment is the best first step regardless of age."
    },
    {
      question: "How long does it take to see results?",
      answer: "Pigment response is slow. Initial signs of repigmentation (usually as small brown spots within the white patch) may take 2 to 4 months of consistent medical therapy. Patience and adherence to the plan are crucial."
    }
  ],
  caseStudies: [],
  beforeAfter: [],
  relatedLinks: [
    { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" }
  ]
};

export const melasmaTreatmentContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-led melasma treatment in Coimbatore. Safe pigment management, medical peels, and topical protocols to control dark patches. Book your skin review.",
  intro: [
    "Melasma is a common skin condition causing symmetrical brown or gray-brown patches, primarily on the face (cheeks, forehead, and upper lip).",
    "At Dr. Divya's Skin Clinic, we manage melasma with a focus on stabilization and maintenance. Since melasma can be chronic and highly sensitive to heat and UV light, we avoid aggressive protocols that could worsen the patches."
  ],
  expandedParagraphs: [
    "Melasma is driven by a combination of genetic predisposition, UV radiation, heat exposure, and hormonal triggers (such as pregnancy or oral contraceptives). It is different from sun spots or acne marks, and requires gentler, longer-term therapeutic pathways.",
    "A standard clinical plan combines pigment-stabilizing topicals, lightweight sunscreens, and optional gentle chemical peels. Self-treatment with random skin-lightening creams can cause permanent skin thinning or rebound hyperpigmentation."
  ],
  sections: [
    {
      title: "Our approach to melasma care",
      items: [
        "Detailed clinical evaluation to identify the depth of pigment (epidermal, dermal, or mixed)",
        "Topical depigmenting agents to regulate melanin production safely",
        "Dermatologist-supervised superficial peels to target superficial pigment",
        "Customized sun protection plans tailored to daily activities and climate"
      ]
    },
    {
      title: "Sun safety and maintenance guidelines",
      items: [
        "Apply SPF 50 broad-spectrum sunscreen every day, even when indoors or on cloudy days.",
        "Reapply sunscreen every 2 to 3 hours if outdoors or sitting near windows.",
        "Avoid excessive heat exposure (like steam rooms, saunas, or cooking over hot stoves for prolonged periods) as heat triggers melanocytes.",
        "Expect treatment to focus on control and gradual fading; melasma requires ongoing maintenance."
      ]
    }
  ],
  faqs: [
    {
      question: "Can melasma be cured permanently?",
      answer: "Melasma is a chronic condition. While patches can be faded significantly, they can return or darken with sun exposure or hormonal changes. Long-term maintenance and strict sun protection are key to keeping the skin clear."
    },
    {
      question: "Are chemical peels safe for melasma?",
      answer: "Yes, gentle superficial chemical peels are safe when chosen and applied by a dermatologist. Strong or deep peels should be avoided as they can cause inflammation, which may lead to post-inflammatory darkening."
    }
  ],
  caseStudies: [],
  beforeAfter: [],
  relatedLinks: [
    { label: "Pigmentation treatment in Coimbatore", href: "/pigmentation-treatment-coimbatore" },
    { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" }
  ]
};

export const moleWartRemovalContent: TreatmentRichContent = {
  metaDescription:
    "Safe mole, wart, and skin tag removal in Coimbatore using radiofrequency and electrocautery under dermatologist care. Book your clinical appointment.",
  intro: [
    "Moles, warts, and skin tags are common skin growths that can be removed safely using advanced clinical procedures like radiofrequency (RF) or electrocautery.",
    "At Dr. Divya's Skin Clinic, we evaluate all growths before removal to ensure they are benign. Procedures are done in-clinic under local anesthesia to minimize discomfort and support clean healing."
  ],
  expandedParagraphs: [
    "Moles (nevi) are clusters of pigment cells. Warts are caused by a viral infection (HPV) and can spread to other areas of the body if picked or left untreated. Skin tags are harmless, raised growths commonly appearing in areas of friction (like the neck or underarms).",
    "Removal using radiofrequency offers high precision with minimal bleeding and scarring. Self-removal using home remedies, threads, or over-the-counter acids is highly unsafe and can lead to severe infections or permanent scars."
  ],
  sections: [
    {
      title: "Procedures offered at the clinic",
      items: [
        "Radiofrequency (RF) ablation for precise mole and skin tag removal",
        "Electrocautery for viral wart removal and lesion control",
        "Biopsy referral if any growth appears atypical or requires analysis",
        "Post-procedure wound care counseling and scar prevention plans"
      ]
    },
    {
      title: "What to expect during and after removal",
      items: [
        "A small local anesthetic injection is given to numb the area, making the procedure comfortable.",
        "A small scab will form over the treated spot, which typically falls off in 5 to 10 days.",
        "Post-care ointment must be applied daily to support healing and prevent infection.",
        "Sunscreen must be applied over the healed pink skin to prevent dark spot formation."
      ]
    }
  ],
  faqs: [
    {
      question: "Will the procedure leave a scar?",
      answer: "Radiofrequency and electrocautery are precise techniques designed to minimize tissue damage. While a temporary pink mark or mild scar is possible, following post-procedure wound care instructions and applying sunscreen helps support optimal cosmetic healing."
    },
    {
      question: "Do warts return after removal?",
      answer: "Since warts are viral in nature, new warts can occasionally appear in surrounding areas if the underlying viral infection is active. Removing visible warts helps control spread. Multiple sessions are sometimes needed for stubborn viral lesions."
    }
  ],
  caseStudies: [],
  beforeAfter: [],
  relatedLinks: [
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" }
  ]
};

export const cornFootRemovalContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-led corn and callus foot treatments in Coimbatore. Safe removal of painful pressure spots for comfortable walking. Schedule your foot review.",
  intro: [
    "Corns and calluses are areas of thickened skin that develop on the feet due to repeated friction, pressure, or ill-fitting footwear.",
    "At Dr. Divya's Skin Clinic, we offer safe, aseptic removal of painful foot corns using precise clinical procedures. We also guide you on pressure relief and footwear adjustments to prevent recurrence."
  ],
  expandedParagraphs: [
    "Corns have a hard center or core that presses down on nerve endings, causing sharp pain when walking. Calluses are wider patches of thickened skin, typically less painful, developing on the soles. Simply cutting them at home with blades is highly dangerous and frequently leads to deep bacterial infections.",
    "Dermatologist-led removal safely targets the core of the corn under sterile conditions. However, if the pressure trigger (like tight shoes or walking posture) is not corrected, corns are highly likely to return."
  ],
  sections: [
    {
      title: "Removal and management options",
      items: [
        "Aseptic paring or enucleation of the corn core in the clinic",
        "Application of keratolytic agents to soften thickened calluses",
        "Evaluation of foot pressure points and footwear advice",
        "Safety instructions for diabetic foot care (diabetic patients require professional care)"
      ]
    },
    {
      title: "Prevention and aftercare guidelines",
      items: [
        "Apply prescribed post-procedure ointment and keep the site clean.",
        "Avoid wearing tight, narrow-toed, or hard-soled shoes.",
        "Use silicon corn pads or customized orthotics to distribute pressure evenly.",
        "Do not use sharp kitchen or household tools to self-treat corns."
      ]
    }
  ],
  faqs: [
    {
      question: "Is corn removal painful?",
      answer: "The procedure is done after applying a local anesthetic or numbing agent if needed, making the enucleation comfortable. Most patients experience immediate relief from the sharp pressure pain once the hard core of the corn is removed."
    },
    {
      question: "Why do corns keep coming back?",
      answer: "Corns are secondary to mechanical pressure. Paring or removing them clears the thickened skin, but if the friction trigger—such as narrow shoes, walking habit, or bone structure—remains unchanged, the skin will thicken again to protect itself."
    }
  ],
  caseStudies: [],
  beforeAfter: [],
  relatedLinks: [
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" },
    { label: "Chemical peel in Coimbatore", href: "/chemical-peel-coimbatore" }
  ]
};

export const subcisionDermarollerContent: TreatmentRichContent = {
  metaDescription:
    "Dermatologist-performed subcision and dermaroller treatments in Coimbatore for depressed acne scars. Safe skin remodeling. Schedule a scar consultation.",
  intro: [
    "Subcision and dermaroller are clinical procedures designed to treat depressed acne scars, stretch marks, and skin texture irregularities by stimulating natural collagen remodeling.",
    "At Dr. Divya's Skin Clinic, these procedures are performed under strict sterile conditions by a qualified dermatologist. We evaluate scar types (rolling, boxcar, ice pick) to recommend the most effective combinations."
  ],
  expandedParagraphs: [
    "Subcision is highly effective for rolling or tethered scars. It involves inserting a sterile needle beneath the skin to release the fibrous bands that pull the scar downward, allowing the skin to lift. Dermaroller uses micro-needles to create micro-channels in the skin, triggering collagen production and enhancing the absorption of skin-repairing serums.",
    "Both treatments require professional execution to prevent infection, skin damage, or scarring. Results are progressive, with collagen synthesis building gradually over several months."
  ],
  sections: [
    {
      title: "Acne scar procedures we perform",
      items: [
        "Subcision to release deep, tethered rolling acne scars",
        "Dermaroller and microneedling for collagen induction and texture improvement",
        "Combined protocols incorporating peeling or laser for mixed scar profiles",
        "Detailed post-procedure care to promote healing and reduce downtime"
      ]
    },
    {
      title: "Expected timeline and side effects",
      items: [
        "Downtime: 2 to 5 days of swelling, bruising, or mild redness is normal after subcision.",
        "Dermaroller may cause mild redness and flaking lasting 24 to 48 hours.",
        "Consistency: A series of 3 to 6 sessions spaced 4 to 6 weeks apart is typical.",
        "Gradual Improvement: Visible scar remodeling begins around session 3 and continues for months."
      ]
    }
  ],
  faqs: [
    {
      question: "Is subcision painful?",
      answer: "Subcision is performed after numbing the target area with a local anesthetic, which makes the procedure comfortable. You might feel a mild pulling sensation during the release of the scar bands. Mild soreness is normal for a few days after."
    },
    {
      question: "Can dermaroller treat all types of scars?",
      answer: "Dermaroller and microneedling are excellent for superficial boxcar scars and skin texture. However, deep ice-pick scars or tethered rolling scars typically require other procedures like subcision, TCA CROSS, or laser resurfacing for meaningful improvement."
    }
  ],
  caseStudies: [],
  beforeAfter: [],
  relatedLinks: [
    { label: "Acne treatment in Coimbatore", href: "/acne-treatment-coimbatore" },
    { label: "Laser treatment in Coimbatore", href: "/laser-treatment-coimbatore" }
  ]
};

export const extraTreatmentFaqs: Record<string, SeoLandingFaq[]> = {
  "chemical-peel-coimbatore": [
    {
      question: "What is the recovery time for chemical peels?",
      answer:
        "Superficial peels (glycolic, salicylic): 1–3 days of mild flaking, no significant downtime — you can usually work next day. Medium peels (TCA): 5–7 days of visible peeling and redness. Deep peels need longer recovery and are rarely first-line. Dr. Divya selects peel depth based on your skin type and concern.",
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
  "laser-treatment-coimbatore": laserTreatmentContent,
  "chemical-peel-coimbatore": chemicalPeelContent,
  "vitiligo-treatment-coimbatore": vitiligoTreatmentContent,
  "melasma-treatment-coimbatore": melasmaTreatmentContent,
  "mole-wart-skin-tag-removal-coimbatore": moleWartRemovalContent,
  "corn-foot-removal-coimbatore": cornFootRemovalContent,
  "subcision-dermaroller-coimbatore": subcisionDermarollerContent,
};
