"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { useTalkModal } from "./TalkModal";

function DescriptionText({ className }: { className?: string }) {
  return (
    <p className={`font-bold italic text-[14px] text-[#1f1f1f] tracking-[-0.56px] uppercase leading-[1.1] ${className ?? ""}`}>
      H.Studio is a{" "}
      <span className="font-normal not-italic">full-service</span>
      {" "}creative studio creating beautiful digital experiences and products. We are an{" "}
      <span className="font-normal not-italic">award winning</span>
      {" "}desing and art group specializing in branding, web design and engineering.
    </p>
  );
}

function TalkButton({ className }: { className?: string }) {
  const openModal = useTalkModal();
  return (
    <MagneticButton onClick={openModal} className={`relative overflow-hidden group bg-black text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-full ${className ?? ""}`}>
      <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
      <span className="relative group-hover:text-black transition-colors duration-300">Let&apos;s talk</span>
    </MagneticButton>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  // Desktop refs
  const dHelloRef = useRef<HTMLDivElement>(null);
  const dHarveyRef = useRef<HTMLSpanElement>(null);
  const dSpecterRef = useRef<HTMLSpanElement>(null);

  // Mobile refs
  const mHelloRef = useRef<HTMLSpanElement>(null);
  const mHarveyRef = useRef<HTMLSpanElement>(null);
  const mSpecterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const initialScale = isMobile ? 1 : 1.3;

    // Set initial bg scale via GSAP (replaces Tailwind scale classes)
    gsap.set(bg, { scale: initialScale, transformOrigin: isMobile ? "40% 50%" : "40% 20%" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Background grows as you scroll
      tl.to(bg, { scale: initialScale + 0.3, ease: "none" }, 0);

      if (!isMobile) {
        // Harvey flies left, Specter flies right
        if (dHarveyRef.current) tl.to(dHarveyRef.current, { x: "-35vw", ease: "none" }, 0);
        if (dSpecterRef.current) tl.to(dSpecterRef.current, { x: "35vw", ease: "none" }, 0);
        // "Hello i'm" trails harvey at ~60% of its speed — visual delay
        if (dHelloRef.current) tl.to(dHelloRef.current, { x: "-21vw", ease: "none" }, 0);
      } else {
        if (mHarveyRef.current) tl.to(mHarveyRef.current, { x: "-28vw", ease: "none" }, 0);
        if (mSpecterRef.current) tl.to(mSpecterRef.current, { x: "28vw", ease: "none" }, 0);
        if (mHelloRef.current) tl.to(mHelloRef.current, { x: "-17vw", ease: "none" }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} data-nav-theme="light" className="relative h-screen overflow-hidden flex flex-col bg-neutral-300 [transform:translateZ(0)]">
      <img
        ref={bgRef}
        src="/hero.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none object-[40%_50%] md:object-[40%_10%]"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
        }}
      />

      {/* ── Desktop hero content ── */}
      <div className="max-md:hidden relative flex flex-col w-full mt-auto pb-[60px]">
        <div ref={dHelloRef} className="pl-[50px] -mb-[15px]">
          <span className="font-mono text-[14px] text-white uppercase mix-blend-overlay leading-[1.1]">
            [ Hello i&apos;m ]
          </span>
        </div>

        <h1
          className="relative font-medium text-white mix-blend-overlay text-center capitalize leading-[1.1] whitespace-nowrap w-full"
          style={{ fontSize: "13.75vw", letterSpacing: "-0.07em" }}
        >
          <span ref={dHarveyRef} className="inline-block">Harvey</span>
          &nbsp;&nbsp;&nbsp;
          <span ref={dSpecterRef} className="inline-block">Specter</span>
        </h1>

        <div className="px-8 flex justify-end mt-[15px]">
          <div className="flex flex-col gap-[17px] items-start w-[294px]">
            <DescriptionText />
            <TalkButton />
          </div>
        </div>
      </div>

      {/* ── Mobile hero content ── */}
      <div className="md:hidden relative flex flex-col flex-1 justify-end pb-6 px-4">
        <div className="flex flex-col items-center w-full">
          <span ref={mHelloRef} className="font-mono text-[14px] text-white uppercase mix-blend-overlay leading-[1.1] inline-block">
            [ Hello i&apos;m ]
          </span>
          <h1
            className="relative font-medium text-white mix-blend-overlay text-center capitalize leading-[0.9] w-full mb-8"
            style={{ fontSize: "clamp(64px, 25.6vw, 96px)", letterSpacing: "-0.07em" }}
          >
            <span ref={mHarveyRef} className="inline-block">Harvey</span>
            <br />
            <span ref={mSpecterRef} className="inline-block">Specter</span>
          </h1>
        </div>

        <div className="flex flex-col gap-[17px] items-start w-[293px] mx-auto">
          <DescriptionText />
          <TalkButton />
        </div>
      </div>
    </section>
  );
}
