import { FieldValue } from "firebase-admin/firestore";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import sanitizeHtml from "sanitize-html";
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  contentHtml: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  views: number;
  /** Custom canonical URL. When blank or absent, the page self-references as canonical. */
  canonicalUrl?: string;
};

type FirestoreBlogDoc = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  image?: string;
  contentHtml: string;
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
  views?: number;
  canonicalUrl?: string;
};

export type CreateBlogInput = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  contentHtml: string;
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
  /** Optional custom canonical URL. Leave blank for self-referencing canonical. */
  canonicalUrl?: string;
};

export type UpdateBlogInput = CreateBlogInput;

const legacyBlogPosts: Array<{
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}> = [
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

const BLOG_COLLECTION = "blogs";
const LOCAL_BLOG_STORE_PATH = path.join(process.cwd(), "data", "blogs.json");

function canPersistToLocalBlogStore() {
  return process.env.NODE_ENV === "development" && process.env.VERCEL !== "1";
}

function isExpectedBlogError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const { message } = error;
  return (
    message === "A blog with this slug already exists." ||
    message === "Blog post not found." ||
    message === "Built-in sample posts cannot be deleted."
  );
}

function shouldFallbackToLocalStore(error: unknown) {
  return canPersistToLocalBlogStore() && !isExpectedBlogError(error);
}

function getRemoteBlogPersistError() {
  return new Error(
    "Blog publishing requires Firebase on the server. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to your hosting provider, then redeploy.",
  );
}

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "a",
    "br",
    "hr",
    "img",
    "figure",
    "figcaption",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "span",
    "div",
    "code",
    "pre",
    "sub",
    "sup",
  ],
  allowedAttributes: {
    "*": ["id", "class", "style", "title"],
    a: ["href", "title", "target", "rel", "id", "class"],
    img: ["src", "alt", "title", "width", "height", "loading", "id", "class"],
    th: ["colspan", "rowspan", "scope", "align", "valign", "id", "class"],
    td: ["colspan", "rowspan", "align", "valign", "id", "class"],
    table: ["border", "cellpadding", "cellspacing", "id", "class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel", "data"],
  allowProtocolRelative: true,
};

function stripTags(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getReadTimeFromHtml(contentHtml: string) {
  const text = stripTags(contentHtml);
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function normalizeKeywords(keywords?: string[]) {
  if (!keywords?.length) {
    return [];
  }

  return keywords
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean)
    .filter((word, index, arr) => arr.indexOf(word) === index)
    .slice(0, 20);
}

function slugifyHeadingText(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ensureHeadingIds(html: string): string {
  if (!html) return html;
  return html.replace(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, innerText) => {
      if (/id=["'][^"']+["']/i.test(attrs)) {
        return match;
      }
      const slugId = slugifyHeadingText(innerText);
      if (!slugId) {
        return match;
      }
      return `<h${level}${attrs} id="${slugId}">${innerText}</h${level}>`;
    }
  );
}

function mapLegacyPost(post: (typeof legacyBlogPosts)[number]): BlogPost {
  const contentHtml = post.content.map((paragraph) => `<p>${paragraph}</p>`).join("\n");

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readTime: post.readTime,
    image: post.image,
    contentHtml: ensureHeadingIds(contentHtml),
    keywords: ["skincare", "dermatology", "skin clinic", "coimbatore"],
    metaTitle: post.title,
    metaDescription: post.description,
    published: true,
    views: 0,
  };
}

function normalizeCanonicalUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return trimmed;
  } catch {
    return undefined;
  }
}

function mapFirestorePost(data: FirestoreBlogDoc): BlogPost | null {
  const slug = data.slug?.trim().toLowerCase();
  const title = data.title?.trim();
  const description = data.description?.trim();
  const contentHtml = data.contentHtml?.trim();

  if (!slug || !title || !description || !contentHtml) {
    return null;
  }

  const cleanHtml = sanitizeHtml(ensureHeadingIds(contentHtml), sanitizeOptions);

  return {
    slug,
    title,
    description,
    date: data.date || new Date().toISOString(),
    readTime: data.readTime ?? getReadTimeFromHtml(cleanHtml),
    image:
      data.image ??
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
    contentHtml: cleanHtml,
    keywords: normalizeKeywords(data.keywords),
    metaTitle: data.metaTitle?.trim() || title,
    metaDescription: data.metaDescription?.trim() || description,
    published: data.published ?? true,
    views: Number(data.views ?? 0),
    canonicalUrl: normalizeCanonicalUrl(data.canonicalUrl),
  };
}

function toFirestoreBlogDoc(payload: FirestoreBlogDoc) {
  const doc: Record<string, unknown> = {
    slug: payload.slug,
    title: payload.title,
    description: payload.description,
    date: payload.date,
    readTime: payload.readTime,
    contentHtml: payload.contentHtml,
    keywords: payload.keywords ?? [],
    metaTitle: payload.metaTitle,
    metaDescription: payload.metaDescription,
    published: payload.published ?? true,
    views: payload.views ?? 0,
    canonicalUrl: payload.canonicalUrl ?? null,
  };

  if (payload.image?.trim()) {
    doc.image = payload.image.trim();
  }

  return doc;
}

