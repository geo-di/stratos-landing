import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-earth px-5">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.28em] text-primary font-medium">Error 404</span>
        <h1 className="font-display text-6xl md:text-8xl text-foreground mt-4 mb-4">
          Not found.
        </h1>
        <p className="text-lg text-muted-foreground mb-6">This page took a wrong turn on the way to the shop.</p>
        <a href="/" className="text-primary font-medium hover:underline">
          Return to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
