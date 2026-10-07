import { useEffect, useRef, type CSSProperties } from "react";
import Stamp from "@/components/Stamp";

// Island outline from public/lesvos-logo-optionb.svg, inlined so it can take currentColor.
const LESVOS_PATH =
  "M 15.2 75.6 L 26.8 89.1 L 45.4 97.3 L 48.5 104.9 L 58.5 103.4 L 80.7 111.2 L 86.1 102.3 L 88.6 100.8 L 90.4 104.7 L 93.3 93.1 L 101.7 86.4 L 105.3 72.8 L 125.9 69.4 L 136.1 73.4 L 139.6 78 L 135.8 87.4 L 110.8 97.3 L 101.9 108.3 L 95.8 111 L 91.4 107.2 L 83 113.5 L 92.5 119.7 L 105.5 139.3 L 110.5 134.7 L 124 135.7 L 148.3 149.1 L 167.2 154 L 192 148.9 L 195.5 151.4 L 198.1 147.7 L 199.2 151.1 L 206.1 145.1 L 206.7 139.6 L 204.2 141 L 202.8 133.6 L 191.9 120 L 185.2 117.3 L 178.7 105.7 L 189.8 99.6 L 202.1 112.5 L 203.4 119.5 L 197.5 123.9 L 202.8 125.3 L 200 127.8 L 204.7 136.7 L 224.8 135.3 L 224.7 125.6 L 209.8 107.7 L 212.5 102.3 L 209 101.9 L 207.3 93.2 L 202.3 91.8 L 205.2 83 L 194.4 78.6 L 187.8 63.3 L 162.5 47.7 L 162.1 43.1 L 174.2 25.6 L 155.9 20.9 L 158.7 10.3 L 151.9 6 L 145.3 11.9 L 109.6 9.8 L 104.8 12.8 L 108.9 24.6 L 106.2 28.5 L 91.8 35.2 L 87.5 31.8 L 80 38.6 L 70.5 37.9 L 70.4 41.2 L 65.4 39.8 L 59.2 44.7 L 52.2 42.2 L 47.3 46.1 L 38.8 43.5 L 39.3 38.9 L 34.6 39.1 L 34.8 43 L 21.7 52.7 L 23.4 57.5 L 18.9 62 L 22.1 63 L 20.9 78 Z";

/** The shop's story copy, unchanged. */
const STORY = [
  "In his twenties, Stratos opened a corner shop in Anaxos with a single idea: stock what he'd serve at his own table. Three decades on, it's still family-run, still on the same street, still buying from the same suppliers.",
  "People come back summer after summer for the Lesvos honey, the sheep's-milk yoghurt, the PDO Ladotyri and the local olive oil.",
  "There's also wine from the mainland, ouzo and tsipouro from island distilleries, and retsina for the long lunches.",
];

const QUOTE = "Family owned & run, every day, for more than thirty years.";

/**
 * The same story kept as ledger entries. Every entry restates the copy above;
 * the only date anywhere is the one the copy already gives ("the 1990s").
 */
const ENTRIES = [
  {
    when: "The 1990s",
    entry:
      "Stratos, in his twenties, opens a corner shop in Anaxos with a single idea: stock what he'd serve at his own table.",
  },
  { when: "Ever since", entry: "Same street, same suppliers. Still family-run." },
  {
    when: "Every summer",
    entry: "People come back for the Lesvos honey, the sheep's-milk yoghurt, the PDO Ladotyri and the local olive oil.",
  },
  { when: "Long lunches", entry: "Wine from the mainland, ouzo and tsipouro from island distilleries, and retsina." },
  { when: "Today", entry: "Family owned & run, every day, for more than thirty years." },
];

const STATS = [
  { value: "30+", unit: "years", label: "Family run", tilt: "-8deg" },
  { value: "50", unit: "m", label: "From the sand", tilt: "5deg" },
  { value: "7", unit: "days", label: "Open every week", tilt: "-3deg" },
];

/**
 * Reveal delays inside the book wait for it to open: --book-delay is the
 * opening time on the spread layout (index.css) and 0 wherever the book is
 * simply open (stacked pages, reduced motion, no JS).
 */
const afterOpen = (ms: number) =>
  ({ "--reveal-delay": `calc(var(--book-delay, 0ms) + ${ms}ms)` }) as CSSProperties;

/** Cloth cover with the shop's label. Only ever seen while the book is closed. */
const Cover = () => (
  <div className="book-cover grain" aria-hidden="true">
    <div className="absolute inset-4 sm:inset-5 rounded-[6px] border-2 border-primary-foreground/30" />
    <div className="book-strap absolute top-0 bottom-0 w-3.5" />
    {/* Stacked pages make the cover as tall as the whole letter, so on phones
        the label sits near the top, where the reader actually is */}
    <div className="relative h-full flex flex-col items-center justify-start pt-24 lg:justify-center lg:pt-0 gap-6 px-10 text-center">
      <img src="/lesvos-logo-optionb.svg" alt="" className="w-24 h-auto brightness-0 invert opacity-90" />
      <div className="rounded-[4px] bg-background px-7 py-5 shadow-soft">
        <div className="font-display font-black text-primary text-[clamp(2rem,3.4vw,44px)] leading-[0.9]">
          Stratos Market
        </div>
        <div className="font-display font-bold italic normal-case text-ultramarine text-[24px] leading-none mt-2">
          Our story
        </div>
        <div className="eyebrow text-muted-foreground mt-3">Anaxos · since the 1990s</div>
      </div>
    </div>
  </div>
);

