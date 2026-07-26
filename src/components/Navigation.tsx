import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { STORE_MAPS_URL } from "@/config/store";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  const handleVisitStore = () => {
    window.open(STORE_MAPS_URL, '_blank', 'noopener,noreferrer');
  };

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'Provisions', id: 'products' },
    { label: 'Our Story', id: 'about' },
    { label: 'Guests', id: 'reviews' },
    { label: 'Find Us', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="flex justify-between items-center h-[76px]">
          <Link to="/" className="flex items-center gap-3">
            <img src="/lesvos-logo-optionb.svg" alt="Lesvos island" className="h-[26px] w-auto" />
            <span className="font-display text-2xl sm:text-[26px] text-primary leading-none">
              Stratos Market
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="px-3.5 py-2 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/gallery"
              className="px-3.5 py-2 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            <Button
              onClick={handleVisitStore}
              className="ml-2.5 h-auto rounded-full bg-primary hover:bg-primary-deep text-primary-foreground text-[13px] font-bold px-[22px] py-[11px]"
            >
              Come Visit
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground p-2 rounded-full hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-border">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToSection(l.id)}
                  className="text-left px-4 py-3 rounded-2xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Link
                to="/gallery"
                className="text-left px-4 py-3 rounded-2xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Button
                onClick={handleVisitStore}
                className="mt-2 rounded-full bg-primary hover:bg-primary-deep text-primary-foreground font-bold"
              >
                Come Visit
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
