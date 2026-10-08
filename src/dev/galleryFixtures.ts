/**
 * DEV-ONLY fixtures for useDriveImages (`?data=<name>` under `vite dev`).
 * Never shipped: the only import is behind `import.meta.env.DEV`. Same names
 * as googleFixtures, so the one DataToggle drives both.
 *
 * The photos are the site's own; the titles mimic Drive file names.
 */
import type { DriveImage } from "@/hooks/useDriveImages";

/** Alt text in the shape api/fetch-drive-images.ts builds it. */
const photo = (id: number, file: string, title: string, alt?: string): DriveImage => ({
  id,
  src: `/images/${file}`,
  alt: alt ?? `${title.replace(/_/g, " ")}, at Stratos Market in Anaxos, Lesvos`,
  title,
  driveId: `fixture-${id}`,
});

const GENERIC_ALT = "A photo from Stratos Market in Anaxos, Lesvos";

const DEMO = [
  photo(1, "shop.webp", "The_shopfront"),
  photo(2, "olives.webp", "Olives"),
  photo(3, "herbs.webp", "Mountain_herbs"),
  photo(4, "ouzo.webp", "Ouzo"),
  photo(5, "yoghurt.webp", "Yoghurt"),
  photo(6, "og-shop.jpg", "Evening_in_Anaxos"),
];

export const galleryFixtures: Record<string, DriveImage[]> = {
  demo: DEMO,
  /** Many cards, a camera-roll name, a very long name, and a broken link. */
  worst: [
    ...DEMO,
    photo(7, "olives.webp", "IMG_20250714_183244", GENERIC_ALT),
    photo(8, "herbs.webp", "Oregano_thyme_and_mountain_tea_drying_in_the_hills_above_the_village_in_late_August"),
    { ...photo(9, "missing.webp", "Broken_link"), src: "/images/does-not-exist.webp" },
    photo(10, "ouzo.webp", "Ouzo_2"),
    photo(11, "yoghurt.webp", "Yoghurt_2"),
    photo(12, "shop.webp", "Shopfront_2"),
    photo(13, "og-shop.jpg", "x"),
  ],
  /** What the live Drive folder holds today: one photo. */
  one: [
    {
      id: 1,
      src: "https://drive.google.com/thumbnail?id=1GLDF4bFZ3gIyDETgCUZxilNSEKCpq5md&sz=w1000",
      alt: "honey, at Stratos Market in Anaxos, Lesvos",
      title: "honey",
      driveId: "1GLDF4bFZ3gIyDETgCUZxilNSEKCpq5md",
    },
  ],
  empty: [],
};

/** `?data=slow`: the demo rack after a 2.5s wait, to see the loading skeleton. */
export const slowFixture = () =>
  new Promise<DriveImage[]>((resolve) => setTimeout(() => resolve(DEMO), 2500));
