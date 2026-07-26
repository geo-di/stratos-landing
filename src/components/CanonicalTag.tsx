import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, isKnownRoute } from "@/config/site";

const CANONICAL = "link[rel='canonical']";
const OG_URL = "meta[property='og:url']";

const upsert = (selector: string, attribute: string, value: string) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement(selector.startsWith("link") ? "link" : "meta");
    if (selector.startsWith("link")) tag.setAttribute("rel", "canonical");
    else tag.setAttribute("property", "og:url");
    document.head.appendChild(tag);
  }

  tag.setAttribute(attribute, value);
};

/**
 * Points every real route at its canonical URL on the production domain, so
 * preview deploys and www/apex variants don't compete with the live pages.
 * Unknown paths get no canonical — NotFound marks them noindex instead.
 */
const CanonicalTag = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isKnownRoute(pathname)) {
      document.head.querySelector(CANONICAL)?.remove();
      document.head.querySelector(OG_URL)?.remove();
      return;
    }

    const href = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    upsert(CANONICAL, "href", href);
    upsert(OG_URL, "content", href);
  }, [pathname]);

  return null;
};

export default CanonicalTag;
