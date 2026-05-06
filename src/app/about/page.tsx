import { Navbar } from "../components/Navbar";
import { AboutBioV3C } from "../components/AboutBioVariations";
import { AboutHeroD } from "../components/AboutHeroVariations2";
import { PhotoSection } from "../components/PhotoSection";
import { WorkApproachC } from "../components/AboutWorkApproachVariations";
import { SkillsA } from "../components/AboutSkillsVariations";
import { FooterSection } from "../components/FooterSection";
import { FooterParallaxWrapper } from "../components/FooterParallaxWrapper";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — H.Studio",
  description: "Creative director, photographer and designer — the story behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHeroD />
      <AboutBioV3C />
      <PhotoSection />
      <WorkApproachC />
      <SkillsA />
      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
      <SanityLive />
    </>
  );
}
