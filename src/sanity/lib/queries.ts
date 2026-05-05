import { groq } from "next-sanity";

export const newsItemsQuery = groq`*[_type == "newsItem"] | order(order asc) {
  "imageUrl": image.asset->url,
  description
}`;

export const newsPageQuery = groq`*[_type == "newsItem"] | order(order asc) {
  _id,
  title,
  category,
  publishedAt,
  "imageUrl": image.asset->url,
  description,
  link
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  title,
  tags,
  "imageUrl": image.asset->url,
  tallCard
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  title,
  description,
  "imageUrl": image.asset->url,
  order
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) {
  "logoUrl": logo.asset->url,
  logoWidth,
  logoHeight,
  quote,
  author,
  rotate,
  desktopLeft,
  desktopTop,
  desktopZ
}`;
