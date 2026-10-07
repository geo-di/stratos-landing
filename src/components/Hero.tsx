import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { STORE_MAPS_URL } from "@/config/store";
import LivePostmark from "@/components/LivePostmark";
import SignageStrip from "@/components/SignageStrip";
import Stamp from "@/components/Stamp";

/** Inline stagger delay for .fade-up */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Two cards on the table: the shopfront photo face up, and the back of a
 * postcard carrying the message, the shop as the addressee, and a postmark
 * that shows whether we're open right now.
 *
 * Entrance (first load only): the cards are dealt, the message fades in, the
 * stamp lands, then the postmark. All CSS keyframes in index.css, so they run
 * from first paint on the prerendered HTML and need no JS.
 */
const Hero = () => {
  const handleVisitStore = () => {
    window.open(STORE_MAPS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="overflow-x-clip">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Front of a card, face up */}
        <figure className="card-front relative z-0 m-0 w-full md:max-w-[560px] md:mx-auto lg:max-w-none lg:col-span-5 rounded-[6px] bg-card p-3 sm:p-4 pb-12 sm:pb-14 border border-border shadow-elevated">
          <div className="aspect-[4/3] overflow-hidden rounded-[3px]">
            <img
              src="/images/shop.webp"
              alt="The shopfront of Stratos Market in Anaxos, Lesvos, lit up in the evening"
              width={1600}
              height={1198}
              // Lowercase via spread: React 18 doesn't know the camelCase `fetchPriority`
              // prop and drops it with a warning, but passes unknown lowercase
              // attributes straight through to the DOM.
              {...{ fetchpriority: "high" }}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="absolute left-5 bottom-3.5 sm:bottom-4 font-display font-bold italic normal-case text-[24px] sm:text-[26px] leading-none text-ultramarine">
            Greetings from Anaxos!
          </figcaption>
        </figure>

        {/* Back of a card: message | address */}
        {/* Below lg the back just meets the photo card, clear of its caption */}
        <div className="card-back relative z-10 lg:col-span-7 lg:-ml-16 mt-4 md:-mt-3 lg:mt-0 rounded-[6px] bg-card border border-border shadow-elevated p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
            <div className="md:pr-8 md:border-r border-ultramarine/20">
              <p
                className="fade-up m-0 font-display font-bold italic normal-case text-ultramarine text-[clamp(1.75rem,2.8vw,38px)] leading-none"
                style={delay(500)}
              >
                ...your best choice!
              </p>
              <p
                className="fade-up m-0 mt-5 text-[16px] md:text-[17px] text-muted-foreground leading-[1.7] text-pretty"
                style={delay(560)}
              >
                A small family shop by the beach in Anaxos, running since the 1990s. Olive oil, cheese,
                wine, ouzo and the everyday things people forget to pack — fifty metres from the sand,
                with free parking at the door.
              </p>
              <div
                className="fade-up flex flex-col sm:flex-row md:flex-col xl:flex-row gap-3 mt-7"
                style={delay(620)}
              >
                <Button
                  onClick={handleVisitStore}
                  className="h-auto rounded-full bg-primary hover:bg-primary-deep text-primary-foreground text-base font-bold px-7 py-[15px]"
                >
                  <MapPin className="mr-1 h-4 w-4" />
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

            {/* Phones read the address side first, so the name is on the first screen */}
            <div className="order-first md:order-none md:pl-8 flex flex-col">
              <div className="flex justify-between items-start gap-4 min-h-[118px]">
                <LivePostmark className="postmark-in mt-2" />
                <Stamp className="stamp-drop rotate-[4deg]" />
              </div>

              {/* The shop is the addressee */}
              <div className="mt-6">
                <h1 className="m-0 font-display font-black text-primary leading-[0.9] text-[clamp(3rem,6vw,88px)] pb-3 border-b border-dashed border-ultramarine/30">
                  Stratos Market
                </h1>
                <address className="not-italic">
                  <div className="font-display font-bold text-[22px] md:text-[26px] text-ultramarine leading-none py-3 border-b border-dashed border-ultramarine/30">
                    Anaxos, Lesvos
                  </div>
                  <div className="font-display font-bold text-[22px] md:text-[26px] text-ultramarine leading-none py-3 border-b border-dashed border-ultramarine/30">
                    North Aegean · GR
                  </div>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignageStrip />
    </section>
  );
};

export default Hero;
