/**
 * DEV-ONLY fixtures for useSharedGoogleData (`?data=<name>` under `vite dev`).
 * Never shipped: the only import is behind `import.meta.env.DEV`.
 *
 * These are invented, not real reviews — shaped like the Places API response
 * so the reviews and hours UI can be designed and stress-tested offline.
 */
import type { UseSharedGoogleDataReturn } from "@/hooks/useSharedGoogleData";

/** One Google period on a single day: day 0 = Sunday … 6 = Saturday, "HHMM". */
const period = (day: number, open: string, close: string, closeDay = day) => ({
  open: { day, time: open },
  close: { day: closeDay, time: close },
});

const ENGLISH_HOURS = {
  open_now: true,
  // Matches the weekday_text below (and the published table)
  periods: [
    ...[1, 2, 3, 4, 5].map((d) => period(d, "0800", "2130")),
    period(6, "0800", "2200"),
    period(0, "0900", "2000"),
  ],
  weekday_text: [
    "Monday: 8:00 AM – 9:30 PM",
    "Tuesday: 8:00 AM – 9:30 PM",
    "Wednesday: 8:00 AM – 9:30 PM",
    "Thursday: 8:00 AM – 9:30 PM",
    "Friday: 8:00 AM – 9:30 PM",
    "Saturday: 8:00 AM – 10:00 PM",
    "Sunday: 9:00 AM – 8:00 PM",
  ],
};

const base = { loading: false, error: null } as const;

export const googleFixtures: Record<string, UseSharedGoogleDataReturn> = {
  /** Kind data: what the design is usually judged against. */
  demo: {
    ...base,
    rating: 4.8,
    totalReviews: 214,
    openingHours: ENGLISH_HOURS,
    reviews: [
      {
        author_name: "Sophie Laurent",
        rating: 5,
        text: "We stopped every morning on the way to the beach. Fresh bread, cold water, the best olives we had on the island, and the owner always had a recommendation for dinner.",
        time: 1754000000,
        relative_time_description: "2 months ago",
      },
      {
        author_name: "Mark Hendriks",
        rating: 5,
        text: "Small shop, big selection. Local honey and ouzo to take home, and everything you forgot to pack.",
        time: 1752000000,
        relative_time_description: "3 months ago",
      },
      {
        author_name: "Elena Rossi",
        rating: 4,
        text: "Friendly family, fair prices for a beach village. Parking right outside is a bonus in August.",
        time: 1750000000,
        relative_time_description: "4 months ago",
      },
      {
        author_name: "James Whitfield",
        rating: 5,
        text: "The sheep's-milk yoghurt with Lesvos honey is worth the trip alone. They also stock proper feta, cut to order.",
        time: 1748000000,
        relative_time_description: "5 months ago",
      },
      {
        author_name: "Anna Kowalska",
        rating: 5,
        text: "Open late and always helpful.",
        time: 1746000000,
        relative_time_description: "6 months ago",
      },
    ],
  },

  /**
   * Realistic worst case, mixed across rows the way production data mixes:
   * a Greek reviewer, a one-letter-ish name, a long hyphenated name, an
   * emoji-first name, a rating-only review (Google allows empty text), a long
   * unbroken URL, a long review, a one-star — and Greek-language hours with a
   * closed day and a 24-hour day.
   */
  worst: {
    ...base,
    rating: 4.1,
    totalReviews: 1284,
    openingHours: {
      open_now: false,
      // Matches the Greek weekday_text: Friday open 24 hours, Sunday closed
      periods: [
        ...[1, 2, 3, 4].map((d) => period(d, "0800", "2130")),
        period(5, "0000", "0000", 6),
        period(6, "0800", "2200"),
      ],
      weekday_text: [
        "Δευτέρα: 8:00 π.μ.–9:30 μ.μ.",
        "Τρίτη: 8:00 π.μ.–9:30 μ.μ.",
        "Τετάρτη: 8:00 π.μ.–9:30 μ.μ.",
        "Πέμπτη: 8:00 π.μ.–9:30 μ.μ.",
        "Παρασκευή: Ανοιχτά 24 ώρες",
        "Σάββατο: 8:00 π.μ.–10:00 μ.μ.",
        "Κυριακή: Κλειστά",
      ],
    },
    reviews: [
      {
        author_name: "Γιώργος Παπαδόπουλος",
        rating: 5,
        text: "Πολύ καλό μαγαζί, φρέσκο ψωμί κάθε πρωί και ευγενικοί άνθρωποι. Το λάδι και το μέλι είναι εξαιρετικά — τα παίρνουμε κάθε χρόνο για το σπίτι.",
        time: 1754000000,
        relative_time_description: "πριν από 2 μήνες",
      },
      {
        author_name: "Jo",
        rating: 4,
        text: "",
        time: 1753000000,
        relative_time_description: "a week ago",
      },
      {
        author_name: "Aleksandra Wiśniewska-Kowalczyk",
        rating: 5,
        text: "We came three summers in a row and the family remembered us every time. I could write a book about this little shop: the bread in the morning, the cold drinks after the beach, the jars of honey stacked by the door, the kids choosing ice creams for twenty minutes while the owner waited patiently, the recommendations for tavernas in Petra and Molyvos, the time they found a charger for my phone when ours broke, the olive oil we still order from home. Prices are fair, the parking is easy, and the staff speak Greek, English and a bit of German. Highly recommended to anyone staying in Anaxos — honestly the best part of the village after the sea itself.",
        time: 1752000000,
        relative_time_description: "a year ago",
      },
      {
        author_name: "🌊 Marina",
        rating: 1,
        text: "Closed when we arrived at 21:35. Opening times here were wrong: https://example.com/travel/greece/lesvos/anaxos/shops/stratos-market/opening-hours?ref=review-form&lang=en&utm_source=share",
        time: 1751000000,
        relative_time_description: "3 weeks ago",
      },
      {
        author_name: "Christopher Alexander Montgomery III",
        rating: 5,
        text: "Sehr gut!!! Immer wieder gerne — Lebensmittelgeschäftsempfehlungsliste ganz oben.",
        time: 1750000000,
        relative_time_description: "2 years ago",
      },
      {
        author_name: "  dana   lee ",
        rating: 3,
        text: "ok shop.\nbit pricey for water but convenient",
        time: 1749000000,
        relative_time_description: "11 months ago",
      },
    ],
  },

  /** Exactly one of everything — pluralisation and lonely-grid checks. */
  one: {
    ...base,
    rating: 5,
    totalReviews: 1,
    openingHours: ENGLISH_HOURS,
    reviews: [
      {
        author_name: "Nikos",
        rating: 5,
        text: "Great little shop.",
        time: 1754000000,
        relative_time_description: "a day ago",
      },
    ],
  },

  /** Nothing yet: no reviews, no rating, no hours from Google. */
  empty: {
    ...base,
    rating: null,
    totalReviews: null,
    openingHours: null,
    reviews: [],
  },
};
