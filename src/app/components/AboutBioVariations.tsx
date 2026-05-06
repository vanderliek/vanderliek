"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BIO =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

const BIO_SHORT =
  "A creative director and photographer with 8+ years crafting brands, campaigns, and visual identities that resonate. Based in Chicago — working worldwide.";

const ROWS = [
  { num: "001", key: "ROLE",  value: "Creative Director & Photographer" },
  { num: "002", key: "BASED", value: "Chicago, IL — Available worldwide" },
  { num: "003", key: "SINCE", value: "2016 — 8+ years of industry" },
  { num: "004", key: "CRAFT", value: "Branding / Web / Photography / Film" },
];

export function AboutBioV3C() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(Array.from(leftRef.current.children), { opacity: 0, x: -28 }, {
          opacity: 1, x: 0, ease: "power2.out", stagger: 0.1, duration: 0.6,
          scrollTrigger: { trigger: leftRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, ease: "power2.out", duration: 0.8, delay: 0.2,
          scrollTrigger: { trigger: rightRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="bg-black overflow-hidden">
      <div className="px-8 py-[120px] max-md:px-4 max-md:py-16">

        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[14px] text-white/60 uppercase leading-[1.1]">[ The Story ]</p>
          <p className="font-mono text-[14px] text-white/40 leading-[1.1]">001</p>
        </div>
        <hr className="border-t border-white/20 mb-10" />

        {/* Desktop: two-column */}
        <div className="max-md:hidden flex gap-0 items-stretch">

          {/* Left: compact index */}
          <div ref={leftRef} className="w-[46%] pr-12 flex flex-col border-r border-white/15">
            {ROWS.map(({ num, key, value }) => (
              <div key={num} className="flex items-start gap-5 py-5 border-b border-white/10 last:border-b-0">
                <span className="font-mono text-[11px] text-white/25 leading-[1.1] shrink-0 pt-[3px]">{num}</span>
                <span className="font-mono text-[11px] text-white/40 uppercase tracking-[0.1em] leading-[1.1] shrink-0 w-14 pt-[3px]">{key}</span>
                <span className="text-[14px] text-white leading-[1.45] tracking-[-0.56px]">{value}</span>
              </div>
            ))}
          </div>

          {/* Right: stat + bio */}
          <div ref={rightRef} className="flex-1 pl-12 flex flex-col justify-between gap-8">
            <div>
              <p
                className="font-light text-white leading-[0.82] uppercase"
                style={{ fontSize: "clamp(88px, 14vw, 180px)", letterSpacing: "-0.07em" }}
              >
                8<span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>+</span>
              </p>
              <p className="font-mono text-[11px] text-white/40 uppercase tracking-[0.1em] leading-[1.1] mt-3">
                years in the industry
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <hr className="border-t border-white/15" />
              <p className="text-[14px] text-white font-light leading-[1.65]" style={{ letterSpacing: "-0.03em" }}>{BIO_SHORT}</p>
              <p className="text-[12px] text-white/45 leading-[1.75] tracking-[-0.56px]">{BIO}</p>
            </div>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-7">
          <div className="flex flex-col">
            {ROWS.map(({ num, key, value }) => (
              <div key={num} className="flex items-start gap-4 py-4 border-b border-white/10">
                <span className="font-mono text-[11px] text-white/25 leading-[1.1] shrink-0 pt-[2px]">{num}</span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.1em] leading-[1.1] shrink-0 w-12 pt-[2px]">{key}</span>
                <span className="text-[13px] text-white leading-[1.4] tracking-[-0.56px]">{value}</span>
              </div>
            ))}
          </div>
          <div>
            <p
              className="font-light text-white leading-[0.82] uppercase"
              style={{ fontSize: "96px", letterSpacing: "-0.07em" }}
            >
              8<span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>+</span>
            </p>
            <p className="font-mono text-[11px] text-white/40 uppercase tracking-[0.1em] leading-[1.1] mt-2">years in the industry</p>
          </div>
          <hr className="border-t border-white/15" />
          <p className="text-[14px] text-white font-light leading-[1.65]" style={{ letterSpacing: "-0.03em" }}>{BIO_SHORT}</p>
          <p className="text-[12px] text-white/45 leading-[1.75] tracking-[-0.56px]">{BIO}</p>
        </div>

      </div>
    </section>
  );
}
