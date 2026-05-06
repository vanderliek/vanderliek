"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

const ORANGE = "#E8A030";
const CARD_W = 320;
const CARD_H_EST = 250;
const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];
const MOBILE_W = 280;
const MOBILE_GAP = 20;

type Skill = { number: string; title: string; description: string };

const skills: Skill[] = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "Visual systems built to last — mark, type, colour, and the rules that hold them together.",
  },
  {
    number: "02",
    title: "Creative Direction",
    description:
      "Guiding vision from brief to final delivery. Knowing when to push and when to pull back.",
  },
  {
    number: "03",
    title: "Photography",
    description:
      "Composition, light, and moment. Direction that turns a shoot into a story.",
  },
  {
    number: "04",
    title: "UI / UX Design",
    description:
      "Interfaces crafted for humans — clear hierarchy, considered motion, zero friction.",
  },
  {
    number: "05",
    title: "Art Direction",
    description:
      "Shaping the visual voice of brands across print, screen, and everything between.",
  },
  {
    number: "06",
    title: "Motion & Video",
    description:
      "Static ideas set into motion. From concept boards to final edit.",
  },
  {
    number: "07",
    title: "Typography",
    description:
      "Type as a tool, not decoration. Making every word carry its own weight.",
  },
  {
    number: "08",
    title: "Strategy",
    description:
      "Clarity before creativity — every time. The thinking that makes the making matter.",
  },
];

// ─── Shared: desktop draggable canvas ────────────────────────────────────────

