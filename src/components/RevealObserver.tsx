import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reveals `[data-reveal]` elements the first time they scroll into view, then
 * stops watching them — re-animating on every scroll-by fights the reader.
 * Styling lives in index.css; this only flips `data-visible`.
 *
 * A MutationObserver picks up elements that mount later (reviews arriving
 * from the Places API, variant swaps), so nothing stays hidden.
 *
 * `data-reveal="late"` waits until the element is well into the viewport
 * (top past 60% of the screen) — for set pieces like the notebook opening,
 * which would otherwise play while only their top edge is on screen.
 */
const RevealObserver = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const revealOnce = (rootMargin: string) => {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }),
        { rootMargin }
      );
      return observer;
    };

    const io = revealOnce("0px 0px -10% 0px");
    const ioLate = revealOnce("0px 0px -40% 0px");

    const watch = (root: ParentNode) =>
      root
        .querySelectorAll("[data-reveal]:not([data-visible])")
        .forEach((el) => (el.getAttribute("data-reveal") === "late" ? ioLate : io).observe(el));

    watch(document);
    const mo = new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length > 0)) watch(document);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      ioLate.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
};

export default RevealObserver;
