import { defineField, defineType } from "sanity";

export const newsItemType = defineType({
  name: "newsItem",
  title: "News Item",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "description", media: "image" },
    prepare({ title, media }) {
      return { title: title?.slice(0, 60) ?? "Untitled", media };
    },
  },
});
