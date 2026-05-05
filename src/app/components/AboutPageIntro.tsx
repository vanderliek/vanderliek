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

function ItalicWord({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
      {children}
    </span>
  );
}

const Heading = forwardRef<HTMLSpanElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <span
      ref={ref}
      className="font-light text-white whitespace-nowrap not-italic"
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
      className="font-light text-white whitespace-nowrap not-italic"
      style={MOBILE_HEADING_STYLE}
    >
      {children}
    </span>
  )
);
MobileHeading.displayName = "MobileHeading";

export function AboutPageIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  const d1 = useRef<HTMLSpanElement>(null);
  const d2 = useRef<HTMLSpanElement>(null);
  const d3 = useRef<HTMLSpanElement>(null);

  const m1 = useRef<HTMLSpanElement>(null);
  const m2 = useRef<HTMLSpanElement>(null);
  const m3 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const lines = (
      isMobile ? [m1, m2, m3] : [d1, d2, d3]
    ).map(r => r.current).filter((el): el is HTMLSpanElement => el !== null);

    const splits = lines.map(line => new SplitText(line, { type: "chars" }));
    const allChars = splits.flatMap(s => s.chars as HTMLElement[]);

    const ctx = gsap.context(() => {
      gsap.set(allChars, { color: "rgba(255,255,255,0.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center 35%",
          scrub: 1,
        },
      });

      tl.to(allChars, { color: "#ffffff", ease: "none", stagger: 0.04 });
    }, section);

    return () => {
      ctx.revert();
      splits.forEach(s => s.revert());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="bg-black overflow-hidden"
    >
      <div className="px-8 py-[140px] max-md:px-4 max-md:py-20">

        {/* Label + divider */}
        <div className="flex flex-col gap-3 mb-6">
          <p className="font-mono text-[14px] text-white/60 uppercase leading-[1.1] text-right">
            [ The story ]
          </p>
          <hr className="border-t border-white/20 m-0" />
        </div>

        {/* Desktop — staggered waterfall layout */}
        <div className="max-md:hidden flex flex-col gap-2 uppercase">
          <div className="flex items-start gap-3">
            <Heading ref={d1}>Get to</Heading>
            <span className="font-mono text-[14px] text-white/40 leading-[1.1] mt-1">001</span>
          </div>

          <div style={{ paddingLeft: "22vw" }}>
            <Heading ref={d2}>
              know the <ItalicWord>creative</ItalicWord>
            </Heading>
          </div>

          <div style={{ paddingLeft: "44vw" }}>
            <Heading ref={d3}>behind the work.</Heading>
          </div>

          <p className="font-mono text-[14px] text-white/40 uppercase leading-[1.1] text-right mt-2">
            [ About me ]
          </p>
        </div>

        {/* Mobile — centered layout */}
        <div className="md:hidden flex flex-col items-center gap-2 uppercase text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[14px] text-white/40 leading-[1.1]">001</span>
            <MobileHeading ref={m1}>Get to know</MobileHeading>
          </div>
          <MobileHeading ref={m2}>
            the <ItalicWord>creative</ItalicWord>
          </MobileHeading>
          <div className="flex flex-col items-center gap-3">
            <MobileHeading ref={m3}>behind the work.</MobileHeading>
            <span className="font-mono text-[14px] text-white/40 leading-[1.1]">
              [ About me ]
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
