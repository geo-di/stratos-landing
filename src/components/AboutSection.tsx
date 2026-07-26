const AboutSection = () => {
  return (
    <section id="about" className="bg-ultramarine text-ultramarine-foreground py-20 md:py-28 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
        <div>
          <div className="eyebrow text-accent mb-5">Our story</div>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,60px)] mb-7">
            A family shop, since the 1990s
          </h2>
          <div className="flex flex-col gap-4 text-base leading-[1.7] text-ultramarine-foreground/80 text-pretty">
            <p>
              In his twenties, Stratos opened a corner shop in Anaxos with a single idea: stock what
              he&apos;d serve at his own table. Three decades on, it&apos;s still family-run, still on
              the same street, still buying from the same suppliers.
            </p>
            <p>
              People come back summer after summer for the Lesvos honey, the sheep&apos;s-milk
              yoghurt, the PDO Ladotyri and the local olive oil.
            </p>
            <p>
              There&apos;s also wine from the mainland, ouzo and tsipouro from island distilleries,
              and retsina for the long lunches.
            </p>
          </div>
        </div>

        <div>
          <p className="font-display font-bold text-[clamp(2rem,4vw,44px)] leading-none border-l-[5px] border-accent pl-7 m-0">
            Family owned &amp; run, every day, for more than thirty years.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
