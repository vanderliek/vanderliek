"use client";

import { createContext, useContext, useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

const TalkModalCtx = createContext<() => void>(() => {});
export const useTalkModal = () => useContext(TalkModalCtx);

function ItalicWord({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
      {children}
    </span>
  );
}

function Overlay({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    gsap.fromTo(overlayRef.current, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power1.inOut" });
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, {
      x: "100%",
      duration: 0.4,
      ease: "power1.out",
      onComplete: onClose,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:hello@hstudio.com?subject=${encodeURIComponent(subject || "New project inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      {/* Backdrop — desktop only */}
      <div
        className="fixed inset-0 z-[299] bg-black/30 max-md:hidden"
        onClick={close}
      />
      <div
        ref={overlayRef}
        className="fixed top-0 right-0 bottom-0 z-[300] bg-white flex flex-col overflow-y-auto w-full md:w-[560px]"
      >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 max-md:px-4 shrink-0 border-b border-[#1f1f1f]/10">
        <span className="font-semibold text-[16px] tracking-[-0.04em] text-[#1f1f1f]">
          H.Studio
        </span>
        <button onClick={close} aria-label="Close" className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="4" y1="4" x2="20" y2="20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-16 max-md:px-4 max-md:py-10 flex flex-col gap-14 w-full max-w-[680px]">

        {/* Welcome copy */}
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[12px] text-[#1f1f1f]/50 uppercase tracking-[0.12em]">
            [ Let&apos;s talk ]
          </p>
          <h2
            className="font-light uppercase text-[#1f1f1f]"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", letterSpacing: "-0.07em", lineHeight: "0.88" }}
          >
            Let&apos;s create<br />
            something <ItalicWord>great.</ItalicWord>
          </h2>
          <p className="text-[15px] text-[#1f1f1f]/55 leading-[1.55] tracking-[-0.02em] max-w-[440px]">
            Tell us about your project and we&apos;ll get back to you within 24&nbsp;hours.
            Whether it&apos;s branding, web design, or a full creative sprint — we&apos;re here for it.
          </p>
        </div>

        <hr className="border-t border-[#1f1f1f]/10" />

        {/* Form */}
        {sent ? (
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[13px] uppercase text-[#1f1f1f]/50">[ Message sent ]</p>
            <p className="text-[22px] font-light tracking-[-0.04em] text-[#1f1f1f]">
              Talk soon.
            </p>
            <p className="text-[15px] text-[#1f1f1f]/55 leading-[1.5]">
              We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 max-md:grid-cols-1">
              <Field label="Name">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-field"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field"
                />
              </Field>
            </div>

            <Field label="Subject">
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Brand identity, Web design, Photography…"
                className="input-field"
              />
            </Field>

            <Field label="Message">
              <textarea
                required
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell us about your project, timeline, budget…"
                className="input-field resize-none"
              />
            </Field>

            <button
              type="submit"
              className="self-start relative overflow-hidden group bg-[#1f1f1f] text-white font-medium text-[14px] tracking-[-0.04em] px-6 py-4 rounded-full"
            >
              <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative group-hover:text-[#1f1f1f] transition-colors duration-300">
                Send message →
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase text-[#1f1f1f]/50 tracking-[0.1em]">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TalkModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <TalkModalCtx.Provider value={open}>
      {children}
      {mounted && isOpen && createPortal(<Overlay onClose={close} />, document.body)}
    </TalkModalCtx.Provider>
  );
}
