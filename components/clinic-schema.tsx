import { buildGlobalBusinessSchema } from "@/lib/schema";

export function ClinicSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGlobalBusinessSchema()) }}
    />
  );
}
