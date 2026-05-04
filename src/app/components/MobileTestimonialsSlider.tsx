"use client";

import { useState, useRef } from "react";
import type { Testimonial } from "./TestimonialsSection";

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

const CARD_WIDTH = 353;
const GAP = 24;
const ROTATIONS = [-3.5, 2, -2.5, 3, -1.5];

export function MobileTestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(testimonials.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 40) next();
    else if (delta < -40) prev();
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Slider — overflow clipped by the section's overflow-hidden */}
      <div
        className="w-full relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Track: all cards in a row, translated to center the active one */}
        <div
          className="flex items-center py-12"
          style={{
            gap: GAP,
            // centers active card: move 50% of container, back by half card, then offset by index
            transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px - ${index * (CARD_WIDTH + GAP)}px))`,
            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {testimonials.map((t, i) => {
            const dist = Math.abs(i - index);
            const rotation = ROTATIONS[i % ROTATIONS.length];
            return (
              <div
                key={t.author}
                className="shrink-0"
                style={{
                  transform: `rotate(${rotation}deg) scale(${dist === 0 ? 1 : dist === 1 ? 0.88 : 0.78})`,
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.5 : 0.25,
                  transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
                  zIndex: dist === 0 ? 10 : 1,
                  position: "relative",
                }}
              >
                <Card {...t} cardWidth={CARD_WIDTH} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`rounded-full transition-all duration-200 ${
              i === index ? "w-4 h-2 bg-black" : "w-2 h-2 bg-black/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
