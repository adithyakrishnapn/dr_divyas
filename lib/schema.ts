import { siteConfig } from "@/lib/site";

export function buildGlobalBusinessSchema() {
  const cleanTime = (time: string) => {
    return time.startsWith("T") ? time.slice(1) : time;
  };

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${siteConfig.url}/#clinic`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: `${siteConfig.url}/`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/doctor-about.jpeg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      postalCode: siteConfig.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: cleanTime(entry.opens),
      closes: cleanTime(entry.closes),
    })),
    areaServed: {
      "@type": "City",
      name: "Coimbatore",
    },
    medicalSpecialty: [
      "https://schema.org/Dermatology",
      "Cosmetic Dermatology",
      "Hair Restoration",
    ],
    sameAs: [siteConfig.mapUrl],
  };
}
