import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL } from "@/config/store";
import { openConsentBanner } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="font-display text-[34px] text-background leading-none">Stratos Market</span>
            <p className="text-background/70 max-w-[380px] leading-[1.7] mt-4">
              A family shop in Anaxos, Lesvos — three decades of small, careful things from island
              growers, shepherds and distillers.
            </p>
            <div className="font-display font-bold italic normal-case text-[22px] text-accent mt-5">
              ...your best choice!
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-background/50 mb-4">
              Wander
            </h3>
            <ul className="flex flex-col gap-2.5 text-[15px] text-background/80">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Provisions</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#reviews" className="hover:text-accent transition-colors">Guest Notes</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Find Us</a></li>
              <li><Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-background/50 mb-4">
              Come Say Hello
            </h3>
            <div className="flex flex-col gap-3 text-background/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p>Stratos Market</p>
                  <p className="text-background/60 text-sm">Anaxos, Lesvos · North Aegean, Greece</p>
                </div>
              </div>
              <a href={`tel:${STORE_PHONE_TEL}`} className="flex items-center gap-3 hover:text-accent transition-colors">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                {STORE_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-14 pt-8 flex flex-col md:flex-row justify-between gap-3 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Stratos Market · Anaxos, Lesvos.</p>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <p>Cookies are used only for anonymous visit statistics.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-accent transition-colors underline underline-offset-4">
                Privacy &amp; Cookies
              </Link>
              <button
                onClick={openConsentBanner}
                className="hover:text-accent transition-colors underline underline-offset-4"
              >
                Cookie settings
              </button>
            </div>
          </div>
          <p>Family run since the 1990s.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
