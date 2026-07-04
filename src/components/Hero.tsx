import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, Wheat, Waves, Sun } from "lucide-react";

const Hero = () => {
  const handleVisitStore = () => {
    window.open('https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296', '_blank');
  };

  return (
    <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-5 sm:px-8">
      <div className="absolute inset-0 bg-gradient-earth -z-10" />
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="h-px w-8 bg-primary/40" />
          <span className="text-xs uppercase tracking-[0.28em] text-primary font-medium">
            Anaxos · Lesvos · Est. 1990s
          </span>
          <span className="h-px w-8 bg-primary/40" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-center text-foreground text-balance leading-[0.95] mb-6">
          A little market
          <br />
          <span className="italic text-primary">by the Aegean.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-pretty px-4">
          Thirty summers of golden olive oil, sheep&apos;s-milk yoghurt, sun-dried herbs and
          quiet Greek hospitality — fifty steps from the shore.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 px-4">
          <Button
            size="lg"
            onClick={handleVisitStore}
            className="w-full sm:w-64 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated text-base"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Find us on the map
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-64 rounded-full border-foreground/20 bg-background/60 backdrop-blur hover:bg-background text-foreground text-base"
          >
            See what&apos;s on the shelf
          </Button>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(120px,auto)]">
          <div className="bento-card col-span-6 md:col-span-5 md:row-span-2 p-8 bg-gradient-warm text-primary-foreground grain">
            <Wheat className="h-8 w-8 mb-6 opacity-90" />
            <p className="font-display text-3xl md:text-4xl leading-tight mb-3 text-balance">
              &ldquo;Everything on our shelves has a name and a hillside.&rdquo;
            </p>
            <p className="text-sm opacity-85">— Stratos, since the &apos;90s</p>
          </div>

          <div className="bento-card col-span-3 md:col-span-4 p-6">
            <Sun className="h-6 w-6 text-primary mb-3" />
            <div className="font-display text-4xl md:text-5xl text-foreground">30+</div>
            <div className="text-sm text-muted-foreground mt-1">summers in Anaxos</div>
          </div>

          <div className="bento-card col-span-3 md:col-span-3 p-6 bg-accent/15">
            <Waves className="h-6 w-6 text-olive mb-3" />
            <div className="font-display text-2xl md:text-3xl text-foreground leading-tight">50m</div>
            <div className="text-sm text-muted-foreground mt-1">from the beach</div>
          </div>

          <div className="bento-card col-span-6 md:col-span-4 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">On the shelf today</span>
            </div>
            <p className="font-display text-xl text-foreground leading-snug">
              Ladotyri PDO, sheep&apos;s yoghurt, Kalamata olives, Stratos&apos; own olive oil.
            </p>
          </div>

          <div className="bento-card col-span-6 md:col-span-3 p-6 bg-olive text-olive-foreground">
            <div className="text-xs uppercase tracking-widest opacity-80 mb-2">Parking</div>
            <p className="font-display text-2xl leading-tight">Free, right at the door.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
