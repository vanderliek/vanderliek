import { Navbar } from "@/app/components/Navbar";
import { FooterSection } from "@/app/components/FooterSection";
import { FooterParallaxWrapper } from "@/app/components/FooterParallaxWrapper";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import type { ProjectDetail } from "@/app/components/PortfolioSection";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: project } = (await sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
  })) as { data: ProjectDetail | null };
  return {
    title: project ? `${project.title} — H.Studio` : "Project — H.Studio",
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const { data: project } = (await sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
  })) as { data: ProjectDetail | null };

  if (!project) notFound();

  return (
    <>
      <Navbar />

      {/* ── Header strip: breadcrumb + year ── */}
      <section data-nav-theme="light" className="bg-white px-8 pt-[140px] pb-0 max-[989px]:px-4 max-[989px]:pt-[110px]">
        <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-0 max-[989px]:flex-col max-[989px]:items-start max-[989px]:gap-2">
          <div className="flex items-center gap-3">
            <a
              href="/projects"
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors duration-200"
            >
              Projects
            </a>
            <span className="font-mono text-[12px] text-[#1f1f1f]/30">/</span>
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#1f1f1f]">{project.title}</span>
          </div>
          <div className="flex items-center gap-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#1f1f1f]/50"
              >
                {tag}
              </span>
            ))}
            {project.year && (
              <span className="font-mono text-[12px] text-[#1f1f1f]/40 tracking-[0.1em]">{project.year}</span>
            )}
          </div>
        </div>
      </section>

      {/* ── Title — massive black bold ── */}
      <section data-nav-theme="light" className="bg-white px-8 py-10 max-[989px]:px-4 max-[989px]:py-6">
        <h1
          className="font-black uppercase leading-[0.88] text-[100px] max-[989px]:text-[48px] text-black"
          style={{ letterSpacing: "-0.05em" }}
        >
          {project.title}
        </h1>
      </section>

      {/* ── Hero image — full-width, slight border-radius ── */}
      <section data-nav-theme="light" className="bg-white px-8 pb-[60px] max-[989px]:px-4 max-[989px]:pb-8">
        {project.imageUrl && (
          <div className="w-full aspect-[16/9] max-[989px]:aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </section>

      {/* ── 2-column: description left / meta right ── */}
      <section data-nav-theme="light" className="bg-white px-8 pb-[80px] max-[989px]:px-4 max-[989px]:pb-12">
        <div className="flex gap-16 max-[989px]:flex-col max-[989px]:gap-10">

          {/* Description — 60% */}
          <div className="flex-[3] min-w-0">
            {project.summary && (
              <p
                className="text-[26px] max-[989px]:text-[20px] leading-[1.3] tracking-[-0.02em] text-[#1f1f1f] mb-8"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                {project.summary}
              </p>
            )}
            {project.description && (
              <p className="text-[16px] leading-[1.8] tracking-[-0.01em] text-[#555]">
                {project.description}
              </p>
            )}
          </div>

          {/* Meta — 40% */}
          <div className="flex-[2] min-w-0 flex flex-col gap-8 border-l border-black/10 pl-16 max-[989px]:border-l-0 max-[989px]:border-t max-[989px]:pl-0 max-[989px]:pt-8 max-[989px]:grid max-[989px]:grid-cols-2 max-[989px]:gap-x-6 max-[989px]:gap-y-6">
            {project.client && (
              <div>
                <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em] mb-2">Client</p>
                <p className="text-[15px] font-semibold tracking-[-0.02em]">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em] mb-2">Year</p>
                <p className="text-[15px] font-semibold tracking-[-0.02em]">{project.year}</p>
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em] mb-2">Services</p>
                <div className="flex flex-col gap-1.5">
                  {project.services.map((s) => (
                    <p key={s} className="text-[14px] tracking-[-0.01em] text-[#1f1f1f]">
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 self-start text-[13px] font-medium tracking-[-0.02em] bg-black text-white rounded-full px-5 py-3 hover:bg-[#333] transition-colors duration-300 max-[989px]:col-span-2 max-[989px]:mt-0"
              >
                View Live Project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery — 2-column masonry-style grid ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section data-nav-theme="light" className="bg-[#f5f5f3] px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1f1f1f]/40 mb-8">
            [ Gallery ]
          </p>
          <div className="columns-2 max-[989px]:columns-1 gap-5 space-y-5">
            {project.gallery.map((url, i) => (
              <div key={i} className="break-inside-avoid overflow-hidden rounded-sm">
                <img
                  src={url}
                  alt={`${project.title} — ${i + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <FooterParallaxWrapper>
        <FooterSection />
      </FooterParallaxWrapper>
      <SanityLive />
    </>
  );
}
