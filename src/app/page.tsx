import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { AboutPortraitSection } from "./components/AboutPortraitSection";
import { PhotoSection } from "./components/PhotoSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { NewsSection } from "./components/NewsSection";
import { FooterSection } from "./components/FooterSection";
import { FooterParallaxWrapper } from "./components/FooterParallaxWrapper";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { newsItemsQuery, projectsQuery, servicesQuery, testimonialsQuery } from "@/sanity/lib/queries";
import type { NewsItem } from "./components/NewsSection";
import type { Project } from "./components/PortfolioSection";
import type { Service } from "./components/ServicesSection";
import type { Testimonial } from "./components/TestimonialsSection";

export default async function Home() {
  const [{ data: newsItems }, { data: projects }, { data: services }, { data: testimonials }] = await Promise.all([
    sanityFetch({ query: newsItemsQuery }),
    sanityFetch({ query: projectsQuery }),
    sanityFetch({ query: servicesQuery }),
    sanityFetch({ query: testimonialsQuery }),
  ]) as [{ data: NewsItem[] }, { data: Project[] }, { data: Service[] }, { data: Testimonial[] }];
  return (
    <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <AboutPortraitSection />
    <PhotoSection showVideo />
    <ServicesSection services={services} />
    <PortfolioSection projects={projects} />
    <TestimonialsSection testimonials={testimonials} />
    <NewsSection items={newsItems} />
    <FooterParallaxWrapper>
      <FooterSection />
    </FooterParallaxWrapper>
    <SanityLive />
    </>
  );
}
