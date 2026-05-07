"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

function Amp() {
  return <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>&amp;</span>;
}

const STATS = [
  { num: "50+",  label: "Happy Clients"     },
  { num: "120+", label: "Projects Done"     },
  { num: "8+",   label: "Years Active"      },
  { num: "3",    label: "Awards Won"        },
];

// ─────────────────────────────────────────────────────────────────────────────
// VARIATION D — "Stats-Led"
// Heading + portrait side-by-side, but four large stats anchor the bottom half
// and eliminate the dead white space that plagued the original.
// ─────────────────────────────────────────────────────────────────────────────
export function AboutHeroD() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headRef.current) {
        const split = new SplitText(headRef.current, { type: "lines", linesClass: "overflow-hidden" });
        gsap.fromTo(split.lines, { yPercent: 110 }, {
          yPercent: 0, ease: "power3.out", stagger: 0.07, duration: 0.9,
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
      }
      if (statsRef.current) {
        gsap.fromTo(Array.from(statsRef.current.children), { opacity: 0, y: 22 }, {
          opacity: 1, y: 0, ease: "power2.out", stagger: 0.08, duration: 0.6,
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        });
      }
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { clipPath: "inset(0% 100% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut", duration: 1.1,
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">

      {/* Desktop */}
      <div className="max-[1023px]:hidden flex min-h-screen">

        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col px-10 pt-[88px] pb-14 border-r border-[#1f1f1f]/10">

          {/* Headline */}
          <div
            ref={headRef}
            className="font-light text-[#1f1f1f] uppercase leading-[0.86] tracking-[-0.075em] flex-1 flex flex-col justify-center"
            style={{ fontSize: "clamp(30px, 4.6vw, 72px)" }}
          >
            <div>A creative director</div>
            <div><Amp /> photographer</div>
            <div>based on the south</div>
            <div>side of chicago.</div>
          </div>

          {/* Stats — [ About ] labels the block */}
          <div className="mt-auto pt-6 border-t border-[#1f1f1f]/10">
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-[10px] text-[#1f1f1f]/30 uppercase tracking-[0.2em]">[ About ]</p>
              <p className="font-mono text-[12px] text-[#1f1f1f]/30 tracking-[0.2em]">001</p>
            </div>
            <div ref={statsRef} className="grid grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.label} className={`flex flex-col gap-1.5 pr-6 ${i > 0 ? "border-l border-[#1f1f1f]/10 pl-6" : ""}`}>
                  <span
                    className="font-light text-[#1f1f1f] leading-none tracking-[-0.07em]"
                    style={{ fontSize: "clamp(28px, 3.2vw, 50px)" }}
                  >
                    {s.num}
                  </span>
                  <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div ref={imgRef} className="w-[38vw] shrink-0 relative overflow-hidden">
          <img
            src="/about/portrait.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="min-[1024px]:hidden px-5 py-10 flex flex-col gap-7">
        <div className="w-full aspect-[4/5] overflow-hidden relative">
          <img src="/about/portrait.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
        </div>
        <div className="font-light text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.07em] text-[30px]">
          A creative director <Amp /> photographer based on the south side of chicago.
        </div>
        <div className="border-t border-[#1f1f1f]/10 pt-6 flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="font-mono text-[11px] text-[#1f1f1f] uppercase tracking-[0.2em]">[ About ]</p>
            <p className="font-mono text-[11px] text-[#1f1f1f]/30">001</p>
          </div>
          <div className="grid grid-cols-2 gap-y-5">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-light text-[#1f1f1f] leading-none tracking-[-0.06em] text-[36px]">{s.num}</span>
                <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIATION E — "Cinematic Full-Bleed"
// Portrait is the entire viewport. Headline + stats live over a dark gradient
// at the bottom. Dramatic and image-forward.
// ─────────────────────────────────────────────────────────────────────────────
export function AboutHeroE() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { scale: 1.06 }, {
          scale: 1, ease: "power2.out", duration: 1.4,
          scrollTrigger: { trigger: section, start: "top 90%" },
        });
      }
      if (textRef.current) {
        const split = new SplitText(textRef.current.querySelector("[data-headline]")!, { type: "lines", linesClass: "overflow-hidden" });
        gsap.fromTo(split.lines, { yPercent: 105, opacity: 0 }, {
          yPercent: 0, opacity: 1, ease: "power3.out", stagger: 0.07, duration: 0.85,
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
        gsap.fromTo(textRef.current.querySelector("[data-stats]"), { opacity: 0 }, {
          opacity: 1, ease: "power2.out", duration: 0.7, delay: 0.5,
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ height: "100vh", minHeight: "640px" }}>

      {/* Full-bleed portrait */}
      <div ref={imgRef} className="absolute inset-0">
        <img
          src="/about/portrait.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
          style={{ transform: "scaleX(-1)" }}
        />
        {/* Gradient: transparent top → dark bottom */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.92) 100%)" }}
        />
      </div>

      {/* Overlay content */}
      <div ref={textRef} className="absolute inset-0 flex flex-col justify-between px-8 py-10 md:px-12 md:py-14">

        {/* Top labels */}
        <div className="flex justify-between items-start">
          <p className="font-mono text-[12px] text-white/50 uppercase tracking-[0.2em]">[ About ]</p>
          <p className="font-mono text-[12px] text-white/30 tracking-[0.2em]">H.Studio — 001</p>
        </div>

        {/* Bottom: headline + stats */}
        <div className="flex flex-col gap-8">
          <div
            data-headline
            className="font-light text-white uppercase leading-[0.86] tracking-[-0.075em]"
            style={{ fontSize: "clamp(28px, 5.2vw, 80px)" }}
          >
            <div>A creative director</div>
            <div><Amp /> photographer.</div>
            <div
              className="text-white/50"
              style={{ fontSize: "clamp(14px, 1.8vw, 28px)", letterSpacing: "-0.04em", lineHeight: "1.1", marginTop: "0.4em" }}
            >
              Born <Amp /> raised on the South Side of Chicago.
            </div>
          </div>

          {/* Stats row */}
          <div data-stats className="grid grid-cols-4 border-t border-white/15 pt-6 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  className="font-light text-white leading-none tracking-[-0.06em]"
                  style={{ fontSize: "clamp(22px, 2.8vw, 44px)" }}
                >
                  {s.num}
                </span>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.18em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIATION F — "Newspaper Grid"
// Stats live in a structured, bordered grid at the top (newspaper-masthead style).
// Headline + portrait occupy the lower section.
// Defined structure from heavy rules; very editorial and grid-conscious.
// ─────────────────────────────────────────────────────────────────────────────
export function AboutHeroF() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headRef.current) {
        const split = new SplitText(headRef.current, { type: "lines", linesClass: "overflow-hidden" });
        gsap.fromTo(split.lines, { yPercent: 110 }, {
          yPercent: 0, ease: "power3.out", stagger: 0.07, duration: 0.85,
          scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        });
      }
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { clipPath: "inset(0% 0% 100% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut", duration: 1.1,
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">

      {/* Desktop */}
      <div className="max-[1023px]:hidden">

        {/* Masthead row */}
        <div className="flex items-center gap-6 px-8 py-4 border-b-2 border-[#1f1f1f]">
          <p className="font-mono text-[12px] text-[#1f1f1f] uppercase tracking-[0.2em]">H.Studio</p>
          <span className="font-mono text-[#1f1f1f]/20 text-[14px]">///</span>
          <p className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase tracking-[0.2em]">About</p>
          <span className="font-mono text-[#1f1f1f]/20 text-[14px]">///</span>
          <p className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase tracking-[0.2em]">Creative Director &amp; Photographer</p>
          <p className="font-mono text-[12px] text-[#1f1f1f]/30 tracking-[0.2em] ml-auto">001</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 border-b border-[#1f1f1f]/10">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-8 py-6 flex flex-col gap-2 ${i > 0 ? "border-l border-[#1f1f1f]/10" : ""}`}
            >
              <span
                className="font-light text-[#1f1f1f] leading-none tracking-[-0.07em]"
                style={{ fontSize: "clamp(32px, 3.8vw, 60px)" }}
              >
                {s.num}
              </span>
              <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Headline + portrait */}
        <div className="flex" style={{ minHeight: "60vh" }}>
          <div className="flex-1 min-w-0 flex items-center px-8 py-10 border-r border-[#1f1f1f]/10">
            <div
              ref={headRef}
              className="font-light text-[#1f1f1f] uppercase leading-[0.86] tracking-[-0.075em]"
              style={{ fontSize: "clamp(30px, 4.8vw, 74px)" }}
            >
              <div>A creative director</div>
              <div><Amp /> photographer</div>
              <div>born <Amp /> raised on</div>
              <div>the south side</div>
              <div>of chicago.</div>
            </div>
          </div>
          <div ref={imgRef} className="w-[40vw] shrink-0 relative overflow-hidden">
            <img
              src="/about/portrait.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="min-[1024px]:hidden flex flex-col">
        <div className="px-5 py-4 border-b-2 border-[#1f1f1f]">
          <p className="font-mono text-[11px] text-[#1f1f1f] uppercase tracking-[0.2em]">H.Studio — About — 001</p>
        </div>
        <div className="grid grid-cols-2 border-b border-[#1f1f1f]/10">
          {STATS.map((s, i) => (
            <div key={s.label} className={`px-5 py-5 flex flex-col gap-1.5 ${i % 2 !== 0 ? "border-l border-[#1f1f1f]/10" : ""} ${i >= 2 ? "border-t border-[#1f1f1f]/10" : ""}`}>
              <span className="font-light text-[#1f1f1f] leading-none tracking-[-0.06em] text-[32px]">{s.num}</span>
              <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em]">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="w-full aspect-[4/5] overflow-hidden relative">
          <img src="/about/portrait.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
        </div>
        <div className="px-5 py-8">
          <div className="font-light text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.07em] text-[30px]">
            A creative director <Amp /> photographer born <Amp /> raised on the south side of chicago.
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIATION G — "Centered Headline / Portrait Inset"
// Massive centered heading owns the top 55% of the viewport.
// A smaller framed portrait sits at the bottom-left; stats float to its right.
// The portrait is an accent, not a dominant element — typography is the star.
// ─────────────────────────────────────────────────────────────────────────────
export function AboutHeroG() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headRef.current) {
        const split = new SplitText(headRef.current, { type: "lines", linesClass: "overflow-hidden" });
        gsap.fromTo(split.lines, { yPercent: 110 }, {
          yPercent: 0, ease: "power3.out", stagger: 0.07, duration: 0.9,
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
      }
      if (bottomRef.current) {
        gsap.fromTo(Array.from(bottomRef.current.children), { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, ease: "power2.out", stagger: 0.1, duration: 0.6, delay: 0.3,
          scrollTrigger: { trigger: bottomRef.current, start: "top 88%" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden min-h-screen flex flex-col">

      {/* Desktop */}
      <div className="max-[1023px]:hidden flex-1 flex flex-col">

        {/* Top strip */}
        <div className="flex justify-between items-center px-10 pt-12 pb-6">
          <p className="font-mono text-[12px] text-[#1f1f1f] uppercase tracking-[0.2em]">[ About ]</p>
          <p className="font-mono text-[12px] text-[#1f1f1f]/30 uppercase tracking-[0.2em]">[ Creative Freelancer ]</p>
          <p className="font-mono text-[12px] text-[#1f1f1f]/30 tracking-[0.2em]">001</p>
        </div>

        {/* Centered headline */}
        <div className="flex-1 flex flex-col items-center justify-center px-10 text-center border-t border-[#1f1f1f]/10 py-10">
          <div
            ref={headRef}
            className="font-light text-[#1f1f1f] uppercase leading-[0.86] tracking-[-0.08em]"
            style={{ fontSize: "clamp(36px, 6vw, 92px)" }}
          >
            <div>A Creative Director</div>
            <div><Amp /> Photographer</div>
            <div>Born <Amp /> raised on</div>
            <div>the South Side</div>
            <div>of Chicago.</div>
          </div>
        </div>

        {/* Bottom row — portrait inset + stats */}
        <div ref={bottomRef} className="flex items-stretch border-t border-[#1f1f1f]/10">

          {/* Portrait — small, framed */}
          <div className="w-[18vw] min-w-[160px] max-w-[240px] shrink-0 overflow-hidden" style={{ height: "clamp(180px, 22vw, 300px)" }}>
            <img
              src="/about/portrait.jpg"
              alt=""
              className="w-full h-full object-cover object-top"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>

          {/* Stats — 4 cells */}
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex-1 flex flex-col justify-center px-8 border-l border-[#1f1f1f]/10"
            >
              <span
                className="font-light text-[#1f1f1f] leading-none tracking-[-0.07em]"
                style={{ fontSize: "clamp(26px, 3vw, 48px)" }}
              >
                {s.num}
              </span>
              <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="min-[1024px]:hidden px-5 py-10 flex flex-col gap-6">
        <div className="flex justify-between">
          <p className="font-mono text-[11px] text-[#1f1f1f] uppercase tracking-[0.2em]">[ About ]</p>
          <p className="font-mono text-[11px] text-[#1f1f1f]/30">001</p>
        </div>
        <div className="font-light text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.07em] text-[32px] text-center">
          A Creative Director <Amp /> Photographer Born <Amp /> raised on the South Side of Chicago.
        </div>
        <div className="w-full aspect-[4/5] overflow-hidden relative">
          <img src="/about/portrait.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
        </div>
        <div className="grid grid-cols-2 gap-y-5 border-t border-[#1f1f1f]/10 pt-6">
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-light text-[#1f1f1f] leading-none tracking-[-0.06em] text-[36px]">{s.num}</span>
              <p className="font-mono text-[10px] text-[#1f1f1f]/40 uppercase tracking-[0.18em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
