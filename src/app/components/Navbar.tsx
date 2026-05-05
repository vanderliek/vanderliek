"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MagneticButton } from "./MagneticButton";
import { MobileNav } from "./MobileNav";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "#projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

// Navbar is ~80px tall — used as the midpoint for section-theme detection
const NAVBAR_H = 80;

function TalkButton({ dark, className }: { dark: boolean; className?: string }) {
  return (
    <MagneticButton
      className={`relative overflow-hidden group font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-full transition-colors duration-300 ${
        dark ? "bg-white text-black" : "bg-black text-white"
      } ${className ?? ""}`}
    >
      <span
        className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out ${
          dark ? "bg-black" : "bg-white"
        }`}
      />
      <span
        className={`relative transition-colors duration-300 ${
          dark ? "group-hover:text-white" : "group-hover:text-black"
        }`}
      >
        Let&apos;s talk
      </span>
    </MagneticButton>
  );
}

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false); // hero is light → start black
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number;

    function update() {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;

      // Always visible when near top; hide on scroll-down, show on scroll-up
      if (scrollY < NAVBAR_H) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      // Pick the section whose vertical span covers the navbar midpoint
      const midY = NAVBAR_H / 2;
      let isDark = false;
      for (const el of document.querySelectorAll<HTMLElement>("[data-nav-theme]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= midY && r.bottom > midY) {
          isDark = el.dataset.navTheme === "dark";
          break;
        }
      }
      setDark(isDark);

      lastScrollY.current = scrollY;
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const textColor = dark ? "text-white" : "text-black";
  const underlineColor = dark ? "after:bg-white" : "after:bg-black";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 max-md:px-4 flex items-center justify-between py-6 w-full transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href="/"
        className={`font-semibold text-[16px] tracking-[-0.04em] capitalize transition-colors duration-300 ${textColor}`}
      >
        H.Studio
      </a>

      <div className={`max-md:hidden flex items-center gap-14 font-semibold text-[16px] tracking-[-0.04em] capitalize transition-colors duration-300 ${textColor}`}>
        {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <a
                key={label}
                href={href}
                className={`relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:transition-[width] after:duration-300 hover:after:w-full ${underlineColor} ${
                  isActive ? "after:w-full" : "after:w-0"
                }`}
              >
                {label}
              </a>
            );
          })}
      </div>

      <TalkButton dark={dark} className="max-md:hidden" />
      <MobileNav dark={dark} />
    </nav>
  );
}
