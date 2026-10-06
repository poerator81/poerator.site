import { defineType, defineField } from "sanity";

export const geoLanding = defineType({
  name: "geoLanding",
  title: "Location landing page",
  type: "document",
  fields: [
    defineField({ name: "city", type: "string", title: "City" }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "city" }, validation: (rule) => rule.required() }),
    defineField({ name: "heroTitle", type: "localeString", title: "Hero title" }),
    defineField({ name: "intro", type: "localeText", title: "Introduction" }),
    defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
    defineField({ name: "focusEquipment", type: "reference", to: [{ type: "equipment" }], title: "Focus equipment" }),
  ],
});