/**
 * An open notebook: the letter on the left page, the ledger on the right,
 * the proof points rubber-stamped onto the ledger's totals line.
 *
 * It arrives closed. On the spread layout the left page is the back of the
 * cover, so opening is one leaf swinging about the spine while the book
 * slides from centred to full width; on stacked pages the cover lifts off
 * the first page instead. The choreography lives in index.css (.book-*).
 */
const AboutSection = () => {
  // Once the opening has played, the 3D context is dead weight: mark the book
  // open and index.css flattens it (no perspective, no hidden cover layer).
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onEnd = (e: TransitionEvent) => {
      const t = e.target as HTMLElement;
      if (e.propertyName === "transform" && (t.classList.contains("book-leaf") || t.classList.contains("book-cover"))) {
        wrap.setAttribute("data-open", "");
      }
    };
    wrap.addEventListener("transitionend", onEnd);
    return () => wrap.removeEventListener("transitionend", onEnd);
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-ultramarine py-20 md:py-28 px-5 sm:px-10">
      <svg
        viewBox="0 0 240 160"
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18%] -bottom-[12%] w-[min(1100px,140vw)] text-ultramarine-foreground opacity-[0.06] lg:-right-[8%]"
      >
        <path fill="currentColor" d={LESVOS_PATH} />
      </svg>

      <div className="relative max-w-6xl mx-auto">
        <div className="section-index text-accent justify-center">02 — Our story</div>

        {/* Below lg it's a portrait notebook: one column, capped so it reads
            as a book rather than a banner, with the two pages as separate sheets */}
        <div ref={wrapRef} data-reveal="late" className="book-wrap max-w-[640px] mx-auto lg:max-w-none">
          <div className="book grid grid-cols-1 gap-4 lg:gap-0 lg:grid-cols-2">
            {/* Left page — the letter, printed on the back of the cover */}
            {/* flex + flex-1: when the ledger is the taller page (narrow spreads),
                the letter page stretches to match instead of ending short */}
            <div className="book-leaf flex flex-col">
              <article className="book-page book-page--left letter-paper relative flex-1 px-6 sm:px-10 lg:px-12 pt-10 sm:pt-12 pb-10 lg:pb-12">
                {/* The stamp shares the heading's row, so no width can push text under it */}
                <div className="flex items-start justify-between gap-4 mb-7">
                  <h2 className="font-display text-[clamp(2.1rem,4.2vw,50px)] text-primary m-0 max-w-[14ch] text-balance">
                    A family shop, since the 1990s
                  </h2>
                  <Stamp className="shrink-0 -mt-3 -mr-2 sm:-mr-3 rotate-[5deg]" />
                </div>
                {/* One 32px rhythm, so text rests on the rules */}
                <div className="letter-body flex flex-col gap-[32px] text-[16px] leading-[32px] text-foreground/85 text-pretty">
                  {STORY.map((p) => (
                    <p key={p} className="m-0">
                      {p}
                    </p>
                  ))}
                  <p className="m-0 font-display font-bold italic normal-case text-[26px] leading-[32px] text-ultramarine">
                    {QUOTE}
                  </p>
                  <p className="m-0 text-[15px] text-muted-foreground">— Stratos Market, Anaxos</p>
                </div>
              </article>
              <Cover />
            </div>

            {/* Right page — the ledger */}
            <div className="book-page book-page--right ledger flex flex-col [--date-col:0px] sm:[--date-col:8.5rem]">
              {/* Phones: no columns — each date sits above its entry */}
              <div className="ledger-head hidden sm:grid sm:grid-cols-[8.5rem_1fr] font-display font-black text-[15px] tracking-[0.14em] text-primary">
                <span className="px-4 sm:px-6 py-3">When</span>
                <span className="px-4 sm:px-6 py-3">Entry</span>
              </div>
              {/* The rules are printed on the page and always there; only the
                  writing appears, inked in row by row (.ink in index.css) */}
              <ol className="m-0 p-0 list-none">
                {ENTRIES.map(({ when, entry }, i) => (
                  <li key={when} className="ledger-row grid grid-cols-1 sm:grid-cols-[8.5rem_1fr]">
                    <span className="px-5 sm:px-6 pt-4 pb-0 sm:pb-4 font-display font-bold italic normal-case text-[20px] leading-tight text-ultramarine">
                      <span data-reveal className="ink" style={afterOpen(i * 120)}>
                        {when}
                      </span>
                    </span>
                    <span className="px-5 sm:px-6 pt-1.5 sm:pt-4 pb-4 text-[15px] leading-relaxed text-foreground/85">
                      <span data-reveal className="ink" style={afterOpen(i * 120 + 70)}>
                        {entry}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="ledger-blank flex-1" aria-hidden="true" />
              <div className="ledger-total px-4 sm:px-6 py-7">
                <ul className="m-0 p-0 list-none flex flex-wrap justify-around gap-x-6 gap-y-5">
                  {STATS.map(({ value, unit, label, tilt }, i) => (
                    <li
                      key={label}
                      data-reveal
                      className="rubber-stamp"
                      style={{ ...afterOpen(550 + i * 90), "--tilt": tilt } as CSSProperties}
                    >
                      <span className="block font-display font-black text-[36px] leading-none">
                        {value}
                        <span className="text-[18px] ml-1 uppercase">{unit}</span>
                      </span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] mt-1.5">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
