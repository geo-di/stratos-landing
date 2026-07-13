import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getConsent,
  setConsent,
  initAnalytics,
  trackPageView,
  disableAnalytics,
  OPEN_CONSENT_EVENT,
} from "@/lib/analytics";

const CookieConsent = () => {
  const [visible, setVisible] = useState(() => getConsent() === null);

  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setConsent("granted");
    setVisible(false);
    initAnalytics();
    trackPageView(window.location.pathname + window.location.search);
  };

  const handleDecline = () => {
    disableAnalytics();
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-md z-50 rounded-2xl border border-border/60 bg-background/95 backdrop-blur shadow-elevated p-5">
      <p className="text-sm text-muted-foreground mb-4 text-pretty leading-relaxed">
        We use cookies for anonymous visit statistics (Google Analytics) to
        understand how people find our little shop. No ads, no tracking across
        other sites. See our{" "}
        <a href="/privacy" className="underline hover:text-primary">
          privacy note
        </a>
        .
      </p>
      <div className="flex gap-3">
        <Button
          size="sm"
          onClick={handleAccept}
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleDecline}
          className="rounded-full border-foreground/20 hover:bg-muted text-foreground"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
