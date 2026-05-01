import { MobileNav } from "./components/MobileNav";
import { AboutSection } from "./components/AboutSection";
import { AboutPortraitSection } from "./components/AboutPortraitSection";
import { PhotoSection } from "./components/PhotoSection";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

function DescriptionText({ className }: { className?: string }) {
  return (
    <p className={`font-bold italic text-[14px] text-[#1f1f1f] tracking-[-0.56px] uppercase leading-[1.1] ${className ?? ""}`}>
      H.Studio is a{" "}
      <span className="font-normal not-italic">full-service</span>
      {" "}creative studio creating beautiful digital experiences and products. We are an{" "}
      <span className="font-normal not-italic">award winning</span>
      {" "}desing and art group specializing in branding, web design and engineering.
    </p>
  );
}

function TalkButton({ className }: { className?: string }) {
  return (
    <button className={`bg-black text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-full ${className ?? ""}`}>
      Let&apos;s talk
    </button>
  );
}

export default function Home() {
  return (
    <>
    {/* Hero */}
    <section className="relative h-screen overflow-hidden flex flex-col bg-neutral-300">
      {/* Hero background photo — place image at /public/hero.jpg */}
      {/* Original: pexels-vazhnik-7562188, man in a yellow jacket */}
      {/*
        object-position x=40% shifts the crop point ~15% left of center so the
        person stays centred after visually trimming the empty right side.
        Desktop: scale-[1.3] zoomed in from top-centre → shows head + arms.
        Mobile: scale-100 (no extra zoom) + lower y-anchor → shows full person.
      */}
      <img
        src="/hero.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none
                   object-[40%_50%] scale-100 origin-[40%_50%]
                   md:object-[40%_10%] md:scale-[1.3] md:origin-[40%_20%]"
      />

      {/*
        Backdrop blur — fades in upward via CSS mask so there's no hard cut-off.
        mask-image: transparent at the top → opaque at 40% of the div height.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
        }}
      />

      {/* ── Navbar ── */}
      {/* relative + no z-index → no isolated stacking context, mix-blend works below */}
      <nav className="relative px-8 max-md:px-4 flex items-center justify-between py-6 w-full shrink-0">
        <span className="font-semibold text-[16px] tracking-[-0.04em] capitalize text-black">
          H.Studio
        </span>

        <div className="max-md:hidden flex items-center gap-14 font-semibold text-[16px] tracking-[-0.04em] capitalize text-black">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
              {link}
            </a>
          ))}
        </div>

        <TalkButton className="max-md:hidden" />

        {/* Renders the hamburger icon + the fullscreen overlay menu */}
        <MobileNav />
      </nav>

      {/* ── Desktop hero content ── */}
      {/*
        No z-index here — keep this in the same stacking context as the <img>
        so mix-blend-overlay on the h1 actually composites against the photo.
        240px gap between navbar and hero text matches Figma's gap-[240px].
      */}
      <div className="max-md:hidden relative flex flex-col w-full mt-[240px]">
        {/* "[Hello i'm]" label — indented 32+18=50px from viewport left */}
        <div className="pl-[50px] -mb-[15px]">
          <span className="font-mono text-[14px] text-white uppercase mix-blend-overlay leading-[1.1]">
            [ Hello i&apos;m ]
          </span>
        </div>

        {/* Full-viewport-width name. 13.75vw = 198px ÷ 1440px × 100 */}
        <h1
          className="relative font-medium text-white mix-blend-overlay text-center capitalize leading-[1.1] whitespace-nowrap w-full"
          style={{ fontSize: "13.75vw", letterSpacing: "-0.07em" }}
        >
          Harvey&nbsp;&nbsp;&nbsp;Specter
        </h1>

        {/* Description + CTA — right-aligned, with section padding */}
        <div className="px-8 flex justify-end mt-[15px]">
          <div className="flex flex-col gap-[17px] items-start w-[294px]">
            <DescriptionText />
            <TalkButton />
          </div>
        </div>
      </div>

      {/* ── Mobile hero content ── */}
      {/*
        section uses flex + justify-between → navbar pushes to top, hero to bottom.
        The hero block (h-[341px]) contains the name at the top and description
        at the bottom, matching the Figma mobile layout.
      */}
      <div className="md:hidden relative flex flex-col flex-1 justify-end pb-6 px-4">
        <div className="flex flex-col items-center w-full">
          <span className="font-mono text-[14px] text-white uppercase mix-blend-overlay leading-[1.1]">
            [ Hello i&apos;m ]
          </span>
          <h1
            className="relative font-medium text-white mix-blend-overlay text-center capitalize leading-[0.9] w-full mb-8"
            style={{ fontSize: "clamp(64px, 25.6vw, 96px)", letterSpacing: "-0.07em" }}
          >
            Harvey<br />Specter
          </h1>
        </div>

        <div className="flex flex-col gap-[17px] items-start w-[293px] mx-auto">
          <DescriptionText />
          <TalkButton />
        </div>
      </div>
    </section>

    <AboutSection />
    <AboutPortraitSection />
    <PhotoSection />
    </>
  );
}
