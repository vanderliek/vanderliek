"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PhotoSection({ showVideo = false }: { showVideo?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (showVideo) return;
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
  }, [showVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full aspect-[375/565] md:aspect-[8/5]"
    >
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="https://cdn.sanity.io/files/oroc79t9/production/a97d60ce0b468a3af4146088ea5a1341fbd0b859.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          ref={imgRef}
          src="/photo-section.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 w-full object-cover pointer-events-none object-[50%_20%] md:object-[50%_25%]"
          style={{ height: "140%", top: "-20%" }}
        />
      )}
    </section>
  );
}
