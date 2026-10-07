import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { STORE_MAPS_URL } from "@/config/store";

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Provisions', id: 'products' },
  { label: 'Our Story', id: 'about' },
  { label: 'Guests', id: 'reviews' },
  { label: 'Find Us', id: 'contact' },
];

const desktopLink =
  "relative px-3.5 py-2 text-[13px] font-semibold hover:text-primary transition-colors " +
  "after:absolute after:left-3.5 after:right-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full " +
  "after:bg-primary after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:[transition-timing-function:ease] " +
  "hover:after:scale-x-100";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  // Section to scroll to once the mobile sheet has finished closing — the sheet
  // locks page scroll while open, so scrolling earlier would be swallowed.
  const pendingSection = useRef<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: a section counts as current while it crosses a thin band
  // just below the nav, so exactly one link is lit at a time.
  useEffect(() => {
    if (!isHomePage) {
      setActiveId(null);
      return;
    }
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-90px 0px -65% 0px' }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

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

  const mobileRow =
    "flex items-center justify-between rounded-2xl px-4 py-3 font-display text-[34px] leading-none " +
    "transition-[transform,background-color] duration-150 ease-out active:scale-[0.98] hover:bg-muted";

  return (
    <nav
      data-scrolled={isScrolled || undefined}
      className="nav-material sticky top-0 z-50"
    >
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
                aria-current={activeId === l.id ? 'true' : undefined}
                className={`${desktopLink} ${activeId === l.id ? 'text-primary after:scale-x-100' : 'text-muted-foreground'}`}
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/gallery"
              aria-current={location.pathname === '/gallery' ? 'page' : undefined}
              className={`${desktopLink} ${location.pathname === '/gallery' ? 'text-primary after:scale-x-100' : 'text-muted-foreground'}`}
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

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden text-foreground p-2 rounded-full hover:bg-muted transition-[transform,background-color] duration-150 ease-out active:scale-[0.97]"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="lg:hidden rounded-b-[28px] border-border bg-background px-5 pt-5 pb-7 ease-drawer data-[state=open]:duration-300 data-[state=closed]:duration-200"
              onCloseAutoFocus={(e) => {
                const id = pendingSection.current;
                if (!id) return;
                pendingSection.current = null;
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center gap-3 h-9 mb-4">
                <img src="/lesvos-logo-optionb.svg" alt="" aria-hidden="true" className="h-[22px] w-auto" />
                <span className="font-display text-xl text-primary leading-none">Stratos Market</span>
              </div>
              <div className="flex flex-col">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      if (isHomePage) {
                        pendingSection.current = l.id;
                        setIsMenuOpen(false);
                      } else {
                        window.location.href = `/#${l.id}`;
                      }
                    }}
                    className={`${mobileRow} text-left ${activeId === l.id ? 'text-primary' : 'text-foreground'}`}
                  >
                    {l.label}
                    {activeId === l.id && <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />}
                  </button>
                ))}
                <Link
                  to="/gallery"
                  className={`${mobileRow} ${location.pathname === '/gallery' ? 'text-primary' : 'text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </div>
              <Button
                onClick={handleVisitStore}
                className="mt-5 w-full h-auto py-4 rounded-full bg-primary hover:bg-primary-deep text-primary-foreground text-base font-bold"
              >
                Come Visit
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
