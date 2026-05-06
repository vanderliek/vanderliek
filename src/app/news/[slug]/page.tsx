import { Navbar } from "@/app/components/Navbar";
import { FooterSection } from "@/app/components/FooterSection";
import { FooterParallaxWrapper } from "@/app/components/FooterParallaxWrapper";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { newsBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type NewsDetail = {
  title?: string;
  slug?: string;
  category?: string;
  publishedAt?: string;
  imageUrl?: string;
  description?: string;
  link?: string;
};

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: item } = (await sanityFetch({
    query: newsBySlugQuery,
    params: { slug },
  })) as { data: NewsDetail | null };
  return {
    title: item ? `${item.title} — H.Studio` : "News — H.Studio",
    description: item?.description,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: item } = (await sanityFetch({
    query: newsBySlugQuery,
    params: { slug },
  })) as { data: NewsDetail | null };

  if (!item) notFound();

  return (
    <>
      <Navbar />

      {/* ── Header strip: breadcrumb + meta ── */}
      <section data-nav-theme="light" className="bg-white px-8 pt-[140px] pb-0 max-[989px]:px-4 max-[989px]:pt-[110px]">
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <div className="flex items-center gap-3">
            <a
              href="/news"
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors duration-200"
            >
              News
            </a>
            <span className="font-mono text-[12px] text-[#1f1f1f]/30">/</span>
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#1f1f1f] truncate max-w-[300px]">
              {item.title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {item.category && (
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#1f1f1f]/50">
                {item.category}
              </span>
            )}
            {item.publishedAt && (
              <span className="font-mono text-[12px] text-[#1f1f1f]/40 tracking-[0.1em]">
                {formatDate(item.publishedAt)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Title ── */}
      <section data-nav-theme="light" className="bg-white px-8 py-10 max-[989px]:px-4 max-[989px]:py-6">
        <h1
          className="font-black uppercase leading-[0.88] text-[100px] max-[989px]:text-[48px] text-black"
          style={{ letterSpacing: "-0.05em" }}
        >
          {item.title}
        </h1>
      </section>

      {/* ── Hero image ── */}
      {item.imageUrl && (
        <section data-nav-theme="light" className="bg-white px-8 pb-[60px] max-[989px]:px-4 max-[989px]:pb-8">
          <div className="w-full aspect-[16/9] max-[989px]:aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={item.imageUrl}
              alt={item.title ?? ""}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* ── Body: description + external link ── */}
      <section data-nav-theme="light" className="bg-white px-8 pb-[100px] max-[989px]:px-4 max-[989px]:pb-16">
        <div className="max-w-[760px]">
          {item.description && (
            <p className="text-[20px] max-[989px]:text-[17px] leading-[1.7] tracking-[-0.02em] text-[#1f1f1f] mb-12">
              {item.description}
            </p>
          )}

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.02em] bg-black text-white rounded-full px-5 py-3 hover:bg-[#333] transition-colors duration-300"
            >
              Read Full Article
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </section>

      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
      <SanityLive />
    </>
  );
}
