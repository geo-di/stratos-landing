import { Card, CardContent } from "@/components/ui/card";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Kalamata & Green Olives",
      description: "Cured slowly, bright with brine — from groves a short drive down the coast.",
      image: "/images/olives.webp",
      category: "Olives · Oil",
      tone: "bg-primary/10",
    },
    {
      id: 2,
      name: "Wild Aegean Herbs",
      description: "Oregano, thyme and mountain tea, cut and dried in the hills above the village.",
      image: "/images/herbs.webp",
      category: "Herbs · Spices",
      tone: "bg-accent/20",
    },
    {
      id: 3,
      name: "Lesvos Ouzo & Tsipouro",
      description: "Small-batch spirits from island distillers — the taste of a long taverna evening.",
      image: "/images/ouzo.webp",
      category: "Spirits · Wine",
      tone: "bg-olive/15",
    },
    {
      id: 4,
      name: "Sheep&apos;s-Milk Yoghurt",
      description: "Thick, tangy Lesvos yoghurt from local shepherds — a spoonful of honey and you&apos;re home.",
      image: "/images/yoghurt.webp",
      category: "Dairy · Fresh",
      tone: "bg-secondary/40",
    },
  ];

  return (
    <section id="products" className="py-20 md:py-28 px-5 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.28em] text-primary font-medium">
            The shelf · 04
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4 mb-5 text-balance leading-[1.05]">
            Small things,
            <span className="italic text-primary"> chosen carefully.</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A handful of local favourites we stock year-round. Come in and we&apos;ll happily tell you the story behind each one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, i) => (
            <Card
              key={product.id}
              className={`bento-card border-none group hover:-translate-y-1 transition-all duration-500 ${i % 2 === 1 ? 'lg:translate-y-6' : ''}`}
            >
              <div className={`aspect-[4/5] overflow-hidden ${product.tone}`}>
                <img
                  src={product.image}
                  alt={`${product.name} at Stratos Market, Anaxos`}
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                />
              </div>
              <CardContent className="p-6">
                <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-medium">
                  {product.category}
                </span>
                <h3 className="font-display text-2xl text-foreground mt-2 mb-2 leading-snug"
                    dangerouslySetInnerHTML={{ __html: product.name }} />
                <p className="text-sm text-muted-foreground leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: product.description }} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border/60 bg-muted/40 px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <p className="font-display text-2xl md:text-3xl text-foreground leading-snug text-balance">
              The full shelf is best seen in person — coffee&apos;s on us.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              We&apos;re open every day. Stop by after the beach, or before the village walk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
