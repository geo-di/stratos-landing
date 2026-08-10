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
const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "21:30" },
  { days: ["Saturday"], opens: "08:00", closes: "22:00" },
  { days: ["Sunday"], opens: "09:00", closes: "20:00" },
];

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
