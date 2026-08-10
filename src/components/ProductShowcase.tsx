const ProductShowcase = () => {
  return (
    <section id="products" className="py-16 md:py-24 px-5 sm:px-10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-10 md:mb-12">
          <h2 className="font-display text-[clamp(2.5rem,6vw,64px)] text-foreground m-0">
            What we<br />stock
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-[420px] leading-relaxed lg:mb-2 text-pretty">
            A handful of local favourites we carry year-round. Ask us and we&apos;ll tell you where
            each one comes from.
          </p>
        </div>

        {/* Featured row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <article className="bento-card lg:col-span-2 flex flex-col">
            <div className="h-[260px] md:h-[380px] overflow-hidden">
              <img
                src="/images/olives.webp"
                alt="Kalamata and green olives at Stratos Market, Anaxos"
                width={1600}
                height={1600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <span className="eyebrow text-primary">Olives · Oil · Our signature</span>
              <h3 className="font-display text-3xl md:text-[40px] text-foreground mt-1.5 mb-2 leading-none">
                Kalamata &amp; Green Olives
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[480px]">
                Cured slowly, bright with brine — from groves a short drive down the coast.
              </p>
            </div>
          </article>

          <article className="bento-card flex flex-col">
            <div className="flex-1 min-h-[220px] md:min-h-[280px] overflow-hidden">
              <img
                src="/images/herbs.webp"
                alt="Wild Aegean herbs at Stratos Market, Anaxos"
                width={1600}
                height={1600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="eyebrow text-ultramarine">Herbs · Spices</span>
              <h3 className="font-display text-[30px] text-foreground mt-1.5 mb-2 leading-none">
                Wild Aegean Herbs
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Oregano, thyme and mountain tea, dried in the hills above the village.
              </p>
            </div>
          </article>
        </div>

        {/* Secondary row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <article className="bento-card flex flex-col sm:flex-row">
            <div className="h-40 sm:h-auto sm:w-[170px] shrink-0 overflow-hidden">
              <img
                src="/images/ouzo.webp"
                alt="Lesvos ouzo and tsipouro at Stratos Market, Anaxos"
                width={1600}
                height={1600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="eyebrow text-primary">Spirits · Wine</span>
              <h3 className="font-display text-[26px] text-foreground mt-1.5 mb-2 leading-none">
                Lesvos Ouzo &amp; Tsipouro
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Small-batch spirits from island distillers.
              </p>
            </div>
          </article>

          <article className="bento-card flex flex-col sm:flex-row">
            <div className="h-40 sm:h-auto sm:w-[170px] shrink-0 overflow-hidden">
              <img
                src="/images/yoghurt.webp"
                alt="Sheep's-milk yoghurt at Stratos Market, Anaxos"
                width={1600}
                height={1600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="eyebrow text-ultramarine">Dairy · Fresh</span>
              <h3 className="font-display text-[26px] text-foreground mt-1.5 mb-2 leading-none">
                Sheep&apos;s-Milk Yoghurt
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Thick and tangy, from local shepherds.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
