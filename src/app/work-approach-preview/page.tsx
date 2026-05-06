import { WorkApproachA, WorkApproachB, WorkApproachC } from "../components/AboutWorkApproachVariations";

export default function WorkApproachPreviewPage() {
  return (
    <div className="bg-black min-h-screen">

      <div className="px-8 py-10 border-b border-white/10 max-[989px]:px-4">
        <p className="font-mono text-[12px] text-white/40 uppercase tracking-widest">
          Preview — Work Approach Variations
        </p>
      </div>

      {/* Variation A */}
      <div className="border-b border-white/10">
        <div className="px-8 pt-8 max-[989px]:px-4">
          <p className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
            — Variation A · Numbered List
          </p>
        </div>
        <WorkApproachA />
      </div>

      {/* Variation B */}
      <div className="border-b border-white/10">
        <div className="px-8 pt-8 max-[989px]:px-4">
          <p className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
            — Variation B · Horizontal Cards
          </p>
        </div>
        <WorkApproachB />
      </div>

      {/* Variation C */}
      <div>
        <div className="px-8 pt-8 max-[989px]:px-4">
          <p className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
            — Variation C · Large Number / Sparse
          </p>
        </div>
        <WorkApproachC />
      </div>

    </div>
  );
}
