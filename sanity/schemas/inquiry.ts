import { defineType, defineField } from "sanity";

export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "phone", type: "string", title: "Phone" }),
    defineField({ name: "message", type: "text", title: "Message" }),
    defineField({ name: "createdAt", type: "datetime", title: "Created at" }),
  ],
});
