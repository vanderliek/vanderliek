"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bar = barRef.current;
    if (!overlay || !bar) return;

    const tl = gsap.timeline();

    // Eager progress to 75% while assets load
    tl.to(bar, { scaleX: 0.75, duration: 1.2, ease: "power2.out" });

    const finish = () => {
      tl.to(bar, { scaleX: 1, duration: 0.25, ease: "power2.out" })
        .to(bar, { scaleX: 0, transformOrigin: "right", duration: 0.75, ease: "power3.inOut" }, "exit")
        .to(overlay, {
          yPercent: -100,
          duration: 0.75,
          ease: "power3.inOut",
          onComplete: () => setGone(true),
        }, "exit");
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
    >
      <span
        className="font-medium text-black tracking-[-0.07em] select-none"
        style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
      >
        H.Studio
      </span>

      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-neutral-200">
        <div
          ref={barRef}
          className="h-full bg-black origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
