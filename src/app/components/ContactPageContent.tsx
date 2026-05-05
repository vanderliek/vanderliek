"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MagneticButton } from "./MagneticButton";

const HEADING_STYLE = {
  fontSize: "clamp(36px, 6.67vw, 96px)",
  letterSpacing: "-0.08em",
  lineHeight: "0.84",
} as const;

const MOBILE_HEADING_STYLE = {
  fontSize: "32px",
  letterSpacing: "-0.08em",
  lineHeight: "0.84",
} as const;

function ItalicWord({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
      {children}
    </span>
  );
}

// ── Intro section (dark) ────────────────────────────────────────────────────

function ContactIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const d1 = useRef<HTMLSpanElement>(null);
  const d2 = useRef<HTMLSpanElement>(null);
  const d3 = useRef<HTMLSpanElement>(null);
  const m1 = useRef<HTMLSpanElement>(null);
  const m2 = useRef<HTMLSpanElement>(null);
  const m3 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const lines = (isMobile ? [m1, m2, m3] : [d1, d2, d3])
      .map(r => r.current)
      .filter((el): el is HTMLSpanElement => el !== null);

    const splits = lines.map(line => new SplitText(line, { type: "chars" }));
    const allChars = splits.flatMap(s => s.chars as HTMLElement[]);

    const ctx = gsap.context(() => {
      gsap.set(allChars, { color: "rgba(255,255,255,0.15)" });
      gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", end: "center 35%", scrub: 1 },
      }).to(allChars, { color: "#ffffff", ease: "none", stagger: 0.04 });
    }, section);

    return () => {
      ctx.revert();
      splits.forEach(s => s.revert());
    };
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="bg-black overflow-hidden">
      <div className="px-8 py-[140px] max-md:px-4 max-md:py-20">

        {/* Label + divider */}
        <div className="flex flex-col gap-3 mb-6">
          <p className="font-mono text-[14px] text-white/60 uppercase leading-[1.1] text-right">
            [ contact ]
          </p>
          <hr className="border-t border-white/20 m-0" />
        </div>

        {/* Desktop */}
        <div className="max-md:hidden flex flex-col gap-2 uppercase">
          <div className="flex items-start gap-3">
            <span ref={d1} className="font-light text-white whitespace-nowrap not-italic" style={HEADING_STYLE}>
              Let&apos;s build
            </span>
            <span className="font-mono text-[14px] text-white/40 leading-[1.1] mt-1">001</span>
          </div>
          <div style={{ paddingLeft: "22vw" }}>
            <span ref={d2} className="font-light text-white whitespace-nowrap not-italic" style={HEADING_STYLE}>
              something
            </span>
          </div>
          <div style={{ paddingLeft: "44vw" }}>
            <span ref={d3} className="font-light text-white whitespace-nowrap not-italic" style={HEADING_STYLE}>
              <ItalicWord>great.</ItalicWord>
            </span>
          </div>
          <p className="font-mono text-[14px] text-white/40 uppercase leading-[1.1] text-right mt-2">
            [ reach out ]
          </p>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center gap-2 uppercase text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[14px] text-white/40 leading-[1.1]">001</span>
            <span ref={m1} className="font-light text-white whitespace-nowrap not-italic" style={MOBILE_HEADING_STYLE}>
              Let&apos;s build
            </span>
          </div>
          <span ref={m2} className="font-light text-white whitespace-nowrap not-italic" style={MOBILE_HEADING_STYLE}>
            something
          </span>
          <div className="flex flex-col items-center gap-3">
            <span ref={m3} className="font-light text-white whitespace-nowrap not-italic" style={MOBILE_HEADING_STYLE}>
              <ItalicWord>great.</ItalicWord>
            </span>
            <span className="font-mono text-[14px] text-white/40 leading-[1.1]">[ reach out ]</span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Contact info + form section (light) ────────────────────────────────────

const CONTACT_INFO = [
  { label: "Email",    value: "hello@hstudio.com",          href: "mailto:hello@hstudio.com" },
  { label: "Phone",    value: "+1 (312) 000-0000",           href: "tel:+13120000000" },
  { label: "Location", value: "Chicago, IL — Remote worldwide", href: null },
  { label: "Response", value: "Within 24 hours",             href: null },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook",  href: "#" },
  { label: "X.com",     href: "#" },
  { label: "LinkedIn",  href: "#" },
];

