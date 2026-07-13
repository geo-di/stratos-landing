const GA_MEASUREMENT_ID = "G-YPFN7804DQ";
const CONSENT_KEY = "analytics-consent";

type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentChoice | null {
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setConsent(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_KEY, choice);
}

export const OPEN_CONSENT_EVENT = "open-cookie-consent";

export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

/** Opt out: flag GA as disabled and remove any cookies it already set. */
export function disableAnalytics() {
  setConsent("denied");
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga")) {
      document.cookie = `${name}=;${expiry}`;
      document.cookie = `${name}=;${expiry};domain=.${domain}`;
    }
  }
}

/** Loads gtag.js. Safe to call repeatedly; only runs once and only with consent. */
export function initAnalytics() {
  if (getConsent() !== "granted" || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag requires the Arguments object itself, not a spread copy
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string) {
  if (getConsent() !== "granted") return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
