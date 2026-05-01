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

function ItalicAmpersand() {
  return (
    <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
      &amp;
    </span>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-light text-black whitespace-nowrap not-italic"
      style={HEADING_STYLE}
    >
      {children}
    </span>
  );
}

function MobileHeading({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-light text-black whitespace-nowrap not-italic"
      style={MOBILE_HEADING_STYLE}
    >
      {children}
    </span>
  );
}

export function AboutSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="px-8 py-[120px] max-md:px-4 max-md:py-12">

        {/* Label + divider */}
        <div className="flex flex-col gap-3 mb-6">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </p>
          <hr className="border-t border-[#1f1f1f] m-0" />
        </div>

        {/* Desktop — staggered waterfall layout */}
        <div className="max-md:hidden flex flex-col gap-2 uppercase">
          {/* "A creative director /" + "001" counter */}
          <div className="flex items-start gap-3">
            <Heading>A creative director&nbsp;&nbsp;&nbsp;/</Heading>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] mt-1">001</span>
          </div>

          {/* "Photographer" — indented ~15% */}
          <div style={{ paddingLeft: "14.86vw" }}>
            <Heading>Photographer</Heading>
          </div>

          {/* "Born & raised" — indented ~42% */}
          <div style={{ paddingLeft: "42.36vw" }}>
            <Heading>Born <ItalicAmpersand /> raised</Heading>
          </div>

          {/* "on the south side" — full left */}
          <div>
            <Heading>on the south side</Heading>
          </div>

          {/* "of chicago." — indented ~42% */}
          <div style={{ paddingLeft: "42.08vw" }}>
            <Heading>of chicago.</Heading>
          </div>

          {/* "[ creative freelancer ]" — right-aligned, mirrors top label */}
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ creative freelancer ]
          </p>
        </div>

        {/* Mobile — centered layout */}
        <div className="md:hidden flex flex-col items-center gap-2 uppercase">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">001</span>
            <MobileHeading>A creative director&nbsp;&nbsp;&nbsp;/</MobileHeading>
          </div>
          <MobileHeading>Photographer</MobileHeading>
          <MobileHeading>Born <ItalicAmpersand /> raised</MobileHeading>
          <MobileHeading>on the south side</MobileHeading>
          <div className="flex flex-col items-center gap-3">
            <MobileHeading>of chicago.</MobileHeading>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
              [ creative freelancer ]
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
