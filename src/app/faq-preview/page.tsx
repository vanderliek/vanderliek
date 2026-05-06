import { FaqVariationA, FaqVariationB, FaqVariationC } from "../components/FaqSectionVariations";

export default function FaqPreviewPage() {
  return (
    <main>
      {/* ── Variation A ── */}
      <div className="relative">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
          <span className="font-mono text-white text-[12px] uppercase tracking-widest">Variation A — Dark Accordion</span>
        </div>
        <FaqVariationA />
      </div>

      {/* ── Variation B ── */}
      <div className="relative">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/10 backdrop-blur-sm border border-black/20 rounded-full px-4 py-1.5">
          <span className="font-mono text-black text-[12px] uppercase tracking-widest">Variation B — White Numbered</span>
        </div>
        <FaqVariationB />
      </div>

      {/* ── Variation C ── */}
      <div className="relative">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
          <span className="font-mono text-white text-[12px] uppercase tracking-widest">Variation C — Two-Column Panel</span>
        </div>
        <FaqVariationC />
      </div>
    </main>
  );
}
