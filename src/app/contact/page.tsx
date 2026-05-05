import { Navbar } from "../components/Navbar";
import { ContactPageContent } from "../components/ContactPageContent";
import { FooterSection } from "../components/FooterSection";
import { FooterParallaxWrapper } from "../components/FooterParallaxWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — H.Studio",
  description: "Have a project in mind? Let's build something great together.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactPageContent />
      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
    </>
  );
}