function FormField({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label
        htmlFor={name}
        className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase tracking-[0.1em] leading-[1.1]"
      >
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-[#1f1f1f]/25 bg-transparent pb-3 text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-200"
      />
    </div>
  );
}

function SendButton() {
  return (
    <MagneticButton
      className="relative overflow-hidden group border border-[#1f1f1f] font-medium text-[14px] px-6 py-3 rounded-full"
      style={{ letterSpacing: "-0.04em" }}
    >
      <span className="absolute inset-0 bg-[#1f1f1f] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10 text-[#1f1f1f] group-hover:text-white transition-colors duration-300">
        Send message →
      </span>
    </MagneticButton>
  );
}

function ContactForm({ idPrefix, rows }: { idPrefix: string; rows: number }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name    = data.get(`${idPrefix}name`)    as string;
    const email   = data.get(`${idPrefix}email`)   as string;
    const subject = data.get(`${idPrefix}subject`) as string;
    const message = data.get(`${idPrefix}message`) as string;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:hello@hstudio.com?subject=${encodeURIComponent(subject || "New project inquiry")}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 py-12">
        <p
          className="font-light uppercase text-[#1f1f1f]"
          style={{ fontSize: "clamp(24px, 3vw, 48px)", letterSpacing: "-0.06em", lineHeight: "0.9" }}
        >
          Message <ItalicWord>sent.</ItalicWord>
        </p>
        <p className="text-[14px] text-[#1f1f1f]/50 leading-[1.6] tracking-[-0.56px]">
          Thank you for reaching out — I&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        <FormField label="Your name"      name={`${idPrefix}name`}    required />
        <FormField label="Email address"  name={`${idPrefix}email`}   type="email" required />
      </div>
      <FormField label="Subject / Project type" name={`${idPrefix}subject`} />
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${idPrefix}message`}
          className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase tracking-[0.1em] leading-[1.1]"
        >
          Message *
        </label>
        <textarea
          id={`${idPrefix}message`}
          name={`${idPrefix}message`}
          rows={rows}
          required
          placeholder="Tell me about your project..."
          className="w-full border-b border-[#1f1f1f]/25 bg-transparent pb-3 text-[14px] text-[#1f1f1f] leading-[1.6] tracking-[-0.56px] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-200 resize-none"
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <p className="font-mono text-[11px] text-[#1f1f1f]/30 uppercase tracking-[0.1em]">* required</p>
        <SendButton />
      </div>
    </form>
  );
}

function ContactMain() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (infoRef.current) {
        gsap.fromTo(
          Array.from(infoRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, ease: "power2.out", stagger: 0.08,
            scrollTrigger: { trigger: infoRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 28 },
          {
            opacity: 1, x: 0, ease: "power2.out", duration: 0.7,
            scrollTrigger: { trigger: formRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="light" className="bg-white overflow-hidden">
      <div className="px-8 py-[120px] max-md:px-4 max-md:py-16">

        {/* ── Desktop ──────────────────────────────────────────────── */}
        <div className="max-md:hidden flex gap-20 items-start">

          {/* Left: info */}
          <div ref={infoRef} className="w-[320px] shrink-0 flex flex-col gap-10">

            <div className="flex flex-col gap-3">
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ get in touch ]</p>
              <hr className="border-t border-[#1f1f1f]" />
            </div>

            <div className="flex flex-col gap-7">
              {CONTACT_INFO.map(({ label, value, href }) => (
                <div key={label} className="flex flex-col gap-1">
                  <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.1em] leading-[1.1]">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-[15px] text-[#1f1f1f] leading-[1.4] tracking-[-0.56px] w-fit relative after:absolute after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-[#1f1f1f] after:w-0 hover:after:w-full after:transition-[width] after:duration-300"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[15px] text-[#1f1f1f] leading-[1.4] tracking-[-0.56px]">{value}</p>
                  )}
                </div>
              ))}
            </div>

            <hr className="border-t border-[#1f1f1f]/15" />

            <div className="flex flex-col gap-3">
              <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.1em] leading-[1.1]">
                Follow along
              </p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[15px] text-[#1f1f1f] uppercase leading-[1.1] tracking-[-0.04em] w-fit relative after:absolute after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-[#1f1f1f] after:w-0 hover:after:w-full after:transition-[width] after:duration-300"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef} className="flex-1 min-w-0">
            <div className="flex flex-col gap-3 mb-10">
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ send a message ]</p>
              <hr className="border-t border-[#1f1f1f]" />
            </div>
            <ContactForm idPrefix="d-" rows={6} />
          </div>
        </div>

        {/* ── Mobile ───────────────────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-10">

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ send a message ]</p>
            <hr className="border-t border-[#1f1f1f]" />
          </div>

          <ContactForm idPrefix="m-" rows={4} />

          <hr className="border-t border-[#1f1f1f]/15" />

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ get in touch ]</p>
            <hr className="border-t border-[#1f1f1f]" />
          </div>

          <div className="flex flex-col gap-6">
            {CONTACT_INFO.map(({ label, value, href }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.1em] leading-[1.1]">{label}</p>
                {href ? (
                  <a href={href} className="text-[15px] text-[#1f1f1f] leading-[1.4] tracking-[-0.56px] underline">{value}</a>
                ) : (
                  <p className="text-[15px] text-[#1f1f1f] leading-[1.4] tracking-[-0.56px]">{value}</p>
                )}
              </div>
            ))}
          </div>

          <hr className="border-t border-[#1f1f1f]/15" />

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.1em] leading-[1.1]">Follow along</p>
            <div className="flex gap-5 flex-wrap">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="text-[15px] text-[#1f1f1f] uppercase leading-[1.1] tracking-[-0.04em] underline">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function ContactPageContent() {
  return (
    <>
      <ContactIntro />
      <ContactMain />
    </>
  );
}
