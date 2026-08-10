// Canonical site identity. Keep SITE_URL in sync with scripts/generate-sitemap.mjs,
// public/robots.txt and the static tags in index.html.
//
// The apex domain 308-redirects to www on Vercel, so www is the canonical host —
// pointing canonicals at the apex made every one of them a redirect.

export const SITE_URL = "https://www.stratosmarket.com";

export const SITE_NAME = "Stratos Market";

/** Absolute URL of the 1200x630 social preview image. */
export const SITE_OG_IMAGE = `${SITE_URL}/images/og-shop.jpg`;

/** Every real route the app serves. Anything else renders the 404 page. */
export const SITE_ROUTES = ["/", "/gallery", "/privacy"] as const;

export type SiteRoute = (typeof SITE_ROUTES)[number];

/** Strips a trailing slash from everything except the root. */
export const normalizePath = (pathname: string) =>
  pathname.replace(/(.)\/$/, "$1");

export const isKnownRoute = (pathname: string) =>
  SITE_ROUTES.includes(normalizePath(pathname) as SiteRoute);

export const canonicalUrl = (pathname: string) =>
  `${SITE_URL}${normalizePath(pathname)}`;

/**
 * Per-route title and description. Every route needs its own, or Google sees
 * three pages carrying identical metadata and treats them as duplicates.
 * Titles stay under ~60 characters and descriptions under ~155 so neither gets
 * truncated in results.
 */
export const ROUTE_META: Record<SiteRoute, { title: string; description: string }> = {
  "/": {
    title: "Stratos Market — Local Shop in Anaxos, Lesvos",
    description:
      "A family-run shop in Anaxos, Lesvos, fifty metres from the beach. Lesvos olive oil, honey, PDO Ladotyri, sheep's-milk yoghurt, wine and ouzo. Open every day.",
  },
  "/gallery": {
    title: "Gallery — Stratos Market, Anaxos, Lesvos",
    description:
      "Photos of Stratos Market in Anaxos, Lesvos — the shopfront by the beach, the shelves, and the local Greek products we stock through the season.",
  },
  "/privacy": {
    title: "Privacy & Cookies — Stratos Market",
    description:
      "How Stratos Market handles cookies and anonymous visit statistics, and how to change your consent at any time. No ads, no cross-site tracking.",
  },
};

export const metaForRoute = (pathname: string) =>
  ROUTE_META[normalizePath(pathname) as SiteRoute];
