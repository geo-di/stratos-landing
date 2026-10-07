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
  // Starts hidden and is revealed in the effect below: reading localStorage during
  // render would throw while prerendering, and would mismatch on hydration even
  // if it didn't, since the server has no way to know this visitor's choice.
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);

    const reopen = () => {
      setLeaving(false);
      setVisible(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!visible) return null;

  // Plays the exit (same edge it entered from) before unmounting. Matches the
  // 250ms leave duration on .consent-card[data-leaving] in index.css.
  const dismiss = () => {
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 250);
  };

  const handleAccept = () => {
    setConsent("granted");
    dismiss();
    initAnalytics();
    trackPageView(window.location.pathname + window.location.search);
  };

  const handleDecline = () => {
    disableAnalytics();
    dismiss();
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      data-leaving={leaving || undefined}
      className="consent-card fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-md z-50 rounded-2xl border border-border/60 bg-background/95 backdrop-blur shadow-elevated p-5"
    >
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
          className="rounded-full bg-primary hover:bg-primary-deep text-primary-foreground font-bold px-5"
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleDecline}
          className="rounded-full border-foreground/20 bg-transparent hover:bg-muted text-foreground font-bold px-5"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
