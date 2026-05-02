export type Testimonial = {
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  quote: string;
  author: string;
  rotate: number;
  desktopLeft: string;
  desktopTop: string;
  desktopZ: number;
};

function Card({
  logoUrl,
  logoWidth,
  logoHeight,
  quote,
  author,
  cardWidth,
}: Pick<Testimonial, "logoUrl" | "logoWidth" | "logoHeight" | "quote" | "author"> & {
  cardWidth: number;
}) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 shrink-0"
      style={{ width: cardWidth }}
    >
      <img
        src={logoUrl}
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

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
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

        {testimonials.map((t) => (
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
            {testimonials.map((t, i) => (
              <div
                key={t.author}
                style={{ transform: `rotate(${i % 2 === 0 ? -3.5 : 2}deg)` }}
              >
                <Card
                  {...t}
                  cardWidth={260}
                  logoWidth={Math.round(t.logoWidth * 0.74)}
                  logoHeight={Math.round(t.logoHeight * 0.74)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
