import { MobileTestimonialsSlider } from "./MobileTestimonialsSlider";
import { DraggableTestimonialsDesktop } from "./DraggableTestimonialsDesktop";

export type Testimonial = {
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  quote: string;
  author: string;
  rotate: number;
  desktopLeft: string;
  desktopTop: string;
  desktopZ: number;
};


export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="bg-white">
      {/* ── Desktop ── */}
      <div className="max-[989px]:hidden">
        <DraggableTestimonialsDesktop testimonials={testimonials} />
      </div>

      {/* ── Mobile ── */}
      <div className="min-[990px]:hidden px-4 py-16 flex flex-col gap-8 overflow-hidden">
        <h2
          className="font-medium text-black capitalize text-center whitespace-nowrap"
          style={{ fontSize: "clamp(40px, 16vw, 64px)", letterSpacing: "-0.07em", lineHeight: 0.8 }}
        >
          Testimonials
        </h2>

        <MobileTestimonialsSlider testimonials={testimonials} />
      </div>
    </section>
  );
}
