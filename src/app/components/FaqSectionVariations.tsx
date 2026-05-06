"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What does the brand discovery process look like?",
    answer:
      "We start with a deep-dive session — understanding your vision, audience, and competitive landscape. From there we build a strategic foundation: positioning, personality, and a visual direction before a single logo is drawn.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Brand identity projects run 4–8 weeks. Web design and development is typically 6–12 weeks depending on scope. We always agree on a clear timeline before we start so there are no surprises.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. Some of our best work has been with founders at day one. We help you establish a professional presence that can scale — without over-engineering what you don't yet need.",
  },
  {
    question: "What information do you need to get started?",
    answer:
      "A brief overview of your business, your goals, any reference material you love (or hate), and your timeline. We'll handle the rest in our kickoff call.",
  },
  {
    question: "Can you work with our existing brand guidelines?",
    answer:
      "Absolutely. We regularly extend or evolve existing systems — adding digital components, updating typography, or bringing consistency to materials that have drifted over time.",
  },
  {
    question: "Do you offer ongoing retainer support?",
    answer:
      "Yes. After a project wraps, many clients stay on a monthly retainer for design support, content production, and web updates. We offer flexible packages based on your needs.",
  },
];

/* ─────────────────────────────────────────────
   VARIATION A — Dark, full-width accordion
   Expand on click with animated bar + slide text
───────────────────────────────────────────── */
export function FaqVariationA() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12">
      <div className="flex flex-col gap-12">
        <div className="flex items-baseline justify-between uppercase text-white font-light leading-none" style={{ letterSpacing: "-0.08em" }}>
          <p className="font-mono text-[14px] text-white uppercase leading-[1.1] self-start">[ faq ]</p>
          <span className="min-[990px]:text-[96px] text-[32px]">Questions</span>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group text-left w-full"
              >
                {/* Top divider with animated fill */}
                <div className="relative h-px bg-white/20 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-white transition-transform duration-500 ease-out"
                    style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
                  />
                </div>

                <div className="py-6 flex items-start justify-between gap-6">
                  <p
                    className="font-bold italic text-white uppercase leading-[1.1] text-[24px] min-[990px]:text-[32px] transition-transform duration-300"
                    style={{
                      letterSpacing: "-0.04em",
                      transform: isOpen ? "translateX(8px)" : "translateX(0)",
                    }}
                  >
                    {faq.question}
                  </p>
                  <span
                    className="font-mono text-white/50 text-[18px] shrink-0 mt-1 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </div>

                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{ maxHeight: isOpen ? "200px" : "0px" }}
                >
                  <p className="text-white/60 text-[15px] leading-[1.5] tracking-[-0.02em] pb-6 max-w-[640px]">
                    {faq.answer}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Bottom divider */}
          <div className="h-px bg-white/20" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VARIATION B — White, numbered split layout
   Number on left, question + answer right
───────────────────────────────────────────── */
export function FaqVariationB() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12">
      <div className="flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[14px] uppercase leading-[1.1]">[ faq ]</p>
          <h2
            className="font-bold italic uppercase leading-[0.9] text-[96px] max-[989px]:text-[48px]"
            style={{ letterSpacing: "-0.05em" }}
          >
            Common<br />Questions
          </h2>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-0">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-t border-black/10 last:border-b">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-6 flex gap-8 items-start max-[989px]:gap-4"
                >
                  {/* Number */}
                  <span
                    className="font-mono text-[13px] text-black/30 shrink-0 pt-1 w-8"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Question + answer */}
                  <div className="flex-1 flex flex-col gap-0">
                    <div className="flex items-start justify-between gap-4">
                      <p
                        className="font-bold text-black text-[18px] min-[990px]:text-[22px] leading-[1.2]"
                        style={{ letterSpacing: "-0.03em" }}
                      >
                        {faq.question}
                      </p>
                      <span
                        className="text-black/40 text-[20px] shrink-0 transition-transform duration-300 mt-0.5"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </div>

                    <div
                      className="overflow-hidden transition-all duration-500 ease-out"
                      style={{ maxHeight: isOpen ? "200px" : "0px" }}
                    >
                      <p className="text-black/50 text-[15px] leading-[1.6] tracking-[-0.02em] pt-4 max-w-[560px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VARIATION C — Dark, two-column active panel
   Left: list of questions; Right: active answer
───────────────────────────────────────────── */
export function FaqVariationC() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#0a0a0a] px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-end justify-between">
          <p className="font-mono text-[14px] text-white/40 uppercase leading-[1.1]">[ faq ]</p>
          <h2
            className="font-bold italic uppercase text-white leading-[0.9] text-[64px] max-[989px]:text-[36px]"
            style={{ letterSpacing: "-0.05em" }}
          >
            Questions
          </h2>
        </div>

        {/* Body — desktop: 2-col, mobile: stacked accordion */}
        <div className="min-[990px]:grid min-[990px]:grid-cols-[1fr_1fr] min-[990px]:gap-16">
          {/* Left: question list */}
          <div className="flex flex-col border-t border-white/10">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left py-5 border-b border-white/10 flex items-start justify-between gap-4 group"
              >
                <p
                  className="text-[15px] leading-[1.3] tracking-[-0.02em] transition-colors duration-200"
                  style={{ color: active === i ? "#ffffff" : "rgba(255,255,255,0.35)" }}
                >
                  {faq.question}
                </p>
                <span
                  className="font-mono text-[12px] shrink-0 mt-0.5 transition-colors duration-200"
                  style={{ color: active === i ? "#ffffff" : "rgba(255,255,255,0.2)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          {/* Right: active answer panel — desktop only */}
          <div className="max-[989px]:hidden flex flex-col justify-center">
            <div className="sticky top-[120px]">
              <p
                className="font-bold italic uppercase text-white leading-[1.0] text-[28px] mb-6"
                style={{ letterSpacing: "-0.04em" }}
                key={active + "-q"}
              >
                {faqs[active].question}
              </p>
              <div className="h-px bg-white/20 mb-6" />
              <p
                className="text-white/50 text-[15px] leading-[1.6] tracking-[-0.02em]"
                key={active + "-a"}
              >
                {faqs[active].answer}
              </p>
            </div>
          </div>

          {/* Mobile: show answer below selected */}
          <div className="min-[990px]:hidden mt-6 px-0">
            <p className="font-bold italic uppercase text-white leading-[1.0] text-[20px] mb-4" style={{ letterSpacing: "-0.04em" }}>
              {faqs[active].question}
            </p>
            <div className="h-px bg-white/20 mb-4" />
            <p className="text-white/50 text-[14px] leading-[1.6] tracking-[-0.02em]">
              {faqs[active].answer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