const hairLossPostHtml = sanitizeHtml(
  ensureHeadingIds(`
<p>Hair fall can happen for many reasons. Some people notice more hair on their pillow or in the shower, while others gradually see thinning around the crown or a widening hair part. If you have been searching for a dermatologist for hair loss in Coimbatore, this guide will walk you through why hair loss happens, how it is diagnosed, and what treatment options are usually considered.</p>

<p>This article is meant to help you understand hair loss better before you decide to see a specialist. If you are already looking for treatment, you can go straight to our <a href="https://www.drdivyas.in/hair-fall-treatment-coimbatore">hair fall treatment in Coimbatore</a> page.</p>

<h2>Table of Contents</h2>
<ul>
<li><a href="#why-hair-loss-happens">Why Hair Loss Happens</a></li>
<li><a href="#when-to-see-a-dermatologist">When Should You See a Dermatologist for Hair Loss?</a></li>
<li><a href="#how-diagnosis-works">How a Dermatologist Diagnoses Hair Loss</a></li>
<li><a href="#treatment-options">Hair Loss Treatment Options in Coimbatore</a></li>
<li><a href="#male-pattern-hair-loss">Male-Pattern Hair Loss</a></li>
<li><a href="#female-hair-loss">Female Hair Loss</a></li>
<li><a href="#pcos-hair-loss">Hair Loss Associated With PCOS</a></li>
<li><a href="#postpartum-hair-loss">Postpartum Hair Loss</a></li>
<li><a href="#comparison-table">Comparing Hair Loss Treatments</a></li>
<li><a href="#consultation-process">What Happens During a Hair Loss Consultation?</a></li>
<li><a href="#treatment-timeline">How Long Does Hair Loss Treatment Take?</a></li>
<li><a href="#choosing-a-dermatologist">How to Choose a Dermatologist for Hair Loss Treatment in Coimbatore</a></li>
<li><a href="#faq">Frequently Asked Questions</a></li>
</ul>

<h2 id="why-hair-loss-happens">Why Hair Loss Happens</h2>

<p>Hair loss is not one single condition. It is a symptom that can come from several different causes, and two people with similar hair thinning can have completely different reasons behind it. This is why a proper evaluation matters more than trying random shampoos or supplements.</p>

<p>Some of the common causes seen in clinic include:</p>

<ul>
<li><strong>Genetic hair loss:</strong> Some people are simply more likely to lose hair earlier because of family history.</li>
<li><strong>Male-pattern hair loss:</strong> A gradual, patterned thinning that usually starts at the hairline or crown.</li>
<li><strong>Female-pattern hair loss:</strong> Diffuse thinning across the scalp, often more noticeable at the parting.</li>
<li><strong>Nutritional deficiencies:</strong> Low iron, protein, or certain vitamins can affect hair growth cycles.</li>
<li><strong>Stress:</strong> Physical or emotional stress can push hair follicles into a resting phase, leading to shedding a few months later.</li>
<li><strong>Illness or fever:</strong> A recent illness, surgery, or high fever can trigger temporary hair shedding.</li>
<li><strong>Thyroid problems:</strong> Both underactive and overactive thyroid can affect hair thickness.</li>
<li><strong>PCOS:</strong> Hormonal changes linked to PCOS can sometimes contribute to hair thinning.</li>
<li><strong>Hormonal changes:</strong> Puberty, pregnancy, and menopause can all influence hair growth.</li>
<li><strong>Postpartum shedding:</strong> Many women notice increased hair fall a few months after delivery.</li>
<li><strong>Dandruff and scalp conditions:</strong> An irritated or inflamed scalp can make hair fall worse.</li>
<li><strong>Certain medications:</strong> Some medicines list hair thinning as a side effect.</li>
<li><strong>Tight hairstyles and traction:</strong> Constant pulling from tight braids or ponytails can weaken hair over time.</li>
<li><strong>Other medical causes:</strong> Less commonly, autoimmune conditions or scalp infections can also cause hair loss.</li>
</ul>

<p>Because the causes are so varied, the same hair fall shampoo or oil that worked for a friend may not work for you. If you want general home-care tips, our article on <a href="https://www.drdivyas.in/blog/how-to-stop-hair-loss-and-regrow-hair-naturally-dermatologist-approved-tips">natural ways to reduce hair loss</a> covers that in more detail.</p>

<h2 id="when-to-see-a-dermatologist">When Should You See a Dermatologist for Hair Loss?</h2>

<p>A few strands of hair fall every day is normal. Hair has a natural growth and shedding cycle, so losing some hair daily does not automatically mean something is wrong. However, there are certain signs that suggest it is worth getting checked.</p>

<ul>
<li>You notice clearly more hair than usual on your pillow, comb, or in the shower drain</li>
<li>Your hair part looks wider than it used to</li>
<li>You can see patches of scalp that were not visible before</li>
<li>Hair loss started suddenly, or seems linked to an illness, medication, or stressful event</li>
<li>You notice round bald patches rather than gradual thinning</li>
<li>Home remedies and over-the-counter products have not helped after a few months</li>
<li>Hair fall is affecting your confidence or daily life</li>
</ul>

<p>If any of this sounds familiar, it may be a good time to consult a dermatologist for hair fall in Coimbatore rather than waiting and hoping it resolves on its own.</p>

<h2 id="how-diagnosis-works">How a Dermatologist Diagnoses Hair Loss</h2>

<p>A good hair loss consultation is not just a quick look at your scalp. It usually involves understanding your history first, then examining the hair and scalp, and only ordering tests when they are actually needed.</p>

<p>Depending on your case, the dermatologist may look into:</p>

<ul>
<li><strong>Medical history:</strong> Questions about when the hair fall started, family history, diet, stress levels, recent illness, and any medications you are taking.</li>
<li><strong>Hair and scalp examination:</strong> A close look at hair density, thickness, and the scalp itself for redness, flaking, or infection.</li>
<li><strong>Pattern of hair loss:</strong> Whether the thinning is diffuse, patterned, or in patches, since this often points toward the likely cause.</li>
<li><strong>Pull test when appropriate:</strong> Gently checking how easily hair strands come out, which can indicate active shedding.</li>
<li><strong>Blood tests when medically indicated:</strong> Tests for thyroid function, iron levels, or vitamin D may be suggested if the history or examination points that way.</li>
<li><strong>Assessment of hormonal or nutritional factors when relevant:</strong> Particularly in women with irregular periods or other symptoms suggestive of PCOS or thyroid issues.</li>
</ul>

<p>Not every patient needs blood tests. Many cases of hair loss, such as clear male or female pattern hair loss, can be reasonably diagnosed through history and examination alone. Tests are usually reserved for cases where an underlying medical cause is suspected.</p>

<h2 id="treatment-options">Hair Loss Treatment Options in Coimbatore</h2>

<p>Once the likely cause is identified, your dermatologist can discuss which treatment options make sense for your situation. There is no single treatment that works for everyone, and what suits one person may not suit another.</p>

<h3>Medical Therapy</h3>

<p>For many types of hair loss, especially male and female pattern hair loss, dermatologists may recommend topical or oral treatments that are known to slow hair loss and support regrowth in suitable candidates. These are prescribed based on your specific diagnosis, age, gender, and overall health, and should not be started on your own without medical guidance. Your dermatologist will explain how the treatment works, how long it typically needs to be used, and what to realistically expect.</p>

<h3>PRP Therapy for Hair Loss</h3>

<p>PRP, or platelet-rich plasma therapy, is a treatment where a small amount of your own blood is drawn and processed to concentrate the platelets, which are then injected into areas of thinning scalp. The idea is that platelets contain growth factors that may support hair follicle activity.</p>

<p>Here is what the process generally looks like:</p>

<ul>
<li>A small blood sample is taken, similar to a routine blood test</li>
<li>The sample is processed in a centrifuge to separate the platelet-rich portion</li>
<li>This concentrate is injected into the scalp in the areas of thinning</li>
</ul>

<p>PRP may be considered for people with early to moderate pattern hair loss, though suitability depends on individual assessment. Most dermatologists recommend a series of sessions rather than a single sitting, since hair growth happens gradually and response builds up over multiple treatments. Results vary from person to person, and PRP is not a guaranteed fix for all types of hair loss. It works best when combined with an accurate diagnosis and, where needed, other supporting treatments.</p>

<h3>Mesotherapy</h3>

<p>Mesotherapy for hair loss involves injecting a mixture of vitamins, minerals, or other nourishing substances directly into the scalp. The aim is to deliver nutrients closer to the hair follicles rather than relying only on oral supplements or topical products.</p>

<p>Whether mesotherapy is suitable for you depends on your specific type and stage of hair loss, and it is not considered a universally superior option compared to other treatments. Your dermatologist can advise whether it fits into your overall treatment plan after evaluating your case.</p>

<h3>Scalp Treatment</h3>

<p>Sometimes the scalp itself is part of the problem. Dandruff, fungal infections, inflammation, or other scalp conditions can make hair shedding worse or slow down recovery even after starting other treatments. Addressing these issues, whether through medicated shampoos, topical treatments, or managing an underlying skin condition, is often an important part of getting hair fall under control.</p>

<h2 id="male-pattern-hair-loss">Male-Pattern Hair Loss</h2>

<p>Male-pattern hair loss usually follows a recognizable path. It often starts with a receding hairline at the temples, followed by thinning at the crown. Over time, the hair follicles in these areas become progressively smaller in a process called miniaturization, where each new hair grows back finer and shorter than before, until eventually some follicles stop producing visible hair.</p>

<p>This pattern is largely influenced by genetics and hormones, and it tends to progress gradually over years rather than happening overnight. Early evaluation can be useful because some treatments work better when started before extensive thinning has occurred. For a more detailed look at options for men, see our guide on <a href="https://www.drdivyas.in/blog/hair-loss-treatment-for-men-in-coimbatore">hair loss treatment for men in Coimbatore</a>.</p>

<h2 id="female-hair-loss">Female Hair Loss</h2>

<p>Hair loss in women often looks different from the male pattern. Instead of a receding hairline, women more commonly notice diffuse thinning spread across the scalp, with the parting appearing wider over time. The overall hairline at the front is usually preserved.</p>

<p>Common contributing factors in women include hormonal changes, thyroid conditions, iron deficiency, PCOS, postpartum shedding, and sometimes chronic stress. Because the causes overlap so much, a proper evaluation is particularly useful for women trying to understand why their hair is thinning.</p>

<h2 id="pcos-hair-loss">Hair Loss Associated With PCOS</h2>

<p>PCOS, or polycystic ovary syndrome, is a hormonal condition that can affect some women's hair growth. In PCOS, higher levels of certain hormones called androgens can, in some individuals, lead to a pattern of hair thinning similar to male-pattern hair loss, along with other possible symptoms like irregular periods or acne.</p>

<p>It is important to understand that PCOS does not always cause hair loss, and not everyone with hair thinning has PCOS. If your dermatologist suspects a hormonal link, they may recommend working alongside a gynecologist to address the condition more comprehensively, alongside any scalp-specific treatment.</p>

<h2 id="postpartum-hair-loss">Postpartum Hair Loss</h2>

<p>Many women notice increased hair shedding a few months after giving birth. During pregnancy, hormonal changes often keep more hair in the growth phase than usual, which can make hair appear fuller. After delivery, hormone levels shift back, and the hair that was being held in the growth phase enters the shedding phase all at once.</p>

<p>This kind of shedding is common and, for most women, gradually settles down as hormone levels stabilize. The exact timeline and how noticeable it feels can vary quite a bit between individuals. If shedding continues well beyond the expected period or feels excessive, it is reasonable to get it evaluated rather than assuming it will resolve on its own.</p>

<h2 id="comparison-table">Comparing Hair Loss Treatments</h2>

<p>The table below gives a general overview of commonly used treatments. It is meant as a reference, not a recommendation for any specific treatment. The right option, or combination of options, depends on your diagnosis.</p>

<table id="comparison-table">
<thead>
<tr>
<th>Treatment</th>
<th>What it involves</th>
<th>Common purpose</th>
<th>Who may benefit</th>
<th>Important considerations</th>
</tr>
</thead>
<tbody>
<tr>
<td>Medical Therapy</td>
<td>Prescribed topical or oral treatments</td>
<td>Slowing hair loss progression, supporting regrowth in suitable cases</td>
<td>People with confirmed pattern hair loss or other diagnosed causes</td>
<td>Requires consistent use over months; not suitable for everyone; needs medical supervision</td>
</tr>
<tr>
<td>PRP Therapy</td>
<td>Injection of concentrated platelets from your own blood into the scalp</td>
<td>May support follicle activity in thinning areas</td>
<td>People with early to moderate hair thinning, after evaluation</td>
<td>Usually needs multiple sessions; results vary; not guaranteed for all hair loss types</td>
</tr>
<tr>
<td>Mesotherapy</td>
<td>Injection of nutrients directly into the scalp</td>
<td>Delivering nourishment closer to hair follicles</td>
<td>Selected patients based on individual assessment</td>
<td>Suitability depends on diagnosis; not a universal solution</td>
</tr>
<tr>
<td>Scalp Treatment</td>
<td>Medicated or targeted treatment for scalp conditions</td>
<td>Addressing dandruff, inflammation, or infection contributing to hair fall</td>
<td>Anyone with an underlying scalp issue alongside hair loss</td>
<td>Often used together with other treatments rather than alone</td>
</tr>
</tbody>
</table>

<h2 id="consultation-process">What Happens During a Hair Loss Consultation?</h2>

<p>If you are considering visiting a dermatologist for hair fall in Coimbatore, it can help to know roughly what to expect from the visit.</p>

<ol>
<li><strong>Discussion about your hair fall:</strong> You will be asked to describe when it started, how it has changed, and what you have already tried.</li>
<li><strong>Medical and lifestyle history:</strong> Questions about your diet, stress levels, sleep, family history, and any existing health conditions.</li>
<li><strong>Examination of the scalp and hair:</strong> A close look at hair density, thickness, and scalp condition.</li>
<li><strong>Identifying possible causes:</strong> Based on the history and examination, the dermatologist forms an idea of what might be contributing to your hair loss.</li>
<li><strong>Tests if required:</strong> Blood tests or other investigations are ordered only if they are likely to change the diagnosis or treatment plan.</li>
<li><strong>Treatment planning:</strong> A plan is discussed based on your specific diagnosis, preferences, and lifestyle.</li>
<li><strong>Follow-up:</strong> Since hair growth takes time, follow-up visits help track progress and adjust the plan if needed.</li>
</ol>

<h2 id="treatment-timeline">How Long Does Hair Loss Treatment Take?</h2>

<p>Hair growth is a slow process by nature, and this does not change just because a treatment has started. Hair grows in cycles, and it typically takes several months before any visible improvement can be assessed, regardless of which treatment is used.</p>

<p>Most dermatologists will ask you to continue a treatment plan for at least a few months before judging whether it is working, since stopping too early makes it hard to tell if a treatment would have helped. There is no treatment that regrows hair in a matter of weeks, and any claim promising permanent or guaranteed results should be viewed with caution. Realistic expectations, along with patience and consistency, tend to give the best sense of how a treatment is actually working for you.</p>

<h2 id="choosing-a-dermatologist">How to Choose a Dermatologist for Hair Loss Treatment in Coimbatore</h2>

<p>With so many clinics offering hair treatments today, it can be confusing to know who to consult. A few practical factors can help you decide:</p>

<ul>
<li><strong>Proper dermatology qualification:</strong> Look for a qualified, registered dermatologist rather than a general wellness or beauty clinic.</li>
<li><strong>Experience with different causes of hair loss:</strong> Hair fall has many possible causes, so experience across pattern hair loss, hormonal causes, and scalp conditions is useful.</li>
<li><strong>Proper diagnosis before treatment:</strong> Be cautious of any clinic that recommends a specific treatment, like PRP, without first examining you or understanding your history.</li>
<li><strong>Individualized treatment planning:</strong> Your treatment plan should be based on your specific diagnosis rather than a one-size-fits-all package.</li>
<li><strong>Appropriate follow-up:</strong> Hair treatment is rarely a single visit. Ongoing follow-up helps track whether the plan is working.</li>
<li><strong>Transparent explanation of treatment options:</strong> A good consultation should explain the pros, limitations, and realistic expectations of each option, not just push one treatment.</li>
<li><strong>Clinic accessibility:</strong> Since some treatments need multiple visits, a clinic that is easy to reach can make follow-up more practical.</li>
</ul>

<p>Dr Divya's Skin & Hair Clinic in <a href="https://www.drdivyas.in/coimbatore">Coimbatore</a> follows this approach of proper evaluation before recommending any treatment. If you would like to discuss your hair fall with a dermatologist, you can view details of our <a href="https://www.drdivyas.in/hair-fall-treatment-coimbatore">hair fall treatment in Coimbatore</a> or <a href="https://www.drdivyas.in/contact">get in touch with the clinic</a> to book a consultation.</p>

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Which doctor should I consult for hair loss?</h3>
<p>A dermatologist is the most appropriate specialist for hair loss, since hair and scalp conditions fall within their area of training. Depending on the underlying cause, a dermatologist may also work alongside other specialists, such as an endocrinologist or gynecologist, when needed.</p>

<h3>When should I see a dermatologist for hair fall?</h3>
<p>It is reasonable to consult a dermatologist if you notice a sudden increase in hair fall, visible thinning or patches, a widening hair part, or if hair fall continues despite trying home remedies for a few months.</p>

<h3>What causes excessive hair fall?</h3>
<p>Excessive hair fall can be caused by genetic pattern hair loss, nutritional deficiencies, thyroid problems, PCOS, stress, illness, certain medications, scalp conditions, or a combination of these factors. A proper evaluation helps identify the likely cause in your case.</p>
`),
  sanitizeOptions,
);

