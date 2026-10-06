import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Equipment category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", title: "Title", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title.en" }, validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", title: "Order" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
