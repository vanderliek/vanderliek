import { SkillsA, SkillsB, SkillsC } from "../components/AboutSkillsVariations";

export default function SkillsPreviewPage() {
  return (
    <div className="min-h-screen">

      <div className="bg-black px-8 py-10 border-b border-white/10 max-[989px]:px-4">
        <p className="font-mono text-[12px] text-white/40 uppercase tracking-widest">
          Preview — Skills Section Variations · Drag the cards
        </p>
      </div>

      {/* Variation A */}
      <div className="border-b border-black/10">
        <div className="bg-white px-8 pt-8 max-[989px]:px-4">
          <p className="font-mono text-[11px] text-black/30 uppercase tracking-widest">
            — Variation A · White · Number top-left
          </p>
        </div>
        <SkillsA />
      </div>

      {/* Variation B */}
      <div className="border-b border-white/10">
        <div className="bg-black px-8 pt-8 max-[989px]:px-4">
          <p className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
            — Variation B · Black · Orange accent bar
          </p>
        </div>
        <SkillsB />
      </div>

      {/* Variation C */}
      <div>
        <div className="bg-[#f0ece4] px-8 pt-8 max-[989px]:px-4">
          <p className="font-mono text-[11px] text-black/30 uppercase tracking-widest">
            — Variation C · Cream · Italic title + dot
          </p>
        </div>
        <SkillsC />
      </div>

    </div>
  );
}