const hairLossPost: BlogPost = {
  slug: "best-dermatologist-for-hair-loss-treatment-in-coimbatore",
  title: "Best Dermatologist for Hair Loss Treatment in Coimbatore",
  description:
    "A comprehensive guide on hair loss causes, dermatologist evaluation, PRP, mesotherapy options, and choosing the best dermatologist in Coimbatore.",
  date: "2026-04-20",
  readTime: "8 min read",
  image:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  contentHtml: hairLossPostHtml,
  keywords: ["hair loss", "dermatologist", "coimbatore", "prp treatment", "hair fall"],
  metaTitle: "Best Dermatologist for Hair Loss Treatment in Coimbatore",
  metaDescription:
    "Comprehensive guide to hair loss causes, dermatologist diagnosis, PRP therapy, and hair fall treatment options in Coimbatore.",
  published: true,
  views: 0,
};

const hairLossMenPostHtml = sanitizeHtml(
  ensureHeadingIds(`
<p>Hair loss in men is one of the most common dermatology concerns we see at clinic. Whether you are noticing a receding hairline, thinning at the crown, or both, understanding why it happens and what options exist can help you make an informed decision about whether to seek treatment.</p>

<p>This article focuses specifically on hair loss treatment for men in Coimbatore — what causes it, when treatment is worth considering, and what a proper dermatology evaluation looks like.</p>

<h2>Table of Contents</h2>
<ul>
<li><a href="#male-pattern-baldness">Male Pattern Baldness — What It Really Is</a></li>
<li><a href="#other-causes-in-men">Other Causes of Hair Loss in Men</a></li>
<li><a href="#when-to-seek-treatment">When Should Men Seek Hair Loss Treatment?</a></li>
<li><a href="#treatment-options-for-men">Hair Loss Treatment Options for Men</a></li>
<li><a href="#medical-therapy-men">Medical Therapy</a></li>
<li><a href="#prp-men">PRP Therapy for Men</a></li>
<li><a href="#what-to-expect">What to Expect at Your First Consultation</a></li>
<li><a href="#realistic-expectations">Realistic Expectations From Hair Loss Treatment</a></li>
<li><a href="#choosing-dermatologist-men">Choosing the Right Dermatologist for Hair Loss in Coimbatore</a></li>
<li><a href="#faq-men">Frequently Asked Questions</a></li>
</ul>

<h2 id="male-pattern-baldness">Male Pattern Baldness — What It Really Is</h2>

<p>Male pattern baldness, medically known as androgenetic alopecia, is the most common type of hair loss in men. It follows a recognizable progression — typically starting with a receding hairline at the temples, followed by thinning at the crown. Over time, these two areas may merge, leaving hair only on the sides and back of the scalp.</p>

<p>This pattern is driven by a combination of genetics and a hormone called dihydrotestosterone (DHT). DHT gradually causes the hair follicles in susceptible areas to shrink, producing progressively thinner and shorter hairs until the follicle eventually stops producing visible hair. This process, called miniaturization, can begin as early as the late teens or early twenties in some men, though it is more commonly noticed in the thirties and forties.</p>

<p>The important point is that male pattern hair loss progresses over time. Early assessment can be useful because some treatments are more effective at slowing or stabilizing hair loss when started before extensive miniaturization has occurred.</p>

<h2 id="other-causes-in-men">Other Causes of Hair Loss in Men</h2>

<p>Not all hair loss in men is pattern hair loss. It is worth knowing about other possible causes:</p>

<ul>
<li><strong>Telogen effluvium:</strong> Sudden shedding triggered by illness, fever, surgery, rapid weight loss, or severe stress. Usually temporary.</li>
<li><strong>Alopecia areata:</strong> An autoimmune condition causing patchy round bald spots on the scalp or beard.</li>
<li><strong>Scalp infections:</strong> Fungal infections of the scalp can cause localised hair loss and require specific treatment.</li>
<li><strong>Nutritional deficiencies:</strong> Low iron, protein, zinc, or vitamin D can contribute to hair shedding, particularly in men with restricted diets.</li>
<li><strong>Thyroid dysfunction:</strong> Both hypothyroidism and hyperthyroidism can affect hair thickness and growth rate.</li>
<li><strong>Medication side effects:</strong> Certain medicines for blood pressure, gout, or other conditions can list hair thinning as a side effect.</li>
<li><strong>Traction and styling:</strong> Constant pulling from tight hairstyles or frequent heat use can damage follicles over time.</li>
</ul>

<p>A dermatologist can usually differentiate between these causes based on the pattern of hair loss, your history, and a scalp examination — blood tests are only ordered when medically relevant.</p>

<h2 id="when-to-seek-treatment">When Should Men Seek Hair Loss Treatment?</h2>

<p>Many men delay seeking help, either hoping hair loss will stop on its own, or assuming nothing can be done. While some hair loss is temporary and resolves without treatment, male pattern hair loss is progressive. There are clear signs it is worth getting assessed:</p>

<ul>
<li>Your hairline has visibly receded compared to two or three years ago</li>
<li>You can see thinning or scalp visibility at the crown</li>
<li>You notice more hair on your pillow, in the shower drain, or on your comb</li>
<li>Round bald patches have appeared — this warrants prompt assessment</li>
<li>Hair loss started suddenly following an illness, surgery, or stressful event</li>
<li>You have tried shampoos or supplements for months without any improvement</li>
</ul>

<p>The earlier a proper evaluation happens, the more options tend to be available. Waiting until hair loss is advanced reduces the effectiveness of most available treatments.</p>

<h2 id="treatment-options-for-men">Hair Loss Treatment Options for Men</h2>

<p>There is no single treatment that works for all men or all types of hair loss. What works depends on the type and stage of hair loss, how long it has been progressing, your age, and other health factors. A dermatologist will evaluate your specific case before recommending anything.</p>

<h3 id="medical-therapy-men">Medical Therapy</h3>

<p>For male pattern baldness, dermatologists may prescribe topical or oral medications that work by addressing the hormonal pathway involved in follicle miniaturization. These treatments can help slow or stabilize hair loss and, in some men, support gradual regrowth in thinning areas.</p>

<p>These medications require consistent use over months to see results, and effects are maintained only as long as treatment continues. They are prescription medications that should be used under medical supervision — your dermatologist will assess whether they are appropriate for you based on your health history.</p>

<h3 id="prp-men">PRP Therapy for Men</h3>

<p>PRP, or platelet-rich plasma therapy, is a procedure where a small blood sample is taken, processed to concentrate the platelets, and then injected into thinning areas of the scalp. Platelets contain growth factors that may support follicle activity.</p>

<p>For men with early to moderate pattern hair loss, PRP may be considered as part of a treatment plan — often alongside medical therapy rather than as a standalone solution. It is not effective for areas where follicles have already been completely lost, and results vary between individuals. Most dermatologists recommend a series of sessions with follow-up assessments to gauge response.</p>

<h3>Scalp and Nutritional Assessment</h3>

<p>For men whose hair loss has a nutritional or scalp-related component, addressing these underlying factors — whether through dietary changes, supplementation, or scalp treatment — is an important part of the overall plan. Treating a scalp condition like dandruff or inflammation alongside other hair loss treatment often improves outcomes.</p>

<h2 id="what-to-expect">What to Expect at Your First Consultation</h2>

<p>A hair loss consultation for men at a dermatology clinic typically covers:</p>

<ol>
<li><strong>History:</strong> When the hair loss started, how quickly it has progressed, family history of baldness, current medications, and lifestyle factors.</li>
<li><strong>Scalp examination:</strong> Looking at the pattern of thinning, density, scalp condition, and evidence of miniaturization.</li>
<li><strong>Diagnosis:</strong> Determining whether this is pattern hair loss, a secondary cause, or a combination.</li>
<li><strong>Blood tests if indicated:</strong> Only ordered when the history or examination suggests an underlying cause like thyroid dysfunction or nutritional deficiency.</li>
<li><strong>Treatment discussion:</strong> Explaining the realistic options based on your diagnosis, age, and how far hair loss has progressed.</li>
<li><strong>Follow-up plan:</strong> Since hair treatment takes months, a follow-up structure helps monitor progress.</li>
</ol>

<h2 id="realistic-expectations">Realistic Expectations From Hair Loss Treatment</h2>

<p>This is worth emphasising: no treatment reverses hair loss overnight, and no treatment permanently restores hair that has been lost from follicles that have completely stopped producing hair. Effective treatment for men typically achieves one or more of the following:</p>

<ul>
<li>Slowing or stopping the progression of hair loss</li>
<li>Stabilizing the current level of hair</li>
<li>In some cases, modest regrowth in recently thinned areas</li>
</ul>

<p>Results take time — typically four to six months before meaningful assessment is possible. Consistency matters more than speed. Men who stick with a properly diagnosed treatment plan are more likely to see stable results than those who switch approaches frequently based on what they read online.</p>

<h2 id="choosing-dermatologist-men">Choosing the Right Dermatologist for Hair Loss in Coimbatore</h2>

<p>When looking for a hair loss specialist in Coimbatore, a few factors matter:</p>

<ul>
<li><strong>Qualified dermatologist:</strong> Hair loss treatment falls within dermatology and trichology. A properly qualified specialist is better placed to diagnose accurately than a general wellness clinic.</li>
<li><strong>Diagnosis before treatment:</strong> Be cautious of clinics that push a specific treatment (like PRP) before properly examining you or understanding your history.</li>
<li><strong>Transparent about limitations:</strong> A good dermatologist explains what treatment can and cannot achieve, rather than promising guaranteed results.</li>
<li><strong>Follow-up support:</strong> Hair treatment is not a one-time event. Ongoing review helps track progress and adjust the plan.</li>
</ul>

<p>At Dr Divya's Skin &amp; Hair Clinic in Coimbatore, male hair loss is evaluated with a proper scalp assessment and medical history before any treatment is recommended. If you would like to consult about your specific situation, you can view our <a href="https://www.drdivyas.in/hair-fall-treatment-coimbatore">hair fall treatment in Coimbatore</a> page or <a href="https://www.drdivyas.in/contact">contact the clinic</a> directly.</p>

<h2 id="faq-men">Frequently Asked Questions</h2>

<h3>Can hair loss in men be reversed?</h3>
<p>For male pattern baldness, the goal of treatment is typically to slow or stop progression and, in some men, achieve modest regrowth in early-stage thinning. Complete reversal is not possible once follicles have stopped producing hair. Early treatment gives better outcomes.</p>

<h3>At what age does hair loss treatment work best?</h3>
<p>Earlier treatment generally means more follicles are still active and can respond. That said, many men benefit from treatment even in their forties and fifties — it depends more on the current stage of hair loss than age alone.</p>

<h3>Is PRP effective for male pattern baldness?</h3>
<p>PRP may be useful for some men with early to moderate pattern hair loss, but it is not effective for all cases and often works best as part of a broader treatment plan. Suitability depends on individual assessment.</p>

<h3>How long does hair loss treatment take to show results?</h3>
<p>Most hair loss treatments need at least four to six months of consistent use before meaningful results can be assessed. Hair grows slowly, and changes in density and thickness take time to become visible.</p>
`),
  sanitizeOptions,
);

