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

const hairLossPostVariant: BlogPost = {
  ...hairLossPost,
  slug: "best-dermatologist-coimbatore-hair-loss-treatment",
};

export const blogPosts: BlogPost[] = [
  ...legacyBlogPosts.map(mapLegacyPost),
  hairLossPost,
  hairLossPostVariant,
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
