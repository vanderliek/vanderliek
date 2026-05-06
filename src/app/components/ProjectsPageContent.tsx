"use client";

import { useState } from "react";
import { MagneticButton } from "./MagneticButton";
import type { Project } from "./PortfolioSection";

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M8 24L24 8M24 8H10M24 8V22"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CornerSvg({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="-1 -1 18 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 16 L0 0 L16 0"
        stroke="#1f1f1f"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectCard({
  title,
  tags,
  imageUrl,
  imageClass,
}: {
  title: string;
  tags: string[];
  imageUrl: string;
  imageClass: string;
}) {
  return (
    <div className="group flex flex-col gap-[10px] w-full shrink-0 cursor-pointer">
      <div className={`relative flex items-end pb-4 pl-4 overflow-hidden ${imageClass}`}>
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
          <span className="text-white font-medium text-[13px] tracking-[0.18em] uppercase">
            View Project
          </span>
        </div>
        <div className="relative flex gap-3 flex-wrap transition-opacity duration-300 group-hover:opacity-0">
          {tags.map((tag) => (
            <span
              key={tag}
              className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.04em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="font-black text-black uppercase leading-[1.1] text-[26px] tracking-[-0.04em] max-[989px]:text-[24px] max-[989px]:tracking-[-0.04em]">
          {title}
        </p>
        <div className="size-8 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
}

function CtaBox() {
  return (
    <div className="flex gap-3 items-center mt-[61px] max-[989px]:mt-8">
      <div className="flex flex-col justify-between w-6 self-stretch py-3 shrink-0">
        <CornerSvg />
        <CornerSvg className="-rotate-90" />
      </div>
      <div className="flex flex-1 flex-col gap-[10px] items-start py-3 min-w-0">
        <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule
          a call with me to get started.
        </p>
        <MagneticButton className="relative overflow-hidden group bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full shrink-0">
          <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          <span className="relative group-hover:text-black transition-colors duration-300">
            Let&apos;s talk
          </span>
        </MagneticButton>
      </div>
      <div className="flex flex-col justify-between w-6 self-stretch py-3 shrink-0 items-end">
        <CornerSvg className="rotate-90" />
        <CornerSvg className="rotate-180" />
      </div>
    </div>
  );
}

export function ProjectsPageContent({ projects }: { projects: Project[] }) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  const col0 = filtered.filter((_, i) => i % 3 === 0);
  const col1 = filtered.filter((_, i) => i % 3 === 1);
  const col2 = filtered.filter((_, i) => i % 3 === 2);

  return (
    <section data-nav-theme="light" className="bg-white px-8 pb-[80px] max-[989px]:px-4 max-[989px]:pb-12">
      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-[61px] max-[989px]:mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium tracking-[-0.03em] border transition-colors duration-200 ${
              activeTag === null
                ? "bg-black text-white border-black"
                : "bg-transparent text-[#1f1f1f] border-black/20 hover:border-black/60"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium tracking-[-0.03em] border transition-colors duration-200 ${
                activeTag === tag
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-[#1f1f1f] border-black/20 hover:border-black/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Desktop 3-column staggered grid */}
      <div className="max-[989px]:hidden flex gap-5 w-full">
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          {col0.map((p) => (
            <ProjectCard
              key={p.title}
              {...p}
              imageClass={p.tallCard ? "h-[520px]" : "h-[460px]"}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-5 pt-[160px] min-w-0">
          {col1.map((p) => (
            <ProjectCard
              key={p.title}
              {...p}
              imageClass={p.tallCard ? "h-[520px]" : "h-[460px]"}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-5 pt-[80px] min-w-0">
          {col2.map((p) => (
            <ProjectCard
              key={p.title}
              {...p}
              imageClass={p.tallCard ? "h-[520px]" : "h-[460px]"}
            />
          ))}
        </div>
      </div>

      {/* Mobile single-column */}
      <div className="min-[990px]:hidden flex flex-col gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.title} {...p} imageClass="h-[390px]" />
        ))}
      </div>

      <CtaBox />
    </section>
  );
}
