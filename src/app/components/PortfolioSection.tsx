const PROJECTS = [
  {
    title: "Surfers Paradise",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/19058582-5fe4-4b70-80d3-0329279d76d4",
    tallCard: true,
  },
  {
    title: "Cyberpunk Caffe",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/3d11b58b-890c-443f-bea5-d2f1239d22ef",
    tallCard: false,
  },
  {
    title: "Agency 976",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/95fe2b2f-2739-414a-8e78-e4b5112d622b",
    tallCard: false,
  },
  {
    title: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/d0c901c5-20b3-4aef-8488-b744a7261457",
    tallCard: true,
  },
];

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
  image,
  imageClass,
}: {
  title: string;
  tags: string[];
  image: string;
  imageClass: string;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full shrink-0">
      <div className={`relative flex items-end pb-4 pl-4 overflow-hidden ${imageClass}`}>
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative flex gap-3 flex-wrap">
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
        <p className="font-black text-black uppercase leading-[1.1] text-[36px] tracking-[-0.04em] max-[989px]:text-[24px] max-[989px]:tracking-[-0.04em]">
          {title}
        </p>
        <div className="size-8 shrink-0 flex items-center justify-center">
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
}

function CtaBox({ className }: { className?: string }) {
  return (
    <div className={`flex gap-3 items-center ${className ?? ""}`}>
      {/* Left brackets */}
      <div className="flex flex-col justify-between w-6 self-stretch py-3 shrink-0">
        <CornerSvg />
        <CornerSvg className="-rotate-90" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-[10px] items-start py-3 min-w-0">
        <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule
          a call with me to get started.
        </p>
        <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full shrink-0">
          Let&apos;s talk
        </button>
      </div>

      {/* Right brackets */}
      <div className="flex flex-col justify-between w-6 self-stretch py-3 shrink-0 items-end">
        <CornerSvg className="rotate-90" />
        <CornerSvg className="rotate-180" />
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [surfers, cyberpunk, agency, minimal] = PROJECTS;

  return (
    <section id="projects" className="px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12">
      <div className="flex flex-col gap-[61px] max-[989px]:gap-8">

        {/* ── Desktop header ── */}
        <div className="max-[989px]:hidden flex items-center justify-between w-full">
          <div className="flex gap-[10px] items-start uppercase">
            <div
              className="font-light text-black text-[96px] leading-[0.86] uppercase"
              style={{ letterSpacing: "-0.08em" }}
            >
              <p>Selected</p>
              <p>Work</p>
            </div>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
          </div>
          <div className="flex h-[110px] w-[15px] items-center justify-center shrink-0">
            <span className="-rotate-90 font-mono text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap leading-[1.1]">
              [ portfolio ]
            </span>
          </div>
        </div>

        {/* ── Mobile header ── */}
        <div className="min-[990px]:hidden flex flex-col gap-4 uppercase">
          <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">[ portfolio ]</span>
          <div className="flex items-start justify-between">
            <div
              className="font-light text-black text-[32px] leading-[0.86]"
              style={{ letterSpacing: "-0.08em" }}
            >
              <p>Selected</p>
              <p>Work</p>
            </div>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
          </div>
        </div>

        {/* ── Desktop two-column layout ── */}
        <div className="max-[989px]:hidden flex gap-6 w-full">
          {/* Left column — stretches to row height, items evenly distributed */}
          <div className="flex-1 self-stretch flex flex-col justify-between items-start min-w-0">
            <ProjectCard {...surfers} imageClass="h-[744px]" />
            <ProjectCard {...cyberpunk} imageClass="h-[699px]" />
            <CtaBox />
          </div>

          {/* Right column — offset 240px from top */}
          <div className="flex-1 flex flex-col gap-[117px] pt-[240px] min-w-0">
            <ProjectCard {...agency} imageClass="h-[699px]" />
            <ProjectCard {...minimal} imageClass="h-[744px]" />
          </div>
        </div>

        {/* ── Mobile single-column layout ── */}
        <div className="min-[990px]:hidden flex flex-col gap-6">
          <ProjectCard {...surfers} imageClass="h-[390px]" />
          <ProjectCard {...cyberpunk} imageClass="h-[390px]" />
          <ProjectCard {...agency} imageClass="h-[390px]" />
          <ProjectCard {...minimal} imageClass="h-[390px]" />
          <CtaBox />
        </div>

      </div>
    </section>
  );
}
