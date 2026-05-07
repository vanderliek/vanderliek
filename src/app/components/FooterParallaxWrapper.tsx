"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FooterParallaxWrapper({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    if (!wrap) return;

    const inner = wrap.querySelector<HTMLElement>("[data-footer-parallax-inner]");
    if (!inner) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "clamp(top bottom)",
        end: "clamp(bottom bottom)",
        scrub: true,
      },
    });
    tl.from(inner, { yPercent: -25, ease: "linear" });

    return () => tl.scrollTrigger?.kill();
  }, []);

  return (
    <div ref={wrapRef} className="relative overflow-hidden">
      {children}
    </div>
  );
}
