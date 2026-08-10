import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalUrl, isKnownRoute, metaForRoute } from "@/config/site";

/** Creates the tag on first use, then just updates it on later navigations. */
const upsertMeta = (key: "name" | "property", value: string, content: string) => {
  const selector = `meta[${key}='${value}']`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(key, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let tag = document.head.querySelector("link[rel='canonical']");

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const removeTags = () => {
  document.head.querySelector("link[rel='canonical']")?.remove();
  document.head.querySelector("meta[property='og:url']")?.remove();
};

/**
 * Keeps the head in step with the route during client-side navigation: each page
 * gets its own title and description instead of inheriting the homepage's, and
 * canonical/og:url point at the production www URL so preview deploys and the
 * apex variant don't compete with the live pages.
 *
 * The prerendered HTML already carries these tags for the crawler
 * (scripts/prerender.mjs) — this is what keeps them correct after the first
 * in-app navigation. Unknown paths get no canonical; NotFound marks them noindex.
 */
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isKnownRoute(pathname)) {
      removeTags();
      return;
    }

    const { title, description } = metaForRoute(pathname);
    const href = canonicalUrl(pathname);

    document.title = title;
    upsertCanonical(href);
    upsertMeta("property", "og:url", href);
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [pathname]);

  return null;
};

export default RouteMeta;
