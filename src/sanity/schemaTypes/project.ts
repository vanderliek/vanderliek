import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({
      name: "tallCard",
      title: "Tall Card",
      type: "boolean",
      description: "If true, uses taller height on desktop (744px vs 699px)",
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
