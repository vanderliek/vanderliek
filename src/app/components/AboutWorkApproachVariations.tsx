"use client";

const steps = [
  {
    number: "01",
    phase: "Listen",
    title: "Discovery",
    description:
      "We start by asking questions and listening — understanding your brand, your goals, and the people you're trying to reach before anything else.",
  },
  {
    number: "02",
    phase: "Define",
    title: "Strategy",
    description:
      "What we've heard gets shaped into a clear direction. A creative strategy that drives every decision, every line, every pixel that follows.",
  },
  {
    number: "03",
    phase: "Create",
    title: "Execution",
    description:
      "With a clear brief we move fast. Design, copy, code — built to the exact standard the work demands, nothing less.",
  },
  {
    number: "04",
    phase: "Refine",
    title: "Delivery",
    description:
      "We don't ship and disappear. We iterate, test, and refine until the work is right — then hand it over properly.",
  },
];

// ─── Variation A: Numbered List (editorial, close to services section) ───────

export function WorkApproachA() {
  return (
    <section
      id="work-approach"
      data-nav-theme="dark"
      className="bg-black px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12"
    >
      <div className="flex flex-col gap-12 max-[989px]:gap-8">
        <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
          [ work approach ]
        </p>

        <div
          className="flex items-baseline justify-between uppercase text-white font-light leading-none"
          style={{ letterSpacing: "-0.08em" }}
        >
          <span className="min-[990px]:text-[96px] text-[32px]">[{steps.length}]</span>
          <span className="min-[990px]:text-[96px] text-[32px]">Steps</span>
        </div>

        <div className="flex flex-col gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group flex flex-col gap-[9px] cursor-default -mx-8 px-8 py-3 max-[989px]:-mx-4 max-[989px]:px-4"
            >
              <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
                [ {step.number} ]
              </p>
              <div className="relative h-px bg-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </div>
              <div className="flex items-start justify-between gap-6 pt-[9px] max-[989px]:flex-col max-[989px]:gap-4 max-[989px]:pt-0">
                <div className="flex flex-col gap-1 shrink-0">
                  <p
                    className="font-bold italic text-white uppercase leading-[1.1] text-[36px] transition-transform duration-300 group-hover:translate-x-2"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {step.phase}
                  </p>
                  <p className="font-mono text-[12px] text-white/40 uppercase tracking-widest">
                    {step.title}
                  </p>
                </div>
                <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] w-[393px] max-[989px]:w-full">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Variation B: Horizontal Step Cards ──────────────────────────────────────

export function WorkApproachB() {
  return (
    <section
      id="work-approach"
      data-nav-theme="dark"
      className="bg-black px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12"
    >
      <div className="flex flex-col gap-16 max-[989px]:gap-10">
        <div className="flex items-end justify-between max-[989px]:flex-col max-[989px]:items-start max-[989px]:gap-4">
          <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
            [ work approach ]
          </p>
          <p
            className="min-[990px]:text-[64px] text-[28px] font-light text-white uppercase leading-none"
            style={{ letterSpacing: "-0.06em" }}
          >
            How we work
          </p>
        </div>

        {/* Horizontal rule */}
        <div className="h-px bg-white/20 w-full" />

        {/* Cards grid */}
        <div className="grid grid-cols-4 gap-px bg-white/10 max-[989px]:grid-cols-1">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group bg-black flex flex-col gap-8 p-6 hover:bg-white/5 transition-colors duration-300"
            >
              {/* Number + connecting line */}
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[11px] text-white/30 uppercase"
                >
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden min-[990px]:block flex-1 h-px bg-white/10" />
                )}
              </div>

              {/* Phase name */}
              <div className="flex flex-col gap-2 mt-auto">
                <p
                  className="font-bold italic text-white uppercase text-[28px] leading-[1] group-hover:translate-x-1 transition-transform duration-300"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {step.phase}
                </p>
                <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
                  {step.title}
                </p>
              </div>

              <p className="text-[13px] text-white/60 leading-[1.4] tracking-[-0.02em]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Variation C: Large Number / Sparse Type ─────────────────────────────────

export function WorkApproachC({ light = false }: { light?: boolean }) {
  const t = light
    ? {
        section: "bg-white",
        navTheme: "light" as const,
        label: "text-black",
        subtitle: "text-black/40",
        border: "border-black/10",
        borderHover: "hover:border-black/30",
        number: "text-black/10 group-hover:text-black/20",
        phase: "text-black",
        phaseLabel: "text-black/30",
        desc: "text-black/60",
      }
    : {
        section: "bg-black",
        navTheme: "dark" as const,
        label: "text-white",
        subtitle: "text-white/40",
        border: "border-white/10",
        borderHover: "hover:border-white/30",
        number: "text-white/10 group-hover:text-white/20",
        phase: "text-white",
        phaseLabel: "text-white/30",
        desc: "text-white/60",
      };

  return (
    <section
      id="work-approach"
      data-nav-theme={t.navTheme}
      className={`${t.section} px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12`}
    >
      <div className="flex flex-col gap-20 max-[989px]:gap-14">
        <div className="flex flex-col gap-3">
          <p className={`font-mono text-[14px] ${t.label} uppercase leading-[1.1]`}>
            [ work approach ]
          </p>
          <p className={`text-[13px] ${t.subtitle} leading-[1.4] tracking-[-0.02em] max-w-[480px]`}>
            A repeatable process built around clarity, honesty, and craft. No
            guessing. No bloat. Just work that moves.
          </p>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`group grid min-[990px]:grid-cols-[1fr_2fr_2fr] grid-cols-1 gap-6 py-10 border-t ${t.border} ${
                i === steps.length - 1 ? `border-b ${t.border}` : ""
              } ${t.borderHover} transition-colors duration-300`}
            >
              {/* Giant number */}
              <div
                className={`font-light ${t.number} transition-colors duration-500 leading-none select-none min-[990px]:text-[120px] text-[64px]`}
                style={{ letterSpacing: "-0.08em" }}
              >
                {step.number}
              </div>

              {/* Phase */}
              <div className="flex flex-col justify-center gap-1">
                <p
                  className={`font-bold italic ${t.phase} uppercase text-[36px] leading-[1] group-hover:translate-x-2 transition-transform duration-300`}
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {step.phase}
                </p>
                <p className={`font-mono text-[11px] ${t.phaseLabel} uppercase tracking-widest`}>
                  — {step.title}
                </p>
              </div>

              {/* Description */}
              <div className="flex items-center">
                <p className={`text-[14px] ${t.desc} leading-[1.4] tracking-[-0.03em]`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
