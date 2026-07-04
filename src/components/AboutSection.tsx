const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-5 sm:px-8 bg-gradient-earth">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Image tile */}
          <div className="lg:col-span-5 lg:row-span-2">
            <div className="bento-card h-full min-h-[420px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900&h=1200&fit=crop"
                alt="Anaxos coastline, Lesvos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Story tile */}
          <div className="lg:col-span-7 bento-card p-8 md:p-12">
            <span className="text-xs uppercase tracking-[0.28em] text-primary font-medium">
              Our Story · Since the 1990s
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 leading-[1.05] text-balance">
              A family shop that grew
              <span className="italic text-primary"> alongside the village.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-[15px] md:text-base leading-relaxed text-pretty">
              <p>
                In his twenties, Stratos opened a small corner shop in Anaxos with a single idea: stock what he&apos;d serve at his own table. Three decades on, the shop is still family-run, still on the same street, still choosing the same suppliers.
              </p>
              <p>
                What has changed is the quiet reputation — visitors come back summer after summer for the golden Lesvos honey, the creamy sheep&apos;s-milk yoghurt, the PDO Ladotyri and the olive oil pressed from the family&apos;s own trees.
              </p>
              <p>
                Wine from the mainland, ouzo and tsipouro from island distilleries, retsina for the long lunches — a taste of Greece to carry home.
              </p>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="lg:col-span-4 bento-card p-8 bg-primary text-primary-foreground grain">
            <div className="font-display text-6xl md:text-7xl leading-none">30+</div>
            <div className="mt-3 text-sm opacity-90">Summers on the same street</div>
          </div>

          <div className="lg:col-span-3 bento-card p-8">
            <div className="font-display text-4xl text-foreground leading-tight">Family</div>
            <div className="mt-2 text-sm text-muted-foreground">owned & tended, every day</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
