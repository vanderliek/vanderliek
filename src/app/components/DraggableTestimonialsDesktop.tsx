"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import type { Testimonial } from "./TestimonialsSection";

const CARD_W = 353;
const CARD_H = 280; // conservative estimate for bounds calculation

function Card({
  logoUrl,
  logoWidth,
  logoHeight,
  quote,
  author,
}: Pick<Testimonial, "logoUrl" | "logoWidth" | "logoHeight" | "quote" | "author">) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 shrink-0 pointer-events-none"
      style={{ width: CARD_W }}
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

export function DraggableTestimonialsDesktop({ testimonials }: { testimonials: Testimonial[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const container = containerRef.current!;
    const cW = container.offsetWidth;
    const cH = container.offsetHeight;

    // Randomise position + set initial rotation, then fade in to hide SSR positions
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const x = Math.random() * Math.max(0, cW - CARD_W);
      const y = Math.random() * Math.max(0, cH - CARD_H);
      gsap.set(el, { left: 0, top: 0, x, y, rotation: testimonials[i]?.rotate ?? 0, opacity: 0 });
    });
    gsap.to(cardRefs.current.filter(Boolean), { opacity: 1, duration: 0.3, stagger: 0.06 });

    const instances = cardRefs.current
      .filter(Boolean)
      .flatMap((el) =>
        Draggable.create(el!, {
          type: "x,y",
          inertia: true,
          cursor: "grab",
          activeCursor: "grabbing",
          bounds: container,
          onPress() {
            const base = Number((this.target as HTMLElement).dataset.rotate ?? 0);
            const jitter = (Math.random() - 0.5) * 20; // ±10 deg
            gsap.to(this.target, { rotation: base + jitter, duration: 0.15, ease: "power2.out" });
            gsap.set(this.target, { zIndex: 200 });
          },
          onRelease() {
            gsap.set(this.target, { zIndex: (this.target as HTMLElement).dataset.z });
          },
        })
      );

    return () => {
      instances.forEach((d) => d.kill());
    };
  }, [testimonials]);

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ height: 900 }}>
      {/* z-index 5: heading sits behind all cards */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <h2
          className="font-medium text-black capitalize leading-none whitespace-nowrap select-none"
          style={{ fontSize: "13.75vw", letterSpacing: "-0.07em" }}
        >
          Testimonials
        </h2>
      </div>

      {testimonials.map((t, i) => (
        <div
          key={t.author}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          data-z={i + 20}
          data-rotate={t.rotate}
          className="absolute"
          // left/top are SSR placeholders; GSAP overwrites x/y on mount
          style={{
            left: 0,
            top: 0,
            opacity: 0,
            zIndex: i + 20, // all cards > heading z-index (5)
          }}
        >
          <Card {...t} />
        </div>
      ))}
    </div>
  );
}
