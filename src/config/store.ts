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
 * Open/closed against the published hours. Reads the clock, so call it only
 * after mount — never during render, or prerendered HTML won't match hydration.
 */
export const getOpenStatus = (now: Date = new Date()): OpenStatus => {
  const { day, time } = athensNow(now);
  const today = hoursFor(day);
  if (!today) return { isOpen: false, label: "See opening hours" };

  if (time >= today.opens && time < today.closes) {
    return { isOpen: true, label: `Open now · until ${displayTime(today.closes)}` };
  }
  if (time < today.opens) {
    return { isOpen: false, label: `Closed · opens ${displayTime(today.opens)}` };
  }
  const tomorrow = WEEKDAYS[(WEEKDAYS.indexOf(day as (typeof WEEKDAYS)[number]) + 1) % 7];
  return { isOpen: false, label: `Closed · opens tomorrow ${displayTime(hoursFor(tomorrow).opens)}` };
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
