import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
    window.open('https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296', '_blank');
  };

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'Provisions', id: 'products' },
    { label: 'Our Story', id: 'about' },
    { label: 'Guests', id: 'reviews' },
    { label: 'Find Us', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="h-9 w-9 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-soft">
              <span className="font-display text-xl text-primary-foreground leading-none">S</span>
            </span>
            <span className="font-display text-2xl text-foreground tracking-tight">Stratos</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/gallery"
              className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Gallery
            </Link>
            <Button
              onClick={handleVisitStore}
              className="ml-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft px-5"
            >
              Come Visit
            </Button>
          </div>

          <button
            className="md:hidden text-foreground p-2 rounded-full hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-border/60">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToSection(l.id)}
                  className="text-left px-4 py-3 rounded-2xl text-foreground hover:bg-muted transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Link
                to="/gallery"
                className="text-left px-4 py-3 rounded-2xl text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Button
                onClick={handleVisitStore}
                className="mt-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
