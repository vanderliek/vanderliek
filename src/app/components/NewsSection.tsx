"use client";

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";

export type NewsItem = {
  imageUrl: string;
  description: string;
};

function ExternalArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 14.5L14.5 3.5M14.5 3.5H6.5M14.5 3.5V11.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NewsCard({ imageUrl, description }: NewsItem) {
  return (
    <div className="group flex flex-col gap-4 cursor-pointer">
      <div className="relative h-[470px] w-full overflow-hidden shrink-0">
        {/* Image zooms on hover */}
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Dark overlay fades in */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* "Read Article" slides up */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
          <span className="text-white font-medium text-[13px] tracking-[0.18em] uppercase">
            Read Article
          </span>
        </div>
      </div>
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] font-normal">
        {description}
      </p>
      <div className="flex gap-[10px] items-center border-b border-black pb-1 w-fit">
        <span className="text-[14px] font-medium text-black tracking-[-0.04em]">Read more</span>
        {/* Arrow nudges diagonally on hover */}
        <div className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ExternalArrow />
        </div>
      </div>
    </div>
  );
}

// One card width + gap + divider + gap = 354 + 31 + 1 + 31 = 417px
const DESKTOP_STEP = 417;
const MOBILE_CARD = 300;
const MOBILE_GAP = 16;

export function NewsSection({ items }: { items: NewsItem[] }) {
  // Desktop slider
  const stripRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncScrollState = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    syncScrollState();
    el.addEventListener("scroll", syncScrollState, { passive: true });
    const ro = new ResizeObserver(syncScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncScrollState);
      ro.disconnect();
    };
  }, [syncScrollState]);

  const scrollDesktop = (dir: 1 | -1) =>
    stripRef.current?.scrollBy({ left: dir * DESKTOP_STEP, behavior: "smooth" });

  const showDesktopArrows = !(atStart && atEnd);

  // Heading scale — makes the rotated text fill the exact column height
  const headingColRef = useRef<HTMLDivElement>(null);
  const headingTextRef = useRef<HTMLDivElement>(null);
  const [headingScale, setHeadingScale] = useState<number | null>(null);

  const updateHeadingScale = useCallback(() => {
    const col = headingColRef.current;
    const text = headingTextRef.current;
    if (!col || !text) return;
    const colH = col.getBoundingClientRect().height;
    const textW = text.scrollWidth;
    if (colH > 0 && textW > 0) setHeadingScale(colH / textW);
  }, []);

  useLayoutEffect(() => {
    const col = headingColRef.current;
    if (!col) return;
    const ro = new ResizeObserver(updateHeadingScale);
    ro.observe(col);
    updateHeadingScale();
    return () => ro.disconnect();
  }, [updateHeadingScale]);

  // Mobile slider
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const mobilePrev = () => setMobileIndex((i) => Math.max(0, i - 1));
  const mobileNext = () => setMobileIndex((i) => Math.min(items.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 40) mobileNext();
    else if (delta < -40) mobilePrev();
    touchStartX.current = null;
  };

  return (
    <section id="news" className="bg-[#f3f3f3]">

      {/* ── Desktop ── */}
      <div className="max-[989px]:hidden overflow-hidden">
        <div className="pl-8 py-[120px] flex items-start">

          {/* Rotated vertical heading — scale is measured so text fills the column height exactly */}
          <div ref={headingColRef} className="w-[138px] shrink-0 self-stretch flex items-center justify-center overflow-hidden">
            <div
              ref={headingTextRef}
              className="whitespace-nowrap"
              style={{
                transform: `rotate(-90deg) scale(${headingScale ?? 0})`,
                transformOrigin: "center center",
              }}
            >
              <p className="font-light text-black text-[80px] leading-[0.86] uppercase" style={{ letterSpacing: "-0.08em" }}>
                Keep up with my latest
              </p>
              <p className="font-light text-black text-[80px] leading-[0.86] uppercase" style={{ letterSpacing: "-0.08em" }}>
                news &amp; achievements
              </p>
            </div>
          </div>

          {/* Card strip + nav arrows */}
          <div className="flex-1 min-w-0 ml-[218px] flex flex-col gap-10">
            <div ref={stripRef} className="overflow-x-hidden">
              <div className="flex items-start gap-[31px] pr-8" style={{ width: "max-content" }}>
                {items.flatMap((item, i) => [
                  i > 0 && <div key={`div-${i}`} className="w-px self-stretch shrink-0 bg-black/20" />,
                  <div key={i} className={`w-[354px] shrink-0${i % 2 === 1 ? " pt-[120px]" : ""}`}>
                    <NewsCard {...item} />
                  </div>,
                ])}
              </div>
            </div>

            {showDesktopArrows && (
              <div className="flex gap-3 self-end pr-8">
                <button
                  onClick={() => scrollDesktop(-1)}
                  disabled={atStart}
                  aria-label="Previous"
                  className="w-10 h-10 rounded-full border border-black flex items-center justify-center transition-opacity disabled:opacity-25 hover:bg-black hover:text-white"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => scrollDesktop(1)}
                  disabled={atEnd}
                  aria-label="Next"
                  className="w-10 h-10 rounded-full border border-black flex items-center justify-center transition-opacity disabled:opacity-25 hover:bg-black hover:text-white"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="min-[990px]:hidden px-4 py-[64px] flex flex-col gap-8">
        <p
          className="font-light text-black uppercase"
          style={{ fontSize: "clamp(20px, 8.5vw, 32px)", letterSpacing: "-0.08em", lineHeight: "0.86" }}
        >
          Keep up with my latest<br />news &amp; achievements
        </p>

        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              gap: MOBILE_GAP,
              transform: `translateX(calc(-${mobileIndex * (MOBILE_CARD + MOBILE_GAP)}px))`,
              transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {items.map((item, i) => (
              <div key={i} className="shrink-0" style={{ width: MOBILE_CARD }}>
                <NewsCard {...item} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                aria-label={`Go to news item ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === mobileIndex ? "w-4 h-2 bg-black" : "w-2 h-2 bg-black/25"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={mobilePrev}
              disabled={mobileIndex === 0}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-black flex items-center justify-center transition-opacity disabled:opacity-25 hover:bg-black hover:text-white"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={mobileNext}
              disabled={mobileIndex === items.length - 1}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-black flex items-center justify-center transition-opacity disabled:opacity-25 hover:bg-black hover:text-white"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
