"use client";

export type NewsPageItem = {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  publishedAt?: string;
  imageUrl: string;
  description: string;
  link?: string;
};

function ExternalArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 14.5L14.5 3.5M14.5 3.5H6.5M14.5 3.5V11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsCard({ item }: { item: NewsPageItem }) {
  const inner = (
    <div className="group flex flex-col gap-4 cursor-pointer">
      <div className="relative overflow-hidden aspect-[3/4] w-full">
        <img
          src={item.imageUrl}
          alt={item.title ?? item.description}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75">
          <span className="text-white font-medium text-[12px] tracking-[0.18em] uppercase">
            Read Article
          </span>
        </div>
      </div>

      {(item.category || item.publishedAt) && (
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-black/40 font-medium">
          {item.category && <span>{item.category}</span>}
          {item.category && item.publishedAt && <span>—</span>}
          {item.publishedAt && <span>{formatDate(item.publishedAt)}</span>}
        </div>
      )}

      {item.title && (
        <h2 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#1f1f1f]">
          {item.title}
        </h2>
      )}

      <p className="text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.02em] font-normal line-clamp-3">
        {item.description}
      </p>

      <div className="flex gap-2 items-center border-b border-black pb-1 w-fit mt-auto">
        <span className="text-[13px] font-medium text-black tracking-[-0.04em]">Read more</span>
        <div className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ExternalArrow />
        </div>
      </div>
    </div>
  );

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  if (item.slug) {
    return (
      <a href={`/news/${item.slug}`} className="block">
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}

export function NewsPageContent({ items }: { items: NewsPageItem[] }) {
  return (
    <section data-nav-theme="light" className="bg-white px-8 pb-[120px] max-[989px]:px-4 max-[989px]:pb-16">
      {items.length === 0 ? (
        <p className="text-[14px] text-black/40 pt-8">No news items yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-x-8 gap-y-16 max-[989px]:grid-cols-2 max-[639px]:grid-cols-1">
          {items.map((item) => (
            <NewsCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
