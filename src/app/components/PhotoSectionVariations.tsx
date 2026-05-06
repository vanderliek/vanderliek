"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VIDEO_SRC =
  "https://cdn.sanity.io/files/oroc79t9/production/a97d60ce0b468a3af4146088ea5a1341fbd0b859.mp4";

function VideoBase({
  children,
  sectionRef,
}: {
  children: React.ReactNode;
  sectionRef?: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative overflow-hidden w-full aspect-[375/565] md:aspect-[8/5]"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      {/* scrim */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      {children}
    </section>
  );
}

// ─── Variation A: Centered Monolith ──────────────────────────────────────────

export function PhotoSectionVideoA() {
  return (
    <VideoBase>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
        <p className="font-mono text-[12px] text-white/50 uppercase tracking-widest">
          [ momentum ]
        </p>
        <h2
          className="font-bold text-white uppercase leading-[0.9] min-[990px]:text-[96px] text-[48px]"
          style={{ letterSpacing: "-0.05em" }}
        >
          Built for<br />velocity.
        </h2>
        <div className="w-16 h-px bg-white/30" />
        <p className="text-[14px] text-white/60 leading-[1.4] tracking-[-0.02em] max-w-[360px]">
          Sharp thinking. Fast delivery. No delay between idea and execution.
        </p>
      </div>
    </VideoBase>
  );
}

// ─── Variation B: Bottom-Left Editorial ──────────────────────────────────────

export function PhotoSectionVideoB() {
  return (
    <VideoBase>
      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 md:px-12 md:pb-16">
        <div className="flex items-end justify-between gap-8 max-[989px]:flex-col max-[989px]:items-start max-[989px]:gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
              [ agility ]
            </p>
            <h2
              className="font-bold italic text-white uppercase leading-[0.9] min-[990px]:text-[80px] text-[44px]"
              style={{ letterSpacing: "-0.05em" }}
            >
              Move fast.<br />Stay sharp.
            </h2>
          </div>
          <p className="text-[13px] text-white/55 leading-[1.5] tracking-[-0.02em] max-w-[260px] mb-1">
            From brief to live — we operate at the speed your brand actually needs, without cutting corners on craft.
          </p>
        </div>
      </div>
    </VideoBase>
  );
}

// ─── Variation C: Three-Column Stat Strip ────────────────────────────────────

export function PhotoSectionVideoC() {
  return (
    <VideoBase>
      {/* Top label */}
      <div className="absolute top-8 left-8 md:left-12">
        <p className="font-mono text-[12px] text-white/40 uppercase tracking-widest">
          [ forward ]
        </p>
      </div>

      {/* Bottom stat bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-black/30 backdrop-blur-sm px-8 md:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2 md:border-r md:border-white/15 md:pr-8">
          <p
            className="font-bold text-white uppercase leading-[1] text-[36px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Speed
          </p>
          <p className="text-[12px] text-white/50 leading-[1.4] tracking-[-0.01em]">
            Brief to live in weeks, not months.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:border-r md:border-white/15 md:pr-8">
          <p
            className="font-bold text-white uppercase leading-[1] text-[36px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Precision
          </p>
          <p className="text-[12px] text-white/50 leading-[1.4] tracking-[-0.01em]">
            Every decision backed by strategy, not guesswork.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p
            className="font-bold text-white uppercase leading-[1] text-[36px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Momentum
          </p>
          <p className="text-[12px] text-white/50 leading-[1.4] tracking-[-0.01em]">
            We iterate fast and ship work that's ready.
          </p>
        </div>
      </div>
    </VideoBase>
  );
}

// ─── Variation D: Oversized Typography ───────────────────────────────────────

export function PhotoSectionVideoD() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const headline = headlineRef.current;
    if (!section || !line1 || !line2 || !headline) return;

    const ctx = gsap.context(() => {
      // Stagger entrance: lines slide up when section scrolls into view
      gsap.fromTo(
        [line1, line2],
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: headline,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        }
      );

      // Parallax: headline drifts up as section scrolls out
      gsap.to(headline, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <VideoBase sectionRef={sectionRef}>
      {/* Top-right mono tag */}
      <div className="absolute top-8 right-8 md:right-12">
        <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest text-right">
          H.Studio — creative direction
        </p>
      </div>

      {/* Full-bleed giant type, bottom-anchored */}
      <div ref={headlineRef} className="absolute inset-x-0 bottom-0 px-6 md:px-10 pb-8">
        <h2
          className="font-bold italic text-white uppercase leading-[0.85] min-[990px]:text-[160px] text-[80px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          <div className="overflow-hidden">
            <span ref={line1Ref} className="block">Move fast.</span>
          </div>
          <div className="overflow-hidden">
            <span ref={line2Ref} className="block">Stay sharp.</span>
          </div>
        </h2>
      </div>

      {/* Small descriptor — center right */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 max-w-[220px] text-right max-[989px]:hidden">
        <div className="w-8 h-px bg-white/30 ml-auto" />
        <p className="text-[13px] text-white/55 leading-[1.5] tracking-[-0.02em]">
          From concept to shipping — we move with urgency and deliver with care.
        </p>
      </div>
    </VideoBase>
  );
}
