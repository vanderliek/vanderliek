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
import { newsItemsQuery, projectsQuery, testimonialsQuery } from "@/sanity/lib/queries";
import type { NewsItem } from "./components/NewsSection";
import type { Project } from "./components/PortfolioSection";
import type { Testimonial } from "./components/TestimonialsSection";

export default async function Home() {
  const [{ data: newsItems }, { data: projects }, { data: testimonials }] = await Promise.all([
    sanityFetch({ query: newsItemsQuery }),
    sanityFetch({ query: projectsQuery }),
    sanityFetch({ query: testimonialsQuery }),
  ]) as [{ data: NewsItem[] }, { data: Project[] }, { data: Testimonial[] }];
  return (
    <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <AboutPortraitSection />
    <PhotoSection />
    <ServicesSection />
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
