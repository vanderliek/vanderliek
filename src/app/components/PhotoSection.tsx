export function PhotoSection() {
  return (
    <section className="relative overflow-hidden w-full aspect-[375/565] md:aspect-[8/5]">
      {/*
        Mobile: object-position 41% replicates the Figma left-offset crop
        (visible slice spans ~17–65% of image width → centre ≈ 41%).
        Desktop: centred cover matching the 1440×900 Figma frame.
      */}
      <img
        src="/photo-section.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none
                   object-[41%_50%] md:object-center"
      />
    </section>
  );
}
