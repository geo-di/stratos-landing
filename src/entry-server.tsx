// SSR entry used only at build time. `vite build --ssr` compiles this to
// dist-ssr/entry-server.js, and scripts/prerender.mjs imports it to turn each
// route into static HTML. Nothing here ships to the browser.

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

/** Renders one route's markup for injection into the <div id="root"> shell. */
export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

// Re-exported so the prerender script reads route metadata from the same source
// the app does, rather than keeping a second copy in sync.
export { SITE_ROUTES, ROUTE_META, canonicalUrl, normalizePath } from "@/config/site";
export { storeJsonLd } from "@/config/store";
