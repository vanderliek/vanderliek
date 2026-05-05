export type Service = {
  title: string;
  description: string;
  imageUrl: string;
  order: number;
};

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" data-nav-theme="dark" className="bg-black px-8 py-[80px] max-[989px]:px-4 max-[989px]:py-12">
      <div className="flex flex-col gap-12 max-[989px]:gap-8">

        {/* Label */}
        <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>

        {/* Count + title heading */}
        <div
          className="flex items-baseline justify-between uppercase text-white font-light leading-none"
          style={{ letterSpacing: "-0.08em" }}
        >
          <span className="min-[990px]:text-[96px] text-[32px]">[{services.length}]</span>
          <span className="min-[990px]:text-[96px] text-[32px]">Deliverables</span>
        </div>

        {/* Services list */}
        <div className="flex flex-col gap-12">
          {services.map((service, index) => (
            <div key={service.title} className="group flex flex-col gap-[9px] max-[989px]:gap-3 cursor-pointer -mx-8 px-8 py-3 max-[989px]:-mx-4 max-[989px]:px-4">

              {/* Number + divider */}
              <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
                [ {index + 1} ]
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
                  {service.imageUrl && (
                    <div className="size-[151px] shrink-0 overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
