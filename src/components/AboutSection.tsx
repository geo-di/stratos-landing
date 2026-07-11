const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-5 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Image tile */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-border/60 min-h-[320px] lg:min-h-[420px] bg-muted flex items-center justify-center">
            <img
              src="/placeholder.svg"
              alt="Placeholder — replace with a real photo of the shop"
              className="w-1/3 h-1/3 object-contain opacity-60"
            />
          </div>

          {/* Story tile */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-[1.1] text-balance">
              A family shop, running since the 1990s.
            </h2>
            <div className="space-y-4 text-muted-foreground text-[15px] md:text-base leading-relaxed text-pretty">
              <p>
                In his twenties, Stratos opened a small corner shop in Anaxos with a single idea: stock what he&apos;d serve at his own table. Three decades on, it&apos;s still family-run, still on the same street, still buying from the same suppliers.
              </p>
              <p>
                People come back summer after summer for the Lesvos honey, the sheep&apos;s-milk yoghurt, the PDO Ladotyri and the local olive oil.
              </p>
              <p>
                There&apos;s also wine from the mainland, ouzo and tsipouro from island distilleries, and retsina for the long lunches.
              </p>
              <p className="text-foreground font-medium">
                Family owned and run, every day, for more than thirty years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
