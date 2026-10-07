// Regression test: the open/closed label (hero postmark, Find us flip sign)
// must come from Google's real weekly periods, not the hardcoded 21:30 table.
// Run: npm test   (Node's built-in runner; store.ts is loaded through Vite so
// the "@/" alias and TypeScript resolve exactly as in the app)
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
let server;
let resolveOpenStatus;

before(async () => {
  const { createServer } = await import(pathToFileURL(path.join(ROOT, "node_modules/vite/dist/node/index.js")).href);
  server = await createServer({ root: ROOT, logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  ({ resolveOpenStatus } = await server.ssrLoadModule("/src/config/store.ts"));
});
after(() => server?.close());

// Google Places periods: day 0 = Sunday … 6 = Saturday, time "HHMM"
const daily = (open, close) => ({
  open_now: true, // deliberately stale-looking: the label must not depend on it
  weekday_text: [],
  periods: [0, 1, 2, 3, 4, 5, 6].map((d) => ({ open: { day: d, time: open }, close: { day: d, time: close } })),
});
const summer = daily("0800", "2300");

// Athens is UTC+3 on these October 2026 dates; 2026-10-07 is a Wednesday
const WED_2000 = new Date("2026-10-07T17:00:00Z");
const WED_0700 = new Date("2026-10-07T04:00:00Z");
const WED_2215 = new Date("2026-10-07T19:15:00Z");
const WED_2330 = new Date("2026-10-07T20:30:00Z");
const SUN_2330 = new Date("2026-10-11T20:30:00Z");

test("uses Google's real closing time, not the hardcoded 21:30", () => {
  assert.deepEqual(resolveOpenStatus(WED_2000, summer), { isOpen: true, label: "Open now · until 23:00" });
});

test("is still open after the published 21:30 when Google says 23:00", () => {
  assert.deepEqual(resolveOpenStatus(WED_2215, summer), { isOpen: true, label: "Open now · until 23:00" });
});

test("closes at Google's time even though open_now was true when fetched", () => {
  assert.deepEqual(resolveOpenStatus(WED_2330, summer), { isOpen: false, label: "Closed · opens tomorrow 8:00" });
});

test("before opening says when it opens today", () => {
  assert.deepEqual(resolveOpenStatus(WED_0700, summer), { isOpen: false, label: "Closed · opens 8:00" });
});

test("wraps from Sunday night to Monday", () => {
  assert.deepEqual(resolveOpenStatus(SUN_2330, summer), { isOpen: false, label: "Closed · opens tomorrow 8:00" });
});

test("skips a closed day and names the next opening day", () => {
  const mondayClosed = { ...summer, periods: summer.periods.filter((p) => p.open.day !== 1) };
  assert.deepEqual(resolveOpenStatus(SUN_2330, mondayClosed), { isOpen: false, label: "Closed · opens Tuesday 8:00" });
});

test("handles a period that closes after midnight", () => {
  const lateFriday = { ...summer, periods: [{ open: { day: 3, time: "1800" }, close: { day: 4, time: "0130" } }] };
  assert.deepEqual(resolveOpenStatus(WED_2330, lateFriday), { isOpen: true, label: "Open now · until 1:30" });
});

test("a day that closes at midnight says 'until midnight', not 0:00", () => {
  const toMidnight = { ...summer, periods: [{ open: { day: 3, time: "0800" }, close: { day: 4, time: "0000" } }] };
  assert.deepEqual(resolveOpenStatus(WED_2330, toMidnight), { isOpen: true, label: "Open now · until midnight" });
});

test("a 24-hour listing (open with no close) is always open", () => {
  const always = { open_now: true, weekday_text: [], periods: [{ open: { day: 0, time: "0000" } }] };
  assert.deepEqual(resolveOpenStatus(WED_2000, always), { isOpen: true, label: "Open 24 hours" });
});

test("without Google hours it falls back to the published table", () => {
  assert.deepEqual(resolveOpenStatus(WED_2000, null), { isOpen: true, label: "Open now · until 21:30" });
  assert.deepEqual(resolveOpenStatus(WED_2215, undefined), { isOpen: false, label: "Closed · opens tomorrow 8:00" });
});
