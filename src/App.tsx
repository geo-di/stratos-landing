
import { lazy, Suspense, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import AnalyticsTracker from "./components/AnalyticsTracker";
import RouteMeta from "./components/RouteMeta";
import CookieConsent from "./components/CookieConsent";
import RevealObserver from "./components/RevealObserver";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Fixture switch for stress-testing the Google-data UI (`?data=`), dev only.
const DataToggle = import.meta.env.DEV ? lazy(() => import("./dev/DataToggle")) : null;

/**
 * Router-agnostic on purpose: main.tsx wraps this in BrowserRouter, and
 * entry-server.tsx wraps it in StaticRouter so the build can prerender each
 * route to static HTML.
 */
const App = () => {
  // Per-instance so prerendering one route can't leak cache into the next.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnalyticsTracker />
        <RouteMeta />
        <RevealObserver />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        {DataToggle && (
          <Suspense fallback={null}>
            <DataToggle />
          </Suspense>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
