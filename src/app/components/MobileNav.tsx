"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { MagneticButton } from "./MagneticButton";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

export function MobileNav({ dark = false }: { dark?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openMenu = () => setIsVisible(true);

  const closeMenu = () => {
    gsap.to(overlayRef.current, {
      x: "100%",
      duration: 0.4,
      ease: "power1.out",
      onComplete: () => setIsVisible(false),
    });
  };

  useLayoutEffect(() => {
    if (!isVisible || !overlayRef.current) return;
    gsap.fromTo(
      overlayRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, ease: "power1.inOut" }
    );
  }, [isVisible]);

  const overlay = isVisible ? (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black flex flex-col px-4 py-6"
    >
      {/* Header row */}
      <div className="flex items-center justify-between shrink-0">
        <a
          href="/"
          className="font-semibold text-[16px] tracking-[-0.04em] capitalize text-white"
          onClick={closeMenu}
        >
          H.Studio
        </a>
        <button onClick={closeMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col justify-center">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-light text-[52px] text-white capitalize leading-[1.15] border-b border-white/10 py-3 transition-[padding,opacity] duration-300 hover:pl-3 hover:opacity-60"
            onClick={closeMenu}
          >
            {link}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <MagneticButton
        className="self-start mt-8 relative overflow-hidden group border border-white font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-full shrink-0"
        onClick={closeMenu}
      >
        <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">Let&apos;s talk</span>
      </MagneticButton>
    </div>
  ) : null;

  return (
    <>
      <button
        className="md:hidden"
        aria-label="Open menu"
        onClick={openMenu}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="7" x2="21" y2="7" stroke={dark ? "white" : "black"} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" stroke={dark ? "white" : "black"} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="17" x2="21" y2="17" stroke={dark ? "white" : "black"} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
