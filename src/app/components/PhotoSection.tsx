"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: 0 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative overflow-hidden w-full aspect-[375/565] md:aspect-[8/5]"
    >
      <img
        ref={imgRef}
        src="/photo-section.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 w-full object-cover pointer-events-none object-[41%_50%] md:object-center"
        style={{ height: "130%", top: "-15%" }}
      />
    </section>
  );
}