const hairLossMenPost: BlogPost = {
  slug: "hair-loss-treatment-for-men-in-coimbatore",
  title: "Hair Loss Treatment for Men in Coimbatore",
  description:
    "A practical guide to male hair loss causes, treatment options including PRP and medical therapy, and what to expect from a dermatologist consultation in Coimbatore.",
  date: "2026-05-10",
  readTime: "9 min read",
  image:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  contentHtml: hairLossMenPostHtml,
  keywords: [
    "hair loss treatment men coimbatore",
    "male pattern baldness coimbatore",
    "hair fall treatment men",
    "prp hair loss men coimbatore",
    "dermatologist hair loss coimbatore",
  ],
  metaTitle: "Hair Loss Treatment for Men in Coimbatore | Dr. Divya's Clinic",
  metaDescription:
    "Guide to hair loss treatment for men in Coimbatore — causes, PRP therapy, medical options, and how a dermatologist evaluates and treats male hair loss.",
  published: true,
  views: 0,
};

export const blogPosts: BlogPost[] = [
  ...legacyBlogPosts.map(mapLegacyPost),
  hairLossPost,
  {
    ...hairLossPost,
    slug: "best-dermatologist-coimbatore-hair-loss-treatment",
  },
  hairLossMenPost,
];

async function readLocalPosts() {
  try {
    const raw = await readFile(LOCAL_BLOG_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalPosts(posts: BlogPost[]) {
  await mkdir(path.dirname(LOCAL_BLOG_STORE_PATH), { recursive: true });
  await writeFile(LOCAL_BLOG_STORE_PATH, JSON.stringify(posts, null, 2), "utf8");
}

function dedupePosts(posts: BlogPost[]) {
  const bySlug = new Map<string, BlogPost>();

  for (const post of posts) {
    bySlug.set(post.slug, post);
  }

  return [...bySlug.values()];
}

function sortByDateDesc(posts: BlogPost[]) {
  return [...posts].sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime();
  });
}

async function getLocalPostsMerged() {
  const localPosts = await readLocalPosts();
  return dedupePosts(sortByDateDesc([...localPosts, ...blogPosts]));
}

async function getFirestorePosts() {
  const db = getFirebaseAdminDb();
  const snapshot = await db.collection(BLOG_COLLECTION).get();

  return snapshot.docs
    .map((doc) => mapFirestorePost(doc.data() as FirestoreBlogDoc))
    .filter((post): post is BlogPost => post !== null);
}

async function mergePostsWithFirestore(firestorePosts: BlogPost[]) {
  const localPosts = await readLocalPosts();
  return dedupePosts(sortByDateDesc([...blogPosts, ...localPosts, ...firestorePosts]));
}

async function findAnyPostBySlug(slug: string) {
  const mergedPosts = await getAllPostsForAdmin();
  return mergedPosts.find((post) => post.slug === slug);
}

async function updateLocalPosts(slug: string, post: BlogPost) {
  const localPosts = await readLocalPosts();
  const nextPosts = localPosts.filter((item) => item.slug !== slug);
  nextPosts.push(post);
  await writeLocalPosts(nextPosts);
}

async function deleteLocalPost(slug: string) {
  const localPosts = await readLocalPosts();
  const nextPosts = localPosts.filter((post) => post.slug !== slug);

  if (nextPosts.length === localPosts.length) {
    return false;
  }

  await writeLocalPosts(nextPosts);
  return true;
}

export async function getPublishedPosts() {
  if (!isFirebaseAdminConfigured()) {
    return (await getLocalPostsMerged()).filter((post) => post.published !== false);
  }

  try {
    const merged = await mergePostsWithFirestore(await getFirestorePosts());
    return merged.filter((post) => post.published !== false);
  } catch (error) {
    console.error("Failed to load published blog posts from Firestore.", error);
    return (await getLocalPostsMerged()).filter((post) => post.published !== false);
  }
}

export async function getAllPostsForAdmin() {
  if (!isFirebaseAdminConfigured()) {
    return getLocalPostsMerged();
  }

  try {
    return mergePostsWithFirestore(await getFirestorePosts());
  } catch (error) {
    console.error("Failed to load admin blog posts from Firestore.", error);
    return getLocalPostsMerged();
  }
}

export async function getPostBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  const builtInMatch = blogPosts.find(
    (post) =>
      post.slug === normalizedSlug ||
      (normalizedSlug.includes("hair-loss") &&
        normalizedSlug.includes("coimbatore") &&
        post.slug.includes("hair-loss"))
  );

  if (builtInMatch) {
    return builtInMatch;
  }

  if (isFirebaseAdminConfigured()) {
    try {
      const firestorePost = (await getFirestorePosts()).find((post) => post.slug === normalizedSlug);
      if (firestorePost) {
        return {
          ...firestorePost,
          contentHtml: sanitizeHtml(ensureHeadingIds(firestorePost.contentHtml), sanitizeOptions),
        };
      }
    } catch (error) {
      console.error("Failed to load blog post from Firestore.", error);
    }
  }

  const localPost = (await getLocalPostsMerged()).find((post) => post.slug === normalizedSlug);
  if (localPost) {
    return {
      ...localPost,
      contentHtml: sanitizeHtml(ensureHeadingIds(localPost.contentHtml), sanitizeOptions),
    };
  }

  return undefined;
}

