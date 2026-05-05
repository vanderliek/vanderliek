"use client";

/**
 * V3 — Narrow sidebar (labels + number) left of a two-part content column
 * (heading on top, bracketed bio below). Most unconventional: sidebar gives
 * the layout a strong vertical rhythm while the heading sits left-aligned.
 */

import { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Heading font for the narrower content column (sidebar eats ~160px)
const H = {
  fontSize: "clamp(16px, 3.6vw, 52px)",
  letterSpacing: "-0.08em",
  lineHeight: "0.84",
} as const;

const H_MOBILE = {
  fontSize: "28px",
  letterSpacing: "-0.08em",
  lineHeight: "0.84",
} as const;

function ItalicAmpersand() {
  return (
    <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>&amp;</span>
  );
}

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M1 15V1H15" stroke="#1f1f1f" strokeWidth="1" />
    </svg>
  );
}

const BracketedText = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div ref={ref} className="flex items-center gap-3 w-full">
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
        <CornerBracket /><CornerBracket className="-rotate-90" />
      </div>
      <div className="flex-1 min-w-0 py-3">{children}</div>
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
        <CornerBracket className="rotate-90" /><CornerBracket className="rotate-180" />
      </div>
    </div>
  )
);
BracketedText.displayName = "BracketedText";

const BIO_TEXT =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

export function AboutCombinedV3() {
  const sectionRef = useRef<HTMLElement>(null);
  const d1 = useRef<HTMLSpanElement>(null);
  const d2 = useRef<HTMLSpanElement>(null);
  const d3 = useRef<HTMLSpanElement>(null);
  const d4 = useRef<HTMLSpanElement>(null);
  const d5 = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const lines = [d1, d2, d3, d4, d5]
      .map(r => r.current)
      .filter((el): el is HTMLSpanElement => el !== null);
    const splits = lines.map(l => new SplitText(l, { type: "chars" }));
    const chars = splits.flatMap(s => s.chars as HTMLElement[]);

    const ctx = gsap.context(() => {
      gsap.set(chars, { color: "rgba(31,31,31,0.12)" });

      gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", end: "40% 35%", scrub: 1 },
      }).to(chars, { color: "#1f1f1f", ease: "none", stagger: 0.04 });

      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 100%)",
            ease: "none",
            scrollTrigger: {
              trigger: overlayRef.current.parentElement,
              start: "top 85%",
              end: "bottom 55%",
              scrub: 1,
            },
          }
        );
      }

      if (bioRef.current) {
        gsap.fromTo(bioRef.current, { x: -40 }, {
          x: 0, ease: "none",
          scrollTrigger: { trigger: bioRef.current, start: "top bottom", end: "top 60%", scrub: 1 },
        });
      }
    }, section);

    return () => { ctx.revert(); splits.forEach(s => s.revert()); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">

      {/* ── Desktop ≥1148px ── */}
      <div className="max-[1147px]:hidden flex min-h-[90vh]">

        {/* Left 2/3 — sidebar + content */}
        <div className="flex-1 min-w-0 flex">

          {/* Sidebar — narrow column with vertical labels */}
          <div className="w-[140px] shrink-0 border-r border-[#1f1f1f]/20 flex flex-col justify-between py-[80px] px-5">
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>
              <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">001</p>
            </div>

            {/* Vertical rotated label */}
            <div className="flex-1 flex items-center justify-center py-8 overflow-hidden">
              <p
                className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase leading-[1.1] whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}
              >
                8+ years in industry
              </p>
            </div>

            <div className="flex flex-col gap-4 items-start">
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ freelancer ]</p>
              <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">002</p>
            </div>
          </div>

          {/* Content — heading + bio */}
          <div className="flex-1 min-w-0 pl-8 pr-6 py-[80px] flex flex-col gap-8">

            {/* Heading — staggered, offsets relative to this sub-column */}
            <div className="flex flex-col gap-2 uppercase flex-1">
              <hr className="border-t border-[#1f1f1f] mb-6" />
              <div>
                <span ref={d1} className="font-light text-black whitespace-nowrap not-italic" style={H}>
                  A creative director&nbsp;&nbsp;&nbsp;/
                </span>
              </div>
              <div style={{ paddingLeft: "4vw" }}>
                <span ref={d2} className="font-light text-black whitespace-nowrap not-italic" style={H}>Photographer</span>
              </div>
              <div style={{ paddingLeft: "18vw" }}>
                <span ref={d3} className="font-light text-black whitespace-nowrap not-italic" style={H}>
                  Born <ItalicAmpersand /> raised
                </span>
              </div>
              <div>
                <span ref={d4} className="font-light text-black whitespace-nowrap not-italic" style={H}>on the south side</span>
              </div>
              <div style={{ paddingLeft: "18vw" }}>
                <span ref={d5} className="font-light text-black whitespace-nowrap not-italic" style={H}>of chicago.</span>
              </div>
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right mt-2">
                [ creative freelancer ]
              </p>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-3">
              <hr className="border-t border-[#1f1f1f]" />
              <BracketedText ref={bioRef}>
                <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">{BIO_TEXT}</p>
              </BracketedText>
            </div>
          </div>
        </div>

        {/* Right 1/3 — Portrait */}
        <div className="w-[33.33vw] shrink-0 relative overflow-hidden">
          <img
            src="/about/portrait.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transform: "scaleX(-1)" }}
          />
          <div ref={overlayRef} className="absolute inset-0 bg-black" />
        </div>
      </div>

      {/* ── Mobile <1148px ── */}
      <div className="min-[1148px]:hidden px-4 py-12 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>
          <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">001</p>
        </div>
        <hr className="border-t border-[#1f1f1f] m-0" />
        <div className="flex flex-col gap-2 uppercase">
          {["A creative director /", "Photographer", "Born & raised", "on the south side", "of chicago."].map((t, i) => (
            <span key={i} className="font-light text-black not-italic" style={H_MOBILE}>{t}</span>
          ))}
        </div>
        <div className="w-full aspect-[3/4] overflow-hidden relative">
          <img src="/about/portrait.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
        </div>
        <hr className="border-t border-[#1f1f1f] m-0" />
        <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">{BIO_TEXT}</p>
      </div>

    </section>
  );
}
