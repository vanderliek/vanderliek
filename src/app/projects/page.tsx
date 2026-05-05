import { Navbar } from "../components/Navbar";
import { ProjectsPageContent } from "../components/ProjectsPageContent";
import { FooterSection } from "../components/FooterSection";
import { FooterParallaxWrapper } from "../components/FooterParallaxWrapper";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { projectsQuery } from "@/sanity/lib/queries";
import type { Project } from "../components/PortfolioSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — H.Studio",
  description: "Selected work across branding, web design, photography and more.",
};

export default async function ProjectsPage() {
  const { data: projects } = (await sanityFetch({ query: projectsQuery })) as {
    data: Project[];
  };

  return (
    <>
      <Navbar />

      <section
        data-nav-theme="light"
        className="bg-white px-8 pt-[160px] pb-[80px] max-[989px]:px-4 max-[989px]:pt-[120px] max-[989px]:pb-12"
      >
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[14px] uppercase leading-[1.1]">[ projects ]</p>
          <h1
            className="font-bold italic uppercase leading-[0.9] text-[96px] max-[989px]:text-[48px]"
            style={{ letterSpacing: "-0.05em" }}
          >
            Selected Work
          </h1>
        </div>
      </section>

      <ProjectsPageContent projects={projects} />

      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
      <SanityLive />
    </>
  );
}