export async function getAllPostsForSitemap() {
  return getPublishedPosts();
}

export async function createBlogPost(input: CreateBlogInput) {
  const normalizedSlug = input.slug.trim().toLowerCase();

  const cleanHtml = sanitizeHtml(ensureHeadingIds(input.contentHtml), sanitizeOptions);
  const payload: FirestoreBlogDoc = {
    slug: normalizedSlug,
    title: input.title.trim(),
    description: input.description.trim(),
    date: new Date().toISOString(),
    readTime: getReadTimeFromHtml(cleanHtml),
    image: input.image?.trim(),
    contentHtml: cleanHtml,
    keywords: normalizeKeywords(input.keywords),
    metaTitle: input.metaTitle?.trim() || input.title.trim(),
    metaDescription: input.metaDescription?.trim() || input.description.trim(),
    published: input.published ?? true,
    views: 0,
    canonicalUrl: normalizeCanonicalUrl(input.canonicalUrl),
  };

  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const existingSnapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", normalizedSlug)
        .limit(1)
        .get();

      if (!existingSnapshot.empty) {
        throw new Error("A blog with this slug already exists.");
      }

      await db.collection(BLOG_COLLECTION).add({
        ...toFirestoreBlogDoc(payload),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      const savedPost = mapFirestorePost(payload);
      if (!savedPost) {
        throw new Error("Unable to save blog post to Firestore.");
      }

      return savedPost;
    } catch (error) {
      if (!shouldFallbackToLocalStore(error)) {
        throw error instanceof Error ? error : new Error("Unable to save blog post to Firestore.");
      }

      const localPosts = await readLocalPosts();
      if (localPosts.some((post) => post.slug === normalizedSlug)) {
        throw new Error("A blog with this slug already exists.");
      }

      const mappedPost = mapFirestorePost(payload);
      if (!mappedPost) {
        throw new Error("Unable to save blog post.");
      }

      const localPost: BlogPost = {
        ...mappedPost,
        slug: normalizedSlug,
      };

      await writeLocalPosts([...localPosts, localPost]);
      return localPost;
    }
  }

  if (!canPersistToLocalBlogStore()) {
    throw getRemoteBlogPersistError();
  }

  const localPosts = await readLocalPosts();
  if (localPosts.some((post) => post.slug === normalizedSlug)) {
    throw new Error("A blog with this slug already exists.");
  }

  const mappedPost = mapFirestorePost(payload);
  if (!mappedPost) {
    throw new Error("Unable to save blog post.");
  }

  const localPost: BlogPost = {
    ...mappedPost,
    slug: normalizedSlug,
  };

  await writeLocalPosts([...localPosts, localPost]);

  return localPost;
}

