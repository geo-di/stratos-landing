// Regenerates public/sitemap.xml, dating each URL from the last commit that
// touched the files behind it. Runs as `prebuild`.
//
// If git history isn't usable (no repo, or a shallow clone like Vercel's build
// checkout) every route would collapse onto the same bogus date, so we leave the
// committed sitemap alone instead of overwriting it with worse data.

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Keep in sync with SITE_URL in src/config/site.ts.
const SITE_URL = "https://stratosmarket.com";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = resolve(ROOT, "public/sitemap.xml");

const ROUTES = [
  {
    path: "/",
    changefreq: "monthly",
    priority: "1.0",
    sources: [
      "src/pages/Index.tsx",
      "src/components/Hero.tsx",
      "src/components/ProductShowcase.tsx",
      "src/components/AboutSection.tsx",
      "src/components/ReviewsSection.tsx",
      "src/components/ContactSection.tsx",
      "src/components/Navigation.tsx",
      "src/components/Footer.tsx",
      "src/config/store.ts",
    ],
  },
  {
    path: "/gallery",
    changefreq: "monthly",
    priority: "0.8",
    sources: [
      "src/pages/Gallery.tsx",
      "src/config/gallery.ts",
      "src/hooks/useDriveImages.ts",
    ],
  },
  {
    path: "/privacy",
    changefreq: "yearly",
    priority: "0.3",
    sources: ["src/pages/Privacy.tsx", "src/components/CookieConsent.tsx"],
  },
];

const git = (args) =>
  execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

const today = () => new Date().toISOString().slice(0, 10);

/** Last commit date for a set of files, or today if any of them are dirty. */
const lastModified = (sources) => {
  if (git(["status", "--porcelain", "--", ...sources])) return today();
  return git(["log", "-1", "--format=%cs", "--", ...sources]) || today();
};

const build = () =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...ROUTES.map(({ path, changefreq, priority, sources }) =>
      [
        "  <url>",
        `    <loc>${SITE_URL}${path}</loc>`,
        `    <lastmod>${lastModified(sources)}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n")
    ),
    "</urlset>",
    "",
  ].join("\n");

try {
  if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
    console.log("sitemap: shallow git clone, keeping the committed sitemap.xml");
    process.exit(0);
  }

  writeFileSync(OUTPUT, build());
  console.log(`sitemap: wrote ${ROUTES.length} URLs to public/sitemap.xml`);
} catch (error) {
  console.log(`sitemap: skipped (${error.message.split("\n")[0]})`);
}
