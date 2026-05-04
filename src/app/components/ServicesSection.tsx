const SERVICES = [
  {
    number: "[ 1 ]",
    title: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/233a4f56-d119-482b-9578-825dc8f7dfec",
  },
  {
    number: "[ 2 ]",
    title: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/856d48d2-0402-46f9-a91d-88d8e54825da",
  },
  {
    number: "[ 3 ]",
    title: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/72410a06-d2af-4133-9537-9a3df033dedc",
  },
  {
    number: "[ 4 ]",
    title: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/43a29053-3136-4cf8-b8d9-9ab3b7b1dd62",
  },
] as const;

export function ServicesSection() {
  return (
    <section id="services" data-nav-theme="dark" className="bg-black px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12">
      <div className="flex flex-col gap-12 max-[989px]:gap-8">

        {/* Label */}
        <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>

        {/* Count + title heading — stays one row on both breakpoints */}
        <div
          className="flex items-baseline justify-between uppercase text-white font-light leading-none"
          style={{ letterSpacing: "-0.08em" }}
        >
          <span className="min-[990px]:text-[96px] text-[32px]">[4]</span>
          <span className="min-[990px]:text-[96px] text-[32px]">Deliverables</span>
        </div>

        {/* Services list */}
        <div className="flex flex-col gap-12">
          {SERVICES.map((service) => (
            <div key={service.number} className="group flex flex-col gap-[9px] max-[989px]:gap-3 cursor-pointer -mx-8 px-8 py-3 max-[989px]:-mx-4 max-[989px]:px-4">

              {/* Number + divider */}
              <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
                {service.number}
              </p>
              <div className="relative h-px bg-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </div>

              {/* Desktop: title left, desc+image right
                  Mobile: title → description → image stacked */}
              <div className="flex items-start justify-between gap-6 pt-[9px] max-[989px]:flex-col max-[989px]:gap-4 max-[989px]:pt-0">
                <p
                  className="font-bold italic text-white uppercase leading-[1.1] shrink-0 text-[36px] transition-transform duration-300 group-hover:translate-x-2"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {service.title}
                </p>
                <div className="flex items-start gap-6 max-[989px]:flex-col max-[989px]:gap-4 max-[989px]:w-full">
                  <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] w-[393px] max-[989px]:w-full">
                    {service.description}
                  </p>
                  <div className="size-[151px] shrink-0 overflow-hidden">
                    <img
                      src={service.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
