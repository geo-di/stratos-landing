// Shared store details used across Navigation, Hero, Contact, Reviews and Footer.

import { SITE_OG_IMAGE, SITE_URL } from "@/config/site";

export const STORE_NAME = "Stratos Market";
export const STORE_ADDRESS = "Stratos Market, Anaxos, Lesvos, Greece";

export const STORE_MAPS_URL =
  "https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296";

export const STORE_PLACE_ID = "ChIJyWRl2reQuhQR31Cno53zvaA";

export const STORE_PHONE_DISPLAY = "+30 22530 92421";
export const STORE_PHONE_TEL = "+302253092421";

/** Coordinates as encoded in STORE_MAPS_URL (the !3d / !4d pair). */
export const STORE_LATITUDE = 39.3161481;
export const STORE_LONGITUDE = 26.1455248;

/**
 * Opening hours in schema.org form. Mirrors the fallback table in
 * ContactSection — that component prefers live hours from the Places API, but
 * structured data has to be static, so this is the published baseline.
 */
export const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "21:30" },
  { days: ["Saturday"], opens: "08:00", closes: "22:00" },
  { days: ["Sunday"], opens: "09:00", closes: "20:00" },
];

export const WEEKDAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
] as const;

/** "08:00" → "8:00", matching how hours read on the shop door. */
const displayTime = (hhmm: string) => hhmm.replace(/^0/, "");

const hoursFor = (day: string) => OPENING_HOURS.find((h) => h.days.includes(day))!;

/** One row per weekday, Monday first, for the hours table. */
export const HOURS_BY_DAY = WEEKDAYS.map((day) => {
  const { opens, closes } = hoursFor(day);
  return { day, hours: `${displayTime(opens)} – ${displayTime(closes)}` };
});

/** Weekday name and "HH:MM" as the shop sees them, whatever the visitor's timezone. */
export const athensNow = (now: Date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Athens",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: get("weekday"), time: `${get("hour")}:${get("minute")}` };
};

export type OpenStatus = { isOpen: boolean; label: string };

/**
 * A Google Places opening period: day 0 = Sunday … 6 = Saturday, time "HHMM".
 * A period with no `close` is a 24-hour listing.
 */
export type OpeningPeriod = { open: { day: number; time: string }; close?: { day: number; time: string } };

const WEEK_MINUTES = 7 * 24 * 60;
const minutesOf = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(2, 4));
/** "0800" → "8:00", "2300" → "23:00" */
const clockOf = (hhmm: string) => `${Number(hhmm.slice(0, 2))}:${hhmm.slice(2, 4)}`;
/** Google's day numbering, 0 = Sunday */
const GOOGLE_DAYS = ["Sunday", ...WEEKDAYS.slice(0, 6)];

/** The published table as Google-style periods, so both sources share one code path. */
const PUBLISHED_PERIODS: OpeningPeriod[] = WEEKDAYS.map((day, i) => {
  const { opens, closes } = hoursFor(day);
  const googleDay = (i + 1) % 7;
  return {
    open: { day: googleDay, time: opens.replace(":", "") },
    close: { day: googleDay, time: closes.replace(":", "") },
  };
});

/**
 * Open/closed right now, with the "until …" / "opens …" line, from Google's
 * real weekly periods when we have them and the published table otherwise.
 *
 * It deliberately ignores Google's `open_now`: that is a snapshot from when the
 * API answered (and is cached for minutes), so it goes stale across opening and
 * closing times. Recomputing from the periods every minute never does.
 *
 * Reads the clock via `now`, so call it only after mount — never during render,
 * or prerendered HTML won't match hydration.
 */
export const resolveOpenStatus = (now: Date, hours?: { periods?: OpeningPeriod[] } | null): OpenStatus => {
  const periods = hours?.periods?.length ? hours.periods : PUBLISHED_PERIODS;
  if (periods.some((p) => !p.close && p.open.day === 0 && p.open.time === "0000")) {
    return { isOpen: true, label: "Open 24 hours" };
  }

  const { day, time } = athensNow(now);
  const today = (WEEKDAYS.indexOf(day as (typeof WEEKDAYS)[number]) + 1) % 7;
  const nowInWeek = today * 1440 + Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

  const spans = periods
    .filter((p): p is Required<OpeningPeriod> => !!p.close)
    .map((p) => {
      const start = p.open.day * 1440 + minutesOf(p.open.time);
      let end = p.close.day * 1440 + minutesOf(p.close.time);
      if (end <= start) end += WEEK_MINUTES; // runs past Saturday night into Sunday
      return { start, end, period: p };
    });

  const current = spans.find(
    ({ start, end }) => (nowInWeek >= start && nowInWeek < end) || (nowInWeek + WEEK_MINUTES >= start && nowInWeek + WEEK_MINUTES < end)
  );
  if (current) {
    const closes = current.period.close.time === "0000" ? "midnight" : clockOf(current.period.close.time);
    return { isOpen: true, label: `Open now · until ${closes}` };
  }

  // The next opening, measured forward from now around the week
  const next = spans
    .map((s) => ({ ...s, wait: (s.start - nowInWeek + WEEK_MINUTES) % WEEK_MINUTES }))
    .sort((a, b) => a.wait - b.wait)[0];
  if (!next) return { isOpen: false, label: "See opening hours" };

  const daysAhead = (next.period.open.day - today + 7) % 7;
  const when = daysAhead === 0 && next.wait < 1440 ? "" : daysAhead === 1 ? "tomorrow " : `${GOOGLE_DAYS[next.period.open.day]} `;
  return { isOpen: false, label: `Closed · opens ${when}${clockOf(next.period.open.time)}` };
};

/**
 * LocalBusiness markup for the homepage, injected into the prerendered HTML by
 * scripts/prerender.mjs. Deliberately no aggregateRating: the ratings shown on
 * the page come from the Google Places API at runtime, and Google's structured
 * data policy forbids marking up ratings sourced from Google itself.
 */
export const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  "@id": `${SITE_URL}/#store`,
  name: STORE_NAME,
  description:
    "A family-run shop in Anaxos, Lesvos, fifty metres from the beach. Local olive oil, honey, PDO Ladotyri, sheep's-milk yoghurt, wine, ouzo and everyday essentials.",
  url: `${SITE_URL}/`,
  image: SITE_OG_IMAGE,
  telephone: STORE_PHONE_DISPLAY,
  priceRange: "€€",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Anaxos",
    addressLocality: "Anaxos",
    addressRegion: "North Aegean",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: STORE_LATITUDE,
    longitude: STORE_LONGITUDE,
  },
  openingHoursSpecification: OPENING_HOURS.map(({ days, opens, closes }) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  })),
  hasMap: STORE_MAPS_URL,
  sameAs: [STORE_MAPS_URL],
};
