import { defineField, defineType } from "sanity";

export const newsItemType = defineType({
  name: "newsItem",
  title: "News Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string", description: "e.g. Award, Press, Feature, Publication" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "link", title: "Article Link", type: "url" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title ?? subtitle?.slice(0, 60) ?? "Untitled", media };
    },
  },
});
