const ITEMS = [
  "Open every day",
  "Free parking at the door",
  "Fifty metres from the sand",
  "Local products since the '90s",
];

const List = ({ hidden = false }: { hidden?: boolean }) => (
  <ul
    className="flex shrink-0 items-center gap-x-8 md:gap-x-12 pr-8 md:pr-12"
    aria-hidden={hidden || undefined}
  >
    {ITEMS.map((item) => (
      <li key={item} className="flex items-center gap-x-8 md:gap-x-12 whitespace-nowrap">
        {item}
        <span className="opacity-50" aria-hidden="true">✦</span>
      </li>
    ))}
  </ul>
);

/**
 * The red signage strip. Constant motion, so linear; the track holds the list
 * twice and shifts by half for a seamless loop. Under reduced motion the
 * track is swapped for a static wrapped list (index.css), so nothing is cut off.
 */
const SignageStrip = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden grain bg-primary text-primary-foreground py-5 font-display font-bold text-lg md:text-[22px] tracking-[0.04em] ${className}`}
  >
    <div className="marquee-track">
      <List />
      <List hidden />
    </div>
    <ul className="marquee-static flex-wrap justify-center gap-x-6 gap-y-1 px-5" aria-hidden="true">
      {ITEMS.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

export default SignageStrip;
