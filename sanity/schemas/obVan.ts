import { defineType, defineField } from "sanity";

export const obVan = defineType({
  name: "obVan",
  title: "OB Van",
  type: "document",
  fields: [
    defineField({ name: "name", type: "localeString", title: "Name" }),
    defineField({ name: "slug", type: "slug", title: "Slug" }),
    defineField({ name: "overview", type: "localeText", title: "Overview" }),
    defineField({ name: "hireTerms", type: "localeText", title: "Hire terms" }),
    defineField({ name: "cameraChannels", type: "number", title: "Camera channels" }),
    ...["consoleSpecs", "audioSpecs", "replaySpecs"].map((name) =>
      defineField({ name, type: "array", title: name, of: [{ type: "specItem" }] }),
    ),
  ],
});
