"use client";

import { useState } from "react";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="7" x2="21" y2="7" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="17" x2="21" y2="17" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col px-4 py-6">
          {/* Header row */}
          <div className="flex items-center justify-between shrink-0">
            <span className="font-semibold text-[16px] tracking-[-0.04em] capitalize text-white">
              H.Studio
            </span>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
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
                className="font-light text-[52px] text-white capitalize leading-[1.15] hover:opacity-50 transition-opacity border-b border-white/10 py-3"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            className="self-start mt-8 border border-white text-white font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-full shrink-0"
            onClick={() => setIsOpen(false)}
          >
            Let&apos;s talk
          </button>
        </div>
      )}
    </>
  );
}
