import {
  PhotoSectionVideoA,
  PhotoSectionVideoB,
  PhotoSectionVideoC,
  PhotoSectionVideoD,
} from "../components/PhotoSectionVariations";

export default function PhotoSectionPreviewPage() {
  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col gap-0">
      <div className="px-8 py-6 border-b border-white/10">
        <p className="font-mono text-[12px] text-white/40 uppercase tracking-widest">
          Photo Section — Video Overlay Variations
        </p>
      </div>

      {/* A */}
      <div>
        <div className="px-8 pt-6 pb-3">
          <p className="font-mono text-[11px] text-white/25 uppercase tracking-widest">A — Centered Monolith</p>
        </div>
        <PhotoSectionVideoA />
      </div>

      {/* B */}
      <div>
        <div className="px-8 pt-6 pb-3">
          <p className="font-mono text-[11px] text-white/25 uppercase tracking-widest">B — Bottom-Left Editorial</p>
        </div>
        <PhotoSectionVideoB />
      </div>

      {/* C */}
      <div>
        <div className="px-8 pt-6 pb-3">
          <p className="font-mono text-[11px] text-white/25 uppercase tracking-widest">C — Three-Column Stat Strip</p>
        </div>
        <PhotoSectionVideoC />
      </div>

      {/* D */}
      <div>
        <div className="px-8 pt-6 pb-3">
          <p className="font-mono text-[11px] text-white/25 uppercase tracking-widest">D — Oversized Typography</p>
        </div>
        <PhotoSectionVideoD />
      </div>
    </div>
  );
}
