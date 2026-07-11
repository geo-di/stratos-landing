import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { STORE_MAPS_URL } from "@/config/store";

const Hero = () => {
  const handleVisitStore = () => {
    window.open(STORE_MAPS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-5 sm:px-8">
      <div className="absolute inset-0 bg-gradient-earth -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="lg:col-span-6">
            <h1 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05] mb-5 text-balance">
              Stratos Market, Anaxos.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 text-pretty leading-relaxed">
              A small family shop by the beach in Anaxos, Lesvos, running since the 1990s.
              We sell olive oil, cheese, wine, ouzo and the everyday things people forget to pack —
              fifty metres from the sand, with free parking at the door.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleVisitStore}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated text-base"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Find us on the map
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border-foreground/20 bg-background/60 backdrop-blur hover:bg-background text-foreground text-base"
              >
                See what&apos;s on the shelf
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              Open every day · Anaxos, Lesvos, North Aegean
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-border/60 shadow-soft aspect-[4/3] bg-muted flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Placeholder — replace with a real photo of the shop"
                className="w-1/3 h-1/3 object-contain opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
