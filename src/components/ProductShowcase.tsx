import type { CSSProperties } from "react";

/** Inline stagger for [data-reveal] */
const revealDelay = (i: number) => ({ "--reveal-delay": `${i * 60}ms` }) as CSSProperties;

const PRODUCTS = [
  {
    key: "olives",
    name: "Kalamata & Green Olives",
    tag: "Olives · Oil · Our signature",
    blurb: "Cured slowly, bright with brine — from groves a short drive down the coast.",
    src: "/images/olives.webp",
    alt: "Kalamata and green olives at Stratos Market, Anaxos",
    tilt: "-3deg",
  },
  {
    key: "herbs",
    name: "Wild Aegean Herbs",
    tag: "Herbs · Spices",
    blurb: "Oregano, thyme and mountain tea, dried in the hills above the village.",
    src: "/images/herbs.webp",
    alt: "Wild Aegean herbs at Stratos Market, Anaxos",
    tilt: "2deg",
  },
  {
    key: "ouzo",
    name: "Lesvos Ouzo & Tsipouro",
    tag: "Spirits · Wine",
    blurb: "Small-batch spirits from island distillers.",
    src: "/images/ouzo.webp",
    alt: "Lesvos ouzo and tsipouro at Stratos Market, Anaxos",
    tilt: "-1.5deg",
  },
  {
    key: "yoghurt",
    name: "Sheep's-Milk Yoghurt",
    tag: "Dairy · Fresh",
    blurb: "Thick and tangy, from local shepherds.",
    src: "/images/yoghurt.webp",
    alt: "Sheep's-milk yoghurt at Stratos Market, Anaxos",
    tilt: "3deg",
  },
];

/**
 * The rest of the range. Every item is sourced: the board painted on the
 * shopfront (bread, milk, fruit & veg, feta, honey, olive oil, drinks,
 * souvenirs, beach accessories, cards & stamps) or the shop's story copy
 * (PDO Ladotyri, wine & retsina).
 */
const ALSO_ON_THE_SHELF = [
  "Fresh bread",
  "Fresh milk",
  "Fruit & vegetables",
  "Feta cheese",
  "Lesvos honey",
  "Olive oil",
  "PDO Ladotyri",
  "Wine & retsina",
  "Drinks",
  "Souvenirs",
  "Beach accessories",
  "Cards & stamps",
];

/**
 * A kraft pinboard: prints hang from push pins and swing about the pin on
 * hover; the rest of the range is written on a lined index card beside them.
 */
const ProductShowcase = () => {
  return (
    <section id="products" className="py-16 md:py-24 px-5 sm:px-10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-10 md:mb-12">
          <div>
            <div className="section-index text-ultramarine">01 — Provisions</div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,64px)] text-foreground m-0">
              What we<br />stock
            </h2>
          </div>
          <p className="text-[17px] text-muted-foreground max-w-[420px] leading-relaxed lg:mb-2 text-pretty m-0">
            A handful of local favourites we carry year-round. Ask us and we&apos;ll tell you where
            each one comes from.
          </p>
        </div>

        <div className="pinboard grain relative rounded-[28px] p-6 sm:p-8 lg:p-12">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-12 m-0 p-0 list-none">
              {PRODUCTS.map((p, i) => (
                <li key={p.key} data-reveal style={revealDelay(i)} className={i % 2 === 1 ? "sm:mt-10" : ""}>
                  <figure
                    className="pinned relative m-0 rounded-[3px] bg-card p-3 pb-4 shadow-elevated"
                    style={{ "--tilt": p.tilt } as CSSProperties}
                  >
                    <span className="pin" aria-hidden="true" />
                    <div className="aspect-[4/3] overflow-hidden rounded-[2px]">
                      <img
                        src={p.src}
                        alt={p.alt}
                        width={1600}
                        height={1600}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <figcaption className="px-1 pt-3.5">
                      <span className="eyebrow text-primary">{p.tag}</span>
                      <h3 className="font-display font-bold italic normal-case text-[24px] leading-none text-ultramarine mt-1.5 mb-1.5">
                        {p.name}
                      </h3>
                      <p className="text-[13px] text-muted-foreground leading-relaxed m-0">{p.blurb}</p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            {/* Lined index card */}
            <div data-reveal style={revealDelay(4)} className="lg:col-span-4">
              <div
                className="pinned index-card relative rounded-[3px] shadow-elevated pr-6 pt-9 pb-6"
                style={{ "--tilt": "1.5deg" } as CSSProperties}
              >
                <span className="pin" aria-hidden="true" />
                <h3 className="font-display font-black text-[26px] leading-[32px] text-primary m-0">
                  Also on the shelf
                </h3>
                <ul className="m-0 p-0 list-none font-display font-bold italic normal-case text-[21px] leading-[32px] text-ultramarine columns-2 lg:columns-1 gap-6">
                  {ALSO_ON_THE_SHELF.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