function DraggableSkillCanvas({
  bg,
  headingColor,
  renderCard,
}: {
  bg: string;
  headingColor: string;
  renderCard: (skill: Skill, index: number) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);
    const container = containerRef.current!;
    const cW = container.offsetWidth;
    const cH = container.offsetHeight;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const x = Math.random() * Math.max(0, cW - CARD_W);
      const y = Math.random() * Math.max(0, cH - CARD_H_EST);
      gsap.set(el, { x, y, rotation: ROTATIONS[i % ROTATIONS.length], opacity: 0 });
    });
    gsap.to(cardRefs.current.filter(Boolean), {
      opacity: 1,
      duration: 0.3,
      stagger: 0.06,
    });

    const instances = cardRefs.current
      .filter(Boolean)
      .flatMap((el) =>
        Draggable.create(el!, {
          type: "x,y",
          inertia: true,
          cursor: "grab",
          activeCursor: "grabbing",
          bounds: container,
          onPress() {
            const i = Number((this.target as HTMLElement).dataset.idx ?? 0);
            gsap.to(this.target, {
              rotation:
                ROTATIONS[i % ROTATIONS.length] + (Math.random() - 0.5) * 20,
              duration: 0.15,
              ease: "power2.out",
            });
            gsap.set(this.target, { zIndex: 200 });
          },
          onRelease() {
            gsap.set(this.target, {
              zIndex: (this.target as HTMLElement).dataset.z,
            });
          },
        })
      );

    return () => {
      instances.forEach((d) => d.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${bg} relative overflow-hidden`}
      style={{ height: 900 }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <h2
          className="font-medium leading-none whitespace-nowrap select-none"
          style={{
            fontSize: "13.75vw",
            letterSpacing: "-0.07em",
            color: headingColor,
          }}
        >
          Skills
        </h2>
      </div>

      {skills.map((skill, i) => (
        <div
          key={skill.number}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          data-z={i + 20}
          data-idx={i}
          className="absolute"
          style={{ left: 0, top: 0, zIndex: i + 20 }}
        >
          {renderCard(skill, i)}
        </div>
      ))}
    </div>
  );
}

// ─── Shared: mobile swipe slider ──────────────────────────────────────────────

function MobileSkillsSlider({
  renderCard,
  dotActive,
  dotInactive,
}: {
  renderCard: (skill: Skill, index: number) => React.ReactNode;
  dotActive: string;
  dotInactive: string;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(skills.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 40) next();
    else if (delta < -40) prev();
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="w-full relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex items-center py-10"
          style={{
            gap: MOBILE_GAP,
            transform: `translateX(calc(50% - ${MOBILE_W / 2}px - ${
              index * (MOBILE_W + MOBILE_GAP)
            }px))`,
            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {skills.map((skill, i) => {
            const dist = Math.abs(i - index);
            return (
              <div
                key={skill.number}
                className="shrink-0"
                style={{
                  width: MOBILE_W,
                  transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg) scale(${
                    dist === 0 ? 1 : dist === 1 ? 0.88 : 0.78
                  })`,
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.5 : 0.25,
                  transition:
                    "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
                  position: "relative",
                  zIndex: dist === 0 ? 10 : 1,
                }}
              >
                {renderCard(skill, i)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        {skills.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to skill ${i + 1}`}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === index ? 16 : 8,
              height: 8,
              backgroundColor: i === index ? dotActive : dotInactive,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Variation A ─────────────────────────────────────────────────────────────
// White bg · Number top-left · Bold title · Muted description

function CardA({ skill }: { skill: Skill }) {
  return (
    <div
      className="rounded-[4px] p-6 flex flex-col gap-4 pointer-events-none select-none"
      style={{ width: CARD_W, backgroundColor: ORANGE }}
    >
      <span className="font-mono text-[11px] uppercase font-bold text-black/70">
        {skill.number}
      </span>
      <p
        className="font-bold text-white text-[22px] leading-[1.1]"
        style={{ letterSpacing: "-0.04em" }}
      >
        {skill.title}
      </p>
      <p className="text-[13px] text-black/70 leading-[1.45] tracking-[-0.01em]">
        {skill.description}
      </p>
    </div>
  );
}

export function SkillsA() {
  return (
    <section id="skills" data-nav-theme="light" className="bg-[#f1f1f1]">
      <div className="max-[989px]:hidden">
        <DraggableSkillCanvas
          bg="bg-[#f1f1f1]"
          headingColor="black"
          renderCard={(skill) => <CardA skill={skill} />}
        />
      </div>

      <div className="min-[990px]:hidden px-4 py-16 flex flex-col gap-8 overflow-hidden bg-[#f1f1f1]">
        <h2
          className="font-medium text-black capitalize leading-none"
          style={{
            fontSize: "clamp(40px, 16vw, 64px)",
            letterSpacing: "-0.07em",
            lineHeight: 0.8,
          }}
        >
          Skills
        </h2>
        <MobileSkillsSlider
          renderCard={(skill) => <CardA skill={skill} />}
          dotActive="black"
          dotInactive="rgba(0,0,0,0.25)"
        />
      </div>
    </section>
  );
}

// ─── Variation B ─────────────────────────────────────────────────────────────
// Black bg · Title + number in header row · Orange top-bar accent

function CardB({ skill }: { skill: Skill }) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] overflow-hidden pointer-events-none select-none flex flex-col"
      style={{ width: CARD_W }}
    >
      {/* Orange accent bar */}
      <div style={{ height: 4, backgroundColor: ORANGE, flexShrink: 0 }} />

      <div className="p-6 flex flex-col gap-5">
        {/* Header row: title left, number right */}
        <div className="flex items-start justify-between gap-3">
          <p
            className="font-black uppercase text-[#1f1f1f] text-[13px] leading-[1.2] tracking-[-0.01em]"
          >
            {skill.title}
          </p>
          <span
            className="font-mono text-[11px] shrink-0 mt-[1px]"
            style={{ color: ORANGE }}
          >
            {skill.number}
          </span>
        </div>

        {/* Hairline */}
        <div className="h-px bg-[#ddd]" />

        {/* Description */}
        <p className="text-[13px] text-[#1f1f1f]/55 leading-[1.45] tracking-[-0.01em]">
          {skill.description}
        </p>
      </div>
    </div>
  );
}

export function SkillsB() {
  return (
    <section id="skills" data-nav-theme="dark" className="bg-black">
      <div className="max-[989px]:hidden">
        <DraggableSkillCanvas
          bg="bg-black"
          headingColor="rgba(255,255,255,0.06)"
          renderCard={(skill) => <CardB skill={skill} />}
        />
      </div>

      <div className="min-[990px]:hidden px-4 py-16 flex flex-col gap-8 overflow-hidden">
        <h2
          className="font-medium text-white capitalize leading-none"
          style={{
            fontSize: "clamp(40px, 16vw, 64px)",
            letterSpacing: "-0.07em",
            lineHeight: 0.8,
          }}
        >
          Skills
        </h2>
        <MobileSkillsSlider
          renderCard={(skill) => <CardB skill={skill} />}
          dotActive="white"
          dotInactive="rgba(255,255,255,0.25)"
        />
      </div>
    </section>
  );
}

// ─── Variation C ─────────────────────────────────────────────────────────────
// Cream bg · Italic title top · Number + dot at bottom-right

function CardC({ skill }: { skill: Skill }) {
  return (
    <div
      className="bg-white border border-[#e0d8cc] rounded-[4px] p-6 flex flex-col gap-5 pointer-events-none select-none"
      style={{ width: CARD_W }}
    >
      {/* Large italic title at top */}
      <p
        className="font-bold italic text-[#1f1f1f] text-[24px] leading-[1.1]"
        style={{ letterSpacing: "-0.04em" }}
      >
        {skill.title}
      </p>

      {/* Description */}
      <p className="text-[13px] text-[#1f1f1f]/55 leading-[1.45] tracking-[-0.01em] flex-1">
        {skill.description}
      </p>

      {/* Number + orange dot at bottom-right */}
      <div className="flex items-center justify-end gap-2 pt-1">
        <span className="text-[#1f1f1f]/30 font-mono text-[11px]">
          {skill.number}
        </span>
        <div
          className="w-[6px] h-[6px] rounded-full shrink-0"
          style={{ backgroundColor: ORANGE }}
        />
      </div>
    </div>
  );
}

export function SkillsC() {
  return (
    <section id="skills" data-nav-theme="light" className="bg-[#f0ece4]">
      <div className="max-[989px]:hidden">
        <DraggableSkillCanvas
          bg="bg-[#f0ece4]"
          headingColor="rgba(0,0,0,0.07)"
          renderCard={(skill) => <CardC skill={skill} />}
        />
      </div>

      <div className="min-[990px]:hidden px-4 py-16 flex flex-col gap-8 overflow-hidden">
        <h2
          className="font-medium text-black capitalize leading-none"
          style={{
            fontSize: "clamp(40px, 16vw, 64px)",
            letterSpacing: "-0.07em",
            lineHeight: 0.8,
          }}
        >
          Skills
        </h2>
        <MobileSkillsSlider
          renderCard={(skill) => <CardC skill={skill} />}
          dotActive="black"
          dotInactive="rgba(0,0,0,0.25)"
        />
      </div>
    </section>
  );
}
