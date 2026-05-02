import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "logo", title: "Client Logo", type: "image" }),
    defineField({ name: "logoWidth", title: "Logo Width (px)", type: "number" }),
    defineField({ name: "logoHeight", title: "Logo Height (px)", type: "number" }),
    defineField({ name: "quote", title: "Quote", type: "text" }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "rotate", title: "Rotation (degrees)", type: "number" }),
    defineField({ name: "desktopLeft", title: "Desktop Left Position (e.g. 47%)", type: "string" }),
    defineField({ name: "desktopTop", title: "Desktop Top Position (e.g. 212px)", type: "string" }),
    defineField({ name: "desktopZ", title: "Desktop Z-Index", type: "number" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "author", media: "logo" },
  },
});
