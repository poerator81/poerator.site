import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "clientName", type: "string", title: "Client name", validation: (rule) => rule.required() }),
    defineField({ name: "projectType", type: "string", title: "Project type" }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "clientName" }, validation: (rule) => rule.required() }),
    defineField({ name: "coverImage", type: "image", title: "Cover image", options: { hotspot: true } }),
    defineField({ name: "title", type: "localeString", title: "Title" }),
    defineField({ name: "summary", type: "localeText", title: "Summary" }),
    defineField({ name: "videoUrl", type: "url", title: "Video URL" }),
  ],
  preview: { select: { title: "clientName", subtitle: "projectType", media: "coverImage" } },
});
