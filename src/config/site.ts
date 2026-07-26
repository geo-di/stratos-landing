// Canonical site identity. Keep SITE_URL in sync with scripts/generate-sitemap.mjs,
// public/robots.txt and the static tags in index.html.

export const SITE_URL = "https://stratosmarket.com";

/** Every real route the app serves. Anything else renders the 404 page. */
export const SITE_ROUTES = ["/", "/gallery", "/privacy"] as const;

export const isKnownRoute = (pathname: string) =>
  SITE_ROUTES.includes(pathname.replace(/(.)\/$/, "$1") as (typeof SITE_ROUTES)[number]);
