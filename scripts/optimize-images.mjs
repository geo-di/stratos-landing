// One-shot image re-encoder. The originals came off a camera at full resolution —
// ouzo.webp alone was 18.9 MB and all four product shots load on the homepage, so
// the page pushed ~30 MB before this ran. That is slow enough to hurt Core Web
// Vitals and to risk Googlebot's renderer timing out.
//
// Run with `npm run optimize-images` and commit the result. Re-running is safe:
// it skips any file already at or under the target width.

import { readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = resolve(ROOT, "public/images");

// Nothing is displayed wider than the 1440px page container, so 1600px covers
// even a 2x crop of the largest slot without shipping camera-sized pixels.
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 78;

const SOURCES = ["shop.webp", "olives.webp", "herbs.webp", "ouzo.webp", "yoghurt.webp"];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const file of SOURCES) {
  const path = resolve(IMAGES, file);
  const before = statSync(path).size;
  const input = readFileSync(path);
  const { width, height } = await sharp(input).metadata();

  const output = await sharp(input)
    .resize({ width: Math.min(width, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  // Re-encoding can lose to the original on an already-optimised file.
  if (output.length >= before) {
    console.log(`${file}: kept original (${kb(before)}, ${width}x${height})`);
    continue;
  }

  writeFileSync(path, output);
  const meta = await sharp(output).metadata();
  console.log(
    `${file}: ${kb(before)} -> ${kb(output.length)} (${width}x${height} -> ${meta.width}x${meta.height})`
  );
}

// Open Graph wants a fixed 1200x630. Facebook and LinkedIn still treat JPEG as
// the safe format, so this one is not WebP. Cropped from the top of the frame to
// match the hero's object-[center_20%] framing of the shopfront.
const OG_PATH = resolve(IMAGES, "og-shop.jpg");
const og = await sharp(readFileSync(resolve(IMAGES, "shop.webp")))
  .resize({ width: 1200, height: 630, fit: "cover", position: "north" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

writeFileSync(OG_PATH, og);
console.log(`og-shop.jpg: written (${kb(og.length)}, 1200x630)`);