export async function updateBlogPost(currentSlug: string, input: UpdateBlogInput) {
  const normalizedCurrentSlug = currentSlug.trim().toLowerCase();
  const normalizedNextSlug = input.slug.trim().toLowerCase();
  const cleanHtml = sanitizeHtml(ensureHeadingIds(input.contentHtml), sanitizeOptions);
  const existingPost = await findAnyPostBySlug(normalizedCurrentSlug);

  if (!existingPost) {
    throw new Error("Blog post not found.");
  }

  const nextPost: BlogPost = {
    ...existingPost,
    slug: normalizedNextSlug,
    title: input.title.trim(),
    description: input.description.trim(),
    image: input.image?.trim() || existingPost.image,
    contentHtml: cleanHtml,
    keywords: normalizeKeywords(input.keywords),
    metaTitle: input.metaTitle?.trim() || input.title.trim(),
    metaDescription: input.metaDescription?.trim() || input.description.trim(),
    published: input.published ?? existingPost.published,
    readTime: getReadTimeFromHtml(cleanHtml),
    canonicalUrl: normalizeCanonicalUrl(input.canonicalUrl),
  };

  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const snapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", normalizedCurrentSlug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        if (normalizedNextSlug !== normalizedCurrentSlug) {
          const duplicateSnapshot = await db
            .collection(BLOG_COLLECTION)
            .where("slug", "==", normalizedNextSlug)
            .limit(1)
            .get();

          if (!duplicateSnapshot.empty) {
            throw new Error("A blog with this slug already exists.");
          }
        }

        await snapshot.docs[0].ref.update({
          ...nextPost,
          updatedAt: FieldValue.serverTimestamp(),
        });

        return nextPost;
      }
    } catch (error) {
      if (!shouldFallbackToLocalStore(error)) {
        throw error instanceof Error ? error : new Error("Unable to update blog post in Firestore.");
      }
    }
  }

  if (!canPersistToLocalBlogStore()) {
    throw getRemoteBlogPersistError();
  }

  const localPosts = await readLocalPosts();
  const duplicate = localPosts.some(
    (post) => post.slug === normalizedNextSlug && post.slug !== normalizedCurrentSlug,
  );

  if (duplicate) {
    throw new Error("A blog with this slug already exists.");
  }

  await deleteLocalPost(normalizedCurrentSlug);
  await updateLocalPosts(normalizedCurrentSlug, nextPost);

  return nextPost;
}

