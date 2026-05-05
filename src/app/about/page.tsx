import { Navbar } from "../components/Navbar";
import { AboutPageIntro } from "../components/AboutPageIntro";
import { AboutCombinedV3 } from "../components/AboutCombinedV3";
import { PhotoSection } from "../components/PhotoSection";
import { ServicesSection } from "../components/ServicesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FooterSection } from "../components/FooterSection";
import { FooterParallaxWrapper } from "../components/FooterParallaxWrapper";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { servicesQuery, testimonialsQuery } from "@/sanity/lib/queries";
import type { Service } from "../components/ServicesSection";
import type { Testimonial } from "../components/TestimonialsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — H.Studio",
  description: "Creative director, photographer and designer — the story behind the work.",
};

export default async function AboutPage() {
  const [{ data: services }, { data: testimonials }] = await Promise.all([
    sanityFetch({ query: servicesQuery }),
    sanityFetch({ query: testimonialsQuery }),
  ]) as [{ data: Service[] }, { data: Testimonial[] }];

  return (
    <>
      <Navbar />
      <AboutPageIntro />
      <AboutCombinedV3 />
      <PhotoSection />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
      <SanityLive />
    </>
  );
}
