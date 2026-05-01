type Testimonial = {
  logo: string;
  logoWidth: number;
  logoHeight: number;
  quote: string;
  author: string;
  rotate: number;
  desktopLeft: string;
  desktopTop: string;
  desktopZ: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    logo: "https://www.figma.com/api/mcp/asset/bba29749-70fd-4dda-b6b4-4e8504133dfa",
    logoWidth: 138,
    logoHeight: 19,
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    author: "Lukas Weber",
    rotate: 2.9,
    desktopLeft: "47%",
    desktopTop: "212px",
    desktopZ: 1,
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/2af85c2f-2248-407d-bfb2-6b047aad4825",
    logoWidth: 143,
    logoHeight: 19,
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    author: "Marko Stojković",
    rotate: -6.85,
    desktopLeft: "7%",
    desktopTop: "102px",
    desktopZ: 1,
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/6113414c-4cdf-4d0e-a6d0-a8159ca8970a",
    logoWidth: 109,
    logoHeight: 31,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: "Sarah Jenkins",
    rotate: 2.23,
    desktopLeft: "21%",
    desktopTop: "553px",
    desktopZ: 20,
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/99120810-dee4-4241-ac9f-df702f28e4b5",
    logoWidth: 81,
    logoHeight: 36,
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    author: "Sofia Martínez",
    rotate: -4.15,
    desktopLeft: "68.5%",
    desktopTop: "546px",
    desktopZ: 20,
  },
];

function Card({
  logo,
  logoWidth,
  logoHeight,
  quote,
  author,
  cardWidth,
}: Pick<Testimonial, "logo" | "logoWidth" | "logoHeight" | "quote" | "author"> & {
  cardWidth: number;
}) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 shrink-0"
      style={{ width: cardWidth }}
    >
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="object-contain object-left"
        style={{ width: logoWidth, height: logoHeight }}
      />
      <p className="text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{quote}</p>
      <p className="font-black text-black text-[16px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">
        {author}
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials">
      {/* ── Desktop ── */}
      <div className="max-[989px]:hidden relative overflow-hidden" style={{ height: 900 }}>
        {/* Heading between the two layers: above upper cards (z-1), below lower cards (z-20) */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
          <h2
            className="font-medium text-black capitalize leading-none whitespace-nowrap select-none"
            style={{ fontSize: "13.75vw", letterSpacing: "-0.07em" }}
          >
            Testimonials
          </h2>
        </div>

        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="absolute"
            style={{
              left: t.desktopLeft,
              top: t.desktopTop,
              transform: `rotate(${t.rotate}deg)`,
              zIndex: t.desktopZ,
            }}
          >
            <Card {...t} cardWidth={353} />
          </div>
        ))}
      </div>

      {/* ── Mobile ── */}
      <div className="min-[990px]:hidden px-4 py-16 flex flex-col gap-8 overflow-hidden">
        <h2
          className="font-medium text-black capitalize text-center whitespace-nowrap"
          style={{ fontSize: "clamp(40px, 16vw, 64px)", letterSpacing: "-0.07em", lineHeight: 0.8 }}
        >
          Testimonials
        </h2>

        {/* Horizontal scroll strip — peeks second card */}
        <div className="-mx-4 overflow-x-auto">
          <div className="flex gap-4 px-4 py-10" style={{ width: "max-content" }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.author}
                style={{ transform: `rotate(${i % 2 === 0 ? -3.5 : 2}deg)` }}
              >
                <Card {...t} cardWidth={260} logoWidth={Math.round(t.logoWidth * 0.74)} logoHeight={Math.round(t.logoHeight * 0.74)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