export async function deleteBlogPost(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  let deleted = false;

  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const snapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", normalizedSlug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        await snapshot.docs[0].ref.delete();
        deleted = true;
      }
    } catch (error) {
      if (!shouldFallbackToLocalStore(error)) {
        throw error instanceof Error ? error : new Error("Unable to delete blog post from Firestore.");
      }
    }
  }

  if (!canPersistToLocalBlogStore()) {
    if (!deleted) {
      throw new Error("Blog post not found.");
    }

    return true;
  }

  const localDeleted = await deleteLocalPost(normalizedSlug);

  if (!deleted && !localDeleted) {
    const legacyPostExists = blogPosts.some((post) => post.slug === normalizedSlug);

    if (legacyPostExists) {
      throw new Error("Built-in sample posts cannot be deleted.");
    }

    throw new Error("Blog post not found.");
  }

  return true;
}

export async function incrementBlogViews(slug: string) {
  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const snapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", slug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        await snapshot.docs[0].ref.update({
          views: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        });
        return;
      }
    } catch {
      return;
    }
  }

  if (!canPersistToLocalBlogStore()) {
    return;
  }

  const localPosts = await readLocalPosts();
  const targetIndex = localPosts.findIndex((post) => post.slug === slug);

  if (targetIndex === -1) {
    return;
  }

  const nextPosts = localPosts.map((post) =>
    post.slug === slug ? { ...post, views: post.views + 1 } : post,
  );

  await writeLocalPosts(nextPosts);
}
