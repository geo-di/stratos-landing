import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Images, MapPin, Store } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { STORE_MAPS_URL } from "@/config/store";

const suggestions = [
  {
    to: "/",
    icon: Store,
    title: "The shop",
    blurb: "Provisions, our story, and where to find us.",
  },
  {
    to: "/gallery",
    icon: Images,
    title: "Gallery",
    blurb: "Pictures from the shelves and the village.",
  },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // The SPA serves index.html for unknown paths, so keep this page out of the index.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);

    const previousTitle = document.title;
    document.title = "Page not found · Stratos Market Lesvos";

    return () => {
      document.head.removeChild(meta);
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-earth flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.28em] text-primary font-medium">
            Error 404
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-foreground mt-4 mb-5 leading-[1.05] text-balance">
            This page took a wrong turn.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            We couldn&apos;t find{" "}
            <code className="text-base text-foreground break-all">{location.pathname}</code>.
            It may have moved, or the link that brought you here was mistyped.
            Everything else is still where you left it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Button
              asChild
              className="h-auto rounded-full bg-primary hover:bg-primary-deep text-primary-foreground text-[13px] font-bold px-[22px] py-[13px]"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full text-[13px] font-bold px-[22px] py-[13px]"
            >
              <a href={STORE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" />
                Come visit
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14 max-w-2xl">
          {suggestions.map(({ to, icon: Icon, title, blurb }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-3xl border border-border bg-background/60 p-6 hover:border-primary transition-colors"
            >
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl text-foreground mt-3 group-hover:text-primary transition-colors">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                {blurb}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
