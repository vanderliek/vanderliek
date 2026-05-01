const SOCIAL_LINKS_LEFT = ["Facebook", "Instagram"];
const SOCIAL_LINKS_RIGHT = ["x.com", "Linkedin"];

export function FooterSection() {
  return (
    <footer id="contact" className="bg-black text-white">

      {/* ── Desktop ── */}
      <div className="max-[989px]:hidden pt-[48px] px-8 flex flex-col gap-[120px]">

        {/* Top: CTA + social columns + divider */}
        <div className="flex flex-col gap-[48px]">
          <div className="flex items-start justify-between">

            {/* CTA */}
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="font-light italic text-[24px] uppercase leading-[1.1]" style={{ letterSpacing: "-0.04em" }}>
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button className="border border-white font-medium text-[14px] px-4 py-3 rounded-full w-fit" style={{ letterSpacing: "-0.04em" }}>
                Let&apos;s talk
              </button>
            </div>

            {/* Social — center */}
            <p className="text-center text-[18px] uppercase leading-[1.1] w-[298px]" style={{ letterSpacing: "-0.04em" }}>
              {SOCIAL_LINKS_LEFT.map((name, i) => (
                <span key={name}>{name}{i < SOCIAL_LINKS_LEFT.length - 1 && <br />}</span>
              ))}
            </p>

            {/* Social — right */}
            <p className="text-right text-[18px] uppercase leading-[1.1] w-[298px]" style={{ letterSpacing: "-0.04em" }}>
              {SOCIAL_LINKS_RIGHT.map((name, i) => (
                <span key={name}>{name}{i < SOCIAL_LINKS_RIGHT.length - 1 && <br />}</span>
              ))}
            </p>
          </div>

          <div className="border-t border-white" />
        </div>

        {/* Bottom: large brand name + legal links */}
        <div className="flex items-end justify-between">

          {/* H.Studio with rotated label */}
          <div className="flex-1 min-w-0 overflow-clip relative">
            {/* Rotated byline — sits on the far-left edge, vertically centred on the text */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[15px] h-[160px] flex items-center justify-center">
              <span className="font-mono text-[14px] uppercase leading-[1.1] -rotate-90 whitespace-nowrap">
                [ Coded By Claude ]
              </span>
            </div>

            {/* Brand name — in normal flow so container height tracks font size */}
            <p
              className="font-semibold capitalize leading-[0.8] whitespace-nowrap pl-[5px]"
              style={{ fontSize: "20.1vw", letterSpacing: "-0.06em" }}
            >
              H.Studio
            </p>
          </div>

          {/* Legal links — pinned to bottom-right */}
          <div className="flex items-center gap-[34px] text-[12px] uppercase pb-8 shrink-0" style={{ letterSpacing: "-0.04em" }}>
            <a href="#" className="underline">licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="min-[990px]:hidden pt-[48px] px-4 flex flex-col gap-[48px]">

        {/* Top: CTA + social stacked + divider */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <p className="font-light italic text-[24px] uppercase leading-[1.1]" style={{ letterSpacing: "-0.04em" }}>
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button className="border border-white font-medium text-[14px] px-4 py-3 rounded-full w-fit" style={{ letterSpacing: "-0.04em" }}>
                Let&apos;s talk
              </button>
            </div>

            {[...SOCIAL_LINKS_LEFT, ...SOCIAL_LINKS_RIGHT].map((name) => (
              <p key={name} className="text-[18px] uppercase leading-[1.1]" style={{ letterSpacing: "-0.04em" }}>
                {name}
              </p>
            ))}
          </div>

          <div className="border-t border-white" />
        </div>

        {/* Bottom: legal links + byline + H.Studio (cropped) */}
        <div className="overflow-clip flex flex-col items-center gap-4">
          <div className="flex items-center gap-[34px] text-[12px] uppercase" style={{ letterSpacing: "-0.04em" }}>
            <a href="#" className="underline">licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[10px] uppercase leading-[1.1]">
              [ Coded By Claude ]
            </span>
            <p
              className="font-semibold capitalize leading-[0.8] whitespace-nowrap"
              style={{ fontSize: "24.38vw", letterSpacing: "-0.06em" }}
            >
              H.Studio
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
