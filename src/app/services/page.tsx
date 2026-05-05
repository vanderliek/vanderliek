import { Navbar } from "../components/Navbar";
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
  title: "Services — H.Studio",
  description: "Brand discovery, web design & development, marketing, and photography.",
};

export default async function ServicesPage() {
  const [{ data: services }, { data: testimonials }] = await Promise.all([
    sanityFetch({ query: servicesQuery }),
    sanityFetch({ query: testimonialsQuery }),
  ]) as [{ data: Service[] }, { data: Testimonial[] }];

  return (
    <>
      <Navbar />

      {/* Page intro */}
      <section data-nav-theme="light" className="bg-white px-8 pt-[160px] pb-[80px] max-[989px]:px-4 max-[989px]:pt-[120px] max-[989px]:pb-12">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[14px] uppercase leading-[1.1]">[ services ]</p>
          <h1
            className="font-bold italic uppercase leading-[0.9] text-[96px] max-[989px]:text-[48px]"
            style={{ letterSpacing: "-0.05em" }}
          >
            What we do
          </h1>
        </div>
      </section>

      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
      <SanityLive />
    </>
  );
}
