const NEWS_ITEMS = [
  {
    image: "https://www.figma.com/api/mcp/asset/65d81167-5db7-4e49-8603-48d4091723e8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "https://www.figma.com/api/mcp/asset/68d6337a-98f8-4574-bde1-a59b684c1be8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "https://www.figma.com/api/mcp/asset/94609121-fe76-417d-b9b7-1481eade1e4e",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 14.5L14.5 3.5M14.5 3.5H6.5M14.5 3.5V11.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NewsCard({ image, description }: { image: string; description: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[470px] w-full overflow-hidden shrink-0">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] font-normal">
        {description}
      </p>
      <div className="flex gap-[10px] items-center border-b border-black pb-1 w-fit">
        <span className="text-[14px] font-medium text-black tracking-[-0.04em]">Read more</span>
        <ArrowIcon />
      </div>
    </div>
  );
}

export function NewsSection() {
  const [item1, item2, item3] = NEWS_ITEMS;

  return (
    <section id="news" className="bg-[#f3f3f3]">

      {/* ── Desktop ── */}
      <div className="max-[989px]:hidden overflow-hidden">
        <div className="pl-8 py-[120px] flex items-start">

          {/* Rotated vertical heading — stays fixed left of the slider */}
          <div className="w-[110px] shrink-0 self-stretch flex items-center justify-center">
            <div className="-rotate-90 whitespace-nowrap">
              <p
                className="font-light text-black text-[64px] leading-[0.86] uppercase"
                style={{ letterSpacing: "-0.08em" }}
              >
                Keep up with my latest
              </p>
              <p
                className="font-light text-black text-[64px] leading-[0.86] uppercase"
                style={{ letterSpacing: "-0.08em" }}
              >
                news &amp; achievements
              </p>
            </div>
          </div>

          {/* Horizontally scrollable card strip — ml matches the Figma gap */}
          <div className="flex-1 min-w-0 ml-[246px] overflow-x-auto">
            <div className="flex items-start gap-[31px] pr-8" style={{ width: "max-content" }}>

              <div className="w-[354px] shrink-0">
                <NewsCard {...item1} />
              </div>

              <div className="w-px self-stretch shrink-0 bg-black/20" />

              {/* Middle card offset 120px down */}
              <div className="w-[354px] shrink-0 pt-[120px]">
                <NewsCard {...item2} />
              </div>

              <div className="w-px self-stretch shrink-0 bg-black/20" />

              <div className="w-[354px] shrink-0">
                <NewsCard {...item3} />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="min-[990px]:hidden px-4 py-[64px] flex flex-col gap-8">
        {/* Font shrinks with viewport so it never overflows narrow screens */}
        <p
          className="font-light text-black uppercase"
          style={{
            fontSize: "clamp(20px, 8.5vw, 32px)",
            letterSpacing: "-0.08em",
            lineHeight: "0.86",
          }}
        >
          Keep up with my latest<br />news &amp; achievements
        </p>

        {/* Horizontal scroll strip — peeks next card */}
        <div className="-mx-4 overflow-x-auto">
          <div className="flex gap-4 px-4" style={{ width: "max-content" }}>
            {NEWS_ITEMS.map((item, i) => (
              <div key={i} className="w-[300px] shrink-0">
                <NewsCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
