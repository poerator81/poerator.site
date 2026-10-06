import { defineType, defineField } from "sanity";

export const equipment = defineType({
  name: "equipment",
  title: "Equipment",
  type: "document",
  fields: [
    defineField({ name: "name", type: "localeString", title: "Name", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "name.en" }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }], title: "Category", validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", type: "localeString", title: "Short description" }),
    defineField({ name: "hireTypes", type: "array", title: "Hire types", of: [{ type: "string" }] }),
    defineField({ name: "quantityAvailable", type: "number", title: "Quantity available" }),
    defineField({ name: "availableCities", type: "array", title: "Available cities", of: [{ type: "string" }] }),
    defineField({ name: "kitIncludes", type: "array", title: "Kit includes", of: [{ type: "localeString" }] }),
    defineField({ name: "specifications", type: "array", title: "Specifications", of: [{ type: "specItem" }] }),
    defineField({ name: "gallery", type: "array", title: "Gallery", of: [{ type: "image", options: { hotspot: true } }] }),
  ],
  preview: { select: { title: "name.en", subtitle: "category.title.en" } },
});
