import { Navbar } from "../components/Navbar";
import { NewsPageContent } from "../components/NewsPageContent";
import { FooterSection } from "../components/FooterSection";
import { FooterParallaxWrapper } from "../components/FooterParallaxWrapper";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { newsPageQuery } from "@/sanity/lib/queries";
import type { NewsPageItem } from "../components/NewsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News — H.Studio",
  description: "Latest news, features, awards, and achievements.",
};

export default async function NewsPage() {
  const { data: items } = (await sanityFetch({ query: newsPageQuery })) as {
    data: NewsPageItem[];
  };

  return (
    <>
      <Navbar />

      <section
        data-nav-theme="light"
        className="bg-white px-8 pt-[160px] pb-[80px] max-[989px]:px-4 max-[989px]:pt-[120px] max-[989px]:pb-12"
      >
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[14px] uppercase leading-[1.1]">[ news ]</p>
          <h1
            className="font-bold italic uppercase leading-[0.9] text-[96px] max-[989px]:text-[48px]"
            style={{ letterSpacing: "-0.05em" }}
          >
            Latest Updates
          </h1>
        </div>
      </section>

      <NewsPageContent items={items} />

      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
      <SanityLive />
    </>
  );
}
