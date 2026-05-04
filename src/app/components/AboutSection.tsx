"use client";

import { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const HEADING_STYLE = {
  fontSize: "clamp(36px, 6.67vw, 96px)",
  letterSpacing: "-0.08em",
  lineHeight: "0.84",
} as const;

const MOBILE_HEADING_STYLE = {
  fontSize: "32px",
  letterSpacing: "-0.08em",
  lineHeight: "0.84",
} as const;

function ItalicAmpersand() {
  return (
    <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
      &amp;
    </span>
  );
}

const Heading = forwardRef<HTMLSpanElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <span
      ref={ref}
      className="font-light text-black whitespace-nowrap not-italic"
      style={HEADING_STYLE}
    >
      {children}
    </span>
  )
);
Heading.displayName = "Heading";

const MobileHeading = forwardRef<HTMLSpanElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <span
      ref={ref}
      className="font-light text-black whitespace-nowrap not-italic"
      style={MOBILE_HEADING_STYLE}
    >
      {children}
    </span>
  )
);
MobileHeading.displayName = "MobileHeading";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const d1 = useRef<HTMLSpanElement>(null);
  const d2 = useRef<HTMLSpanElement>(null);
  const d3 = useRef<HTMLSpanElement>(null);
  const d4 = useRef<HTMLSpanElement>(null);
  const d5 = useRef<HTMLSpanElement>(null);

  const m1 = useRef<HTMLSpanElement>(null);
  const m2 = useRef<HTMLSpanElement>(null);
  const m3 = useRef<HTMLSpanElement>(null);
  const m4 = useRef<HTMLSpanElement>(null);
  const m5 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const lines = (
      isMobile
        ? [m1, m2, m3, m4, m5]
        : [d1, d2, d3, d4, d5]
    ).map(r => r.current).filter((el): el is HTMLSpanElement => el !== null);

    const splits = lines.map(line => new SplitText(line, { type: "chars" }));
    const allChars = splits.flatMap(s => s.chars as HTMLElement[]);

    const ctx = gsap.context(() => {
      gsap.set(allChars, { color: "rgba(31,31,31,0.12)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "center 35%",
          scrub: 1,
        },
      });

      tl.to(allChars, { color: "#1f1f1f", ease: "none", stagger: 0.04 });
    }, section);

    return () => {
      ctx.revert();
      splits.forEach(s => s.revert());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="px-8 py-[120px] max-md:px-4 max-md:py-12">

        {/* Label + divider */}
        <div className="flex flex-col gap-3 mb-6">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </p>
          <hr className="border-t border-[#1f1f1f] m-0" />
        </div>

        {/* Desktop — staggered waterfall layout */}
        <div className="max-md:hidden flex flex-col gap-2 uppercase">
          <div className="flex items-start gap-3">
            <Heading ref={d1}>A creative director&nbsp;&nbsp;&nbsp;/</Heading>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] mt-1">001</span>
          </div>

          <div style={{ paddingLeft: "14.86vw" }}>
            <Heading ref={d2}>Photographer</Heading>
          </div>

          <div style={{ paddingLeft: "42.36vw" }}>
            <Heading ref={d3}>Born <ItalicAmpersand /> raised</Heading>
          </div>

          <div>
            <Heading ref={d4}>on the south side</Heading>
          </div>

          <div style={{ paddingLeft: "42.08vw" }}>
            <Heading ref={d5}>of chicago.</Heading>
          </div>

          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ creative freelancer ]
          </p>
        </div>

        {/* Mobile — centered layout */}
        <div className="md:hidden flex flex-col items-center gap-2 uppercase">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">001</span>
            <MobileHeading ref={m1}>A creative director&nbsp;&nbsp;&nbsp;/</MobileHeading>
          </div>
          <MobileHeading ref={m2}>Photographer</MobileHeading>
          <MobileHeading ref={m3}>Born <ItalicAmpersand /> raised</MobileHeading>
          <MobileHeading ref={m4}>on the south side</MobileHeading>
          <div className="flex flex-col items-center gap-3">
            <MobileHeading ref={m5}>of chicago.</MobileHeading>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
              [ creative freelancer ]
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
