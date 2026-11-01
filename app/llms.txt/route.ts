import { getAllPostsForSitemap } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

// This route handler serves /llms.txt following the llms.txt v2 specification
// (https://llmstxt.org). The file is generated at request time so that newly
// published blog posts are included automatically.
//
// Convention: App Router places this at app/llms.txt/route.ts, which Next.js
// maps to the URL path /llms.txt. The directory name IS the URL segment.

export const dynamic = "force-dynamic";

const BASE = siteConfig.url; // https://www.drdivyas.in

function line(label: string, url: string, description: string) {
  return `- [${label}](${url}): ${description}`;
}

export async function GET() {
  // Fetch published blog posts from the same source the sitemap uses.
  // Exclude posts whose canonical URL points to an external origin — those
  // pages self-declare a different site as the canonical source, so we should
  // not list them as our own pages.
  const siteOrigin = new URL(BASE).origin;
  const posts = (await getAllPostsForSitemap()).filter((post) => {
    if (!post.canonicalUrl) return true;
    try {
      return new URL(post.canonicalUrl).origin === siteOrigin;
    } catch {
      return true;
    }
  });

  const content = `# Dr. Divya's Skin & Hair Clinic

> Dr. Divya's Skin & Hair Clinic is a dermatologist-led skin and hair care clinic in Coimbatore, Tamil Nadu, India. The clinic is run by Dr. Divya Shanmugam, MD (DVL), Dermatologist and Trichologist with 10 years of experience. It offers evidence-based treatments for acne, pigmentation, hair fall, laser therapy, and general skin health. All content on this website is general educational information and is not a substitute for a personalised clinical assessment.

The clinic is located at ${siteConfig.address}. Consultation enquiries can be made by phone (${siteConfig.phone}) or through the online contact form.

Clinic hours: ${siteConfig.hoursLabel}

## Clinic overview

${line("Homepage", `${BASE}/`, "Overview of the clinic, services, doctor profile, and patient reviews")}
${line("About Dr. Divya Shanmugam", `${BASE}/about`, "Doctor profile, qualifications (MD DVL), experience, and clinical philosophy")}
${line("Skin and Hair Clinic — Coimbatore", `${BASE}/skin-and-hair-clinic`, "Overview of the clinic's skin and hair care specialisations")}
${line("Treatments overview", `${BASE}/treatments`, "Index of all skin and hair treatments offered at the clinic")}
${line("Contact and consultation enquiry", `${BASE}/contact`, "Contact details, clinic location map, and consultation request form")}
${line("Coimbatore area clinics hub", `${BASE}/coimbatore`, "Directory of neighbourhoods and areas served by the clinic across Coimbatore")}

## Skin treatments

${line("Acne treatment in Coimbatore", `${BASE}/acne-treatment-coimbatore`, "Dermatologist-led care for active acne, acne marks, and scarring")}
${line("Pigmentation treatment in Coimbatore", `${BASE}/pigmentation-treatment-coimbatore`, "Treatment for melasma, tanning, dark patches, and post-acne marks")}
${line("Laser treatment in Coimbatore", `${BASE}/laser-treatment-coimbatore`, "Laser-based skin rejuvenation, toning, and pigmentation correction")}
${line("Chemical peel in Coimbatore", `${BASE}/chemical-peel-coimbatore`, "Supervised chemical peels for brightness, acne marks, and texture")}
${line("Vitiligo treatment in Coimbatore", `${BASE}/vitiligo-treatment-coimbatore`, "Assessment and treatment support for white patches and pigment loss")}

## Hair and scalp treatments

${line("Hair fall treatment in Coimbatore", `${BASE}/hair-fall-treatment-coimbatore`, "Diagnosis and treatment for hair thinning, shedding, and scalp concerns")}

## Educational articles and blog

${line("Blog — all articles", `${BASE}/blog`, "Index of all published skin and hair care educational articles")}
${
    posts.length > 0
      ? posts
          .slice(0, 12) // keep the file concise — agents can follow /blog for the full list
          .map((post) =>
            line(post.title, `${BASE}/blog/${post.slug}`, post.description)
          )
          .join("\n")
      : "- No published articles yet"
  }

## Location pages

${line("Saravanampatti", `${BASE}/coimbatore/saravanampatti`, "Clinic information for patients from Saravanampatti")}
${line("Ganapathy", `${BASE}/coimbatore/ganapathy`, "Clinic information for patients from Ganapathy")}
${line("Peelamedu", `${BASE}/coimbatore/peelamedu`, "Clinic information for patients from Peelamedu")}
${line("Thudiyalur", `${BASE}/coimbatore/thudiyalur`, "Clinic information for patients from Thudiyalur")}
${line("RS Puram", `${BASE}/coimbatore/rs-puram`, "Clinic information for patients from RS Puram")}
${line("Gandhipuram", `${BASE}/coimbatore/gandhipuram`, "Clinic information for patients from Gandhipuram")}

## Optional

${line("Singanallur", `${BASE}/coimbatore/singanallur`, "Area page for Singanallur patients")}
${line("Race Course", `${BASE}/coimbatore/race-course`, "Area page for Race Course patients")}
${line("Saibaba Colony", `${BASE}/coimbatore/saibaba-colony`, "Area page for Saibaba Colony patients")}
${line("Vadavalli", `${BASE}/coimbatore/vadavalli`, "Area page for Vadavalli patients")}
`;

  return new Response(content.trim(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Allow agents to cache for up to 1 hour; revalidate after.
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
