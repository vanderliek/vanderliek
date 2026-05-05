"use client";

import { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 15V1H15" stroke="#1f1f1f" strokeWidth="1" />
    </svg>
  );
}

const BracketedText = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={`flex items-center gap-3 ${className ?? "flex-1 min-w-0"}`}>
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
        <CornerBracket />
        <CornerBracket className="-rotate-90" />
      </div>
      <div className="flex-1 min-w-0 py-3">{children}</div>
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
        <CornerBracket className="rotate-90" />
        <CornerBracket className="rotate-180" />
      </div>
    </div>
  )
);
BracketedText.displayName = "BracketedText";

const BIO_TEXT =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

export function AboutPortraitSection() {
  const desktopOverlayRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const desktopBioRef = useRef<HTMLDivElement>(null);
  const mobileBioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateOverlay = (overlay: HTMLDivElement | null) => {
      if (!overlay) return;
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: overlay.parentElement,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 1,
          },
        }
      );
    };

    const animateBio = (el: HTMLDivElement | null) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { x: -40 },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    };

    animateOverlay(desktopOverlayRef.current);
    animateOverlay(mobileOverlayRef.current);
    animateBio(desktopBioRef.current);
    animateBio(mobileBioRef.current);

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="bg-white">
      {/* Desktop ≥1148px */}
      <div className="max-[1147px]:hidden px-8 py-20 flex items-start justify-between">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ About ]
        </p>

        <div className="relative flex items-end shrink-0 pl-[518px]">
          <BracketedText ref={desktopBioRef} className="absolute bottom-0 left-0 w-[486px]">
            <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
              {BIO_TEXT}
            </p>
          </BracketedText>

          <div className="flex gap-6 items-start shrink-0">
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0">002</p>
            <div className="w-[436px] h-[614px] overflow-hidden relative shrink-0">
              <img
                src="/about/portrait.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
              <div
                ref={desktopOverlayRef}
                className="absolute inset-0 bg-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile <1148px */}
      <div className="min-[1148px]:hidden px-4 py-12 flex flex-col gap-5 items-start">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>

        <BracketedText ref={mobileBioRef}>
          <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
            {BIO_TEXT}
          </p>
        </BracketedText>

        <div className="w-full aspect-[422/594] overflow-hidden relative">
          <img
            src="/about/portrait.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          <div
            ref={mobileOverlayRef}
            className="absolute inset-0 bg-black"
          />
        </div>
      </div>
    </section>
  );
}
