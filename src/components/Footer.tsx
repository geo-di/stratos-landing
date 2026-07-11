import { MapPin, Phone, Sun } from "lucide-react";
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL } from "@/config/store";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-3xl">Stratos Market</span>
            </div>
            <p className="text-background/70 max-w-md leading-relaxed">
              A family shop in Anaxos, Lesvos — three decades of small, careful things chosen from island growers, shepherds and distillers.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm text-background/60">
              <Sun className="h-4 w-4 text-primary" />
              Open every day of the season.
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.28em] text-background/50 mb-4">Wander</h3>
            <ul className="space-y-2.5 text-background/80">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Provisions</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#reviews" className="hover:text-primary transition-colors">Guest Notes</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Find Us</a></li>
              <li><a href="/gallery" className="hover:text-primary transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.28em] text-background/50 mb-4">Come Say Hello</h3>
            <div className="space-y-3 text-background/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p>Stratos Market</p>
                  <p className="text-background/60 text-sm">Anaxos, Lesvos · North Aegean, Greece</p>
                </div>
              </div>
              <a href={`tel:${STORE_PHONE_TEL}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                {STORE_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-14 pt-8 flex flex-col md:flex-row justify-between gap-3 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Stratos Market · Anaxos, Lesvos.</p>
          <p>Family run since the 1990s.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
