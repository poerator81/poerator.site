import { defineType, defineField } from "sanity";

const localizedFields = ["en", "de", "fr", "pl", "lt"].map((name) =>
  defineField({ name, type: "string", title: name.toUpperCase() }),
);

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: localizedFields,
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: ["en", "de", "fr", "pl", "lt"].map((name) =>
    defineField({ name, type: "text", title: name.toUpperCase(), rows: 4 }),
  ),
});

export const specItem = defineType({
  name: "specItem",
  title: "Specification",
  type: "object",
  fields: [
    defineField({ name: "label", type: "localeString", title: "Label" }),
    defineField({ name: "value", type: "localeString", title: "Value" }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "value.en" },
  },
});
