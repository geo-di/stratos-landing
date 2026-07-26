import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { STORE_MAPS_URL } from "@/config/store";

const MARQUEE_ITEMS = [
  "Open every day",
  "Free parking at the door",
  "Fifty metres from the sand",
  "Local products since the '90s",
];

const Hero = () => {
  const handleVisitStore = () => {
    window.open(STORE_MAPS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 pt-12 md:pt-[72px]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-6 mb-1">
          <div className="text-[13px] font-bold uppercase tracking-[0.24em] text-ultramarine">
            Anaxos · Lesvos · North Aegean
          </div>
          <div className="font-display font-bold italic text-2xl md:text-3xl text-ultramarine whitespace-nowrap normal-case">
            ...your best choice!
          </div>
        </div>

        <h1 className="font-display font-black text-primary text-[clamp(3.75rem,11.5vw,150px)] leading-[0.9] tracking-[-0.01em] mb-7">
          Stratos<br />Market
        </h1>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-10 pb-10">
          <p className="text-[17px] md:text-[19px] text-muted-foreground max-w-[560px] leading-[1.65] text-pretty">
            A small family shop by the beach in Anaxos, running since the 1990s. Olive oil, cheese,
            wine, ouzo and the everyday things people forget to pack — fifty metres from the sand,
            with free parking at the door.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              onClick={handleVisitStore}
              className="h-auto rounded-full bg-primary hover:bg-primary-deep text-primary-foreground text-base font-bold px-7 py-[15px]"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Find us on the map
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-auto rounded-full border-2 border-ultramarine bg-transparent text-ultramarine hover:bg-ultramarine hover:text-ultramarine-foreground text-base font-bold px-7 py-[15px]"
            >
              See the shelf
            </Button>
          </div>
        </div>
      </div>

      {/* Full-bleed shopfront */}
      <div className="w-full h-[280px] md:h-[420px] lg:h-[520px] overflow-hidden">
        <img
          src="/images/shop.webp"
          alt="Stratos Market, Anaxos"
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Red signage strip */}
      <div className="bg-primary text-primary-foreground py-5 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-2 font-display font-bold text-lg md:text-[22px] tracking-[0.04em]">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-x-6 md:gap-x-10">
              {item}
              {i < MARQUEE_ITEMS.length - 1 && <span className="opacity-50" aria-hidden="true">✦</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
