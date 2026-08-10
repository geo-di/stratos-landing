// Turns the built SPA shell into real HTML pages.
//
// Googlebot was fetching a 1.5 KB document with an empty <div id="root"> and
// nothing to index. This runs after both Vite builds: it imports the SSR bundle,
// renders each route to markup, and writes a static file per route with that
// route's own title, description, canonical and social tags baked into the head.
//
// The client hydrates whatever is already in #root (see src/main.tsx), so the
// pages stay fully interactive.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SSR_ENTRY = resolve(ROOT, "dist-ssr/entry-server.js");

const { render, SITE_ROUTES, ROUTE_META, canonicalUrl, storeJsonLd } = await import(
  pathToFileURL(SSR_ENTRY).href
);

const escapeAttr = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Rewrites an existing tag's content attribute; appends the tag if it's missing. */
const setMeta = (html, key, name, content) => {
  const pattern = new RegExp(`(<meta\\s+${key}="${name}"\\s+content=")[^"]*(")`);
  const value = escapeAttr(content);

  if (pattern.test(html)) return html.replace(pattern, `$1${value}$2`);
  return html.replace(
    "</head>",
    `    <meta ${key}="${name}" content="${value}">\n</head>`
  );
};

const setTitle = (html, title) =>
  html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);

const setCanonical = (html, href) =>
  html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${escapeAttr(href)}$2`
  );

/** `<` is escaped so a value can never close the script element early. */
const addJsonLd = (html, data) =>
  html.replace(
    "</head>",
    `    <script type="application/ld+json">${JSON.stringify(data).replace(
      /</g,
      "\\u003c"
    )}</script>\n</head>`
  );

const shell = readFileSync(resolve(DIST, "index.html"), "utf8");

for (const route of SITE_ROUTES) {
  const { title, description } = ROUTE_META[route];
  const href = canonicalUrl(route);

  let html = setTitle(shell, title);
  html = setCanonical(html, href);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:url", href);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);

  // Only the homepage carries the storefront markup; repeating it on /gallery
  // and /privacy would just be duplicate entity data.
  if (route === "/") html = addJsonLd(html, storeJsonLd);

  // data-prerendered records which route this markup belongs to. main.tsx only
  // hydrates when it matches the path actually being served, so markup served at
  // the wrong URL degrades to a clean client render instead of a hydration error.
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="${route}">${render(route)}</div>`
  );

  const output =
    route === "/"
      ? resolve(DIST, "index.html")
      : resolve(DIST, route.slice(1), "index.html");

  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, html);
  console.log(`prerender: ${route} -> ${output.replace(ROOT, ".")}`);
}

// Vercel serves 404.html for anything that matches no file, with a real HTTP 404.
// The vite plugin copies it from the shell before this script runs, so it still
// carries the homepage's title and canonical — strip the canonical and mark it
// noindex so a 404 can never point crawlers at the homepage as its canonical.
const notFound = readFileSync(resolve(DIST, "404.html"), "utf8")
  .replace(/\s*<link rel="canonical" href="[^"]*">/, "")
  .replace(
    /<meta name="robots" content="[^"]*">/,
    '<meta name="robots" content="noindex, follow">'
  )
  .replace(/<title>[^<]*<\/title>/, "<title>Page not found — Stratos Market</title>");

writeFileSync(resolve(DIST, "404.html"), notFound);
console.log("prerender: 404.html marked noindex");
