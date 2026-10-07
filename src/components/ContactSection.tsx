import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Locate, MapPin, Navigation, Phone } from "lucide-react";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";
import { useOpenStatus } from "@/hooks/useOpenStatus";
import {
  HOURS_BY_DAY,
  STORE_ADDRESS,
  STORE_MAPS_URL,
  STORE_PHONE_DISPLAY,
  STORE_PHONE_TEL,
  STORE_PLACE_ID,
  WEEKDAYS,
} from "@/config/store";

/** Sourced facts only: the shopfront board ("Credit cards accepted") and the shop's own copy. */
const FACTS = ["Free parking at the door", "Fifty metres from the sand", "Credit cards accepted", "Open every day"];

const QUICK_PICKS = ["Mytilene Airport", "Molyvos", "Petra", "Skala Eressos"];

const openMaps = () => window.open(STORE_MAPS_URL, "_blank", "noopener,noreferrer");
const callStore = () => window.open(`tel:${STORE_PHONE_TEL}`, "_self");

const openDirections = (from?: string) => {
  const base = "https://www.google.com/maps/dir/?api=1";
  const url = from
    ? `${base}&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(STORE_ADDRESS)}`
    : `${base}&destination=${encodeURIComponent(STORE_ADDRESS)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const capitalise = (s?: string) => (s ? s[0].toUpperCase() + s.slice(1) : "");

/**
 * The classic two-sided flip sign on its cord: "Come in, we're open" or
 * "Sorry, we're closed", with the live until/opens line. Settles with a small
 * swing about its nail the first time it scrolls in (.sign-swing).
 */
const FlipSign = () => {
  const { status } = useOpenStatus();
  const [, until] = status?.label.split(" · ") ?? [];
  const closed = !!status && !status.isOpen;

  return (
    <div className="relative w-full max-w-[300px] pt-10" aria-live="polite">
      <span className="absolute top-0 left-1/2 -ml-[7px] h-3.5 w-3.5 rounded-full border-2 border-foreground/40 bg-background" aria-hidden="true" />
      <span className="absolute top-3 left-1/2 h-[40px] w-px origin-top -rotate-[38deg] bg-foreground/35" aria-hidden="true" />
      <span className="absolute top-3 left-1/2 h-[40px] w-px origin-top rotate-[38deg] bg-foreground/35" aria-hidden="true" />
      <div
        className={`sign-swing relative rounded-[12px] border-[3px] shadow-elevated px-6 py-5 text-center transition-colors duration-300 [transition-timing-function:ease] ${
          closed ? "bg-foreground border-foreground text-background" : "bg-card border-primary text-primary"
        }`}
      >
        <div className="font-display font-bold italic normal-case text-[20px] leading-none opacity-80">
          {closed ? "Sorry," : "Come in,"}
        </div>
        <div className="font-display font-black text-[46px] leading-[0.95] mt-1">{closed ? "We're closed" : "We're open"}</div>
        <div className="text-sm font-semibold mt-2 min-h-[1.25rem] opacity-80">{status ? capitalise(until) : ""}</div>
      </div>
    </div>
  );
};

const Screw = ({ className }: { className: string }) => (
  <span
    className={`absolute h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,hsl(40_30%_92%),hsl(40_12%_62%))] shadow-[inset_0_0_0_0.5px_hsl(0_0%_0%/0.3)] ${className}`}
    aria-hidden="true"
  >
    <span className="absolute left-1/2 top-[2px] bottom-[2px] w-px -translate-x-1/2 rotate-45 bg-foreground/40" />
  </span>
);

/**
 * Engraved hours plaque. Google's live weekday_text when we have it, else
 * the published table; today is found by position, because weekday_text is
 * Monday-first but arrives in the visitor's language ("Τετάρτη").
 */
const HoursPlaque = ({ className = "" }: { className?: string }) => {
  const { openingHours, loading, error } = useSharedGoogleData(STORE_PLACE_ID);
  const { today } = useOpenStatus();
  const rows =
    error || !openingHours?.weekday_text
      ? HOURS_BY_DAY
      : openingHours.weekday_text.map((line) => {
          const [day, ...rest] = line.split(":");
          return { day, hours: rest.join(":").trim() };
        });
  const todayIndex = today ? WEEKDAYS.indexOf(today as (typeof WEEKDAYS)[number]) : -1;

  return (
    <div className={`relative w-full rounded-[8px] bg-ultramarine text-ultramarine-foreground shadow-elevated px-7 py-6 ${className}`}>
      <Screw className="top-2.5 left-2.5" />
      <Screw className="top-2.5 right-2.5" />
      <Screw className="bottom-2.5 left-2.5" />
      <Screw className="bottom-2.5 right-2.5" />
      <div className="eyebrow text-center text-ultramarine-foreground/70 mb-3.5">Opening hours</div>
      {loading ? (
        <p className="m-0 text-sm text-ultramarine-foreground/70">Loading hours…</p>
      ) : (
        <ul className="m-0 p-0 list-none flex flex-col gap-1 font-display font-bold text-[17px] leading-tight tracking-[0.02em]">
          {rows.map(({ day, hours }, i) => {
            const isToday = i === todayIndex;
            return (
              <li key={day} className={`flex justify-between gap-4 ${isToday ? "text-accent" : "text-ultramarine-foreground/90"}`}>
                <span>
                  {day}
                  {isToday && <span className="sr-only"> (today)</span>}
                </span>
                <span className="tabular-nums text-right">{hours}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const Directions = () => {
  const [origin, setOrigin] = useState("");

  const useMyLocation = () => {
    if (!navigator.geolocation) return openDirections();
    navigator.geolocation.getCurrentPosition(
      (pos) => openDirections(`${pos.coords.latitude},${pos.coords.longitude}`),
      () => openDirections(),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    openDirections(origin.trim() || undefined);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <label htmlFor="origin" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Coming from somewhere else on the island?
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="e.g. Mytilene Airport, Molyvos, your hotel…"
          className="h-12 rounded-full px-5 bg-background border-border"
        />
        <Button type="submit" className="h-12 rounded-full bg-primary hover:bg-primary-deep text-primary-foreground px-6 font-bold">
          <Navigation className="h-4 w-4" />
          Directions
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={useMyLocation}
          className="rounded-full border-ultramarine/30 bg-background text-ultramarine hover:bg-ultramarine hover:text-ultramarine-foreground font-semibold"
        >
          <Locate className="h-4 w-4" />
          Use my location
        </Button>
        {QUICK_PICKS.map((place) => (
          <Button
            key={place}
            type="button"
            variant="outline"
            onClick={() => openDirections(`${place}, Lesvos, Greece`)}
            className="rounded-full border-border bg-background text-foreground hover:bg-muted font-semibold"
          >
            {place}
          </Button>
        ))}
      </div>
    </form>
  );
};

/**
 * Find us: a quiet, practical section. The map is the section; the flip sign
 * and the hours plaque hang on it (desktop), so "when" and "where" read as
 * one picture and nothing needs its own row. Phones stack sign, map, plaque.
 */
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 px-5 sm:px-10 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="section-index text-ultramarine">04 — Find us</div>
        <h2 className="font-display text-[clamp(2.5rem,6vw,64px)] text-foreground m-0">Find us in Anaxos</h2>
        <p className="text-[18px] text-muted-foreground max-w-[560px] mt-3 mb-10 md:mb-12 text-pretty">
          Fifty metres from the sea. The door&apos;s open every day, wet feet welcome.
        </p>

        <div data-reveal className="relative flex flex-col items-center lg:block">
          {/* Sign + plaque: on the map's right side from lg (the pin sits in the
              middle and Google's place box top-left, so both stay visible) */}
          <div className="contents lg:absolute lg:z-10 lg:top-0 lg:right-6 xl:right-10 lg:flex lg:w-[300px] xl:w-[340px] lg:flex-col lg:items-center">
            <FlipSign />
            <HoursPlaque className="order-last lg:order-none max-w-[400px] mt-6 lg:mt-5" />
          </div>
          <div className="w-full mt-6 lg:mt-0 h-[340px] md:h-[440px] lg:h-[640px] rounded-[20px] overflow-hidden border border-border shadow-soft">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.8621234567!2d26.1429499!3d39.3161481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba90b7da6564c9%3A0xa0bdf39da3a750df!2sStratos%20Market!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Stratos Market on the map"
              className="block [filter:grayscale(0.3)_sepia(0.12)] transition-[filter] duration-300 [transition-timing-function:ease] hover:[filter:none]"
            />
          </div>
        </div>

        {/* The details, in one row under the map */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="eyebrow text-muted-foreground mb-2.5">Address</div>
            <p className="font-display font-bold text-[26px] leading-[1.05] text-foreground m-0">
              Stratos Market
              <br />
              Anaxos, Lesvos
              <br />
              North Aegean
            </p>
            <Button onClick={openMaps} className="mt-4 h-auto py-3 px-6 rounded-full bg-primary hover:bg-primary-deep text-primary-foreground font-bold">
              <MapPin className="h-4 w-4" />
              Open in Maps
            </Button>
          </div>
          <div className="lg:col-span-3">
            <div className="eyebrow text-muted-foreground mb-2.5">Call</div>
            <a href={`tel:${STORE_PHONE_TEL}`} className="font-display font-bold text-[26px] leading-[1.05] text-ultramarine hover:text-primary">
              {STORE_PHONE_DISPLAY}
            </a>
            <ul className="m-0 mt-4 p-0 list-none flex flex-col gap-1.5 text-[15px] text-muted-foreground">
              {FACTS.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={callStore}
              variant="outline"
              className="mt-4 h-auto py-3 px-6 rounded-full border-2 border-ultramarine bg-transparent text-ultramarine hover:bg-ultramarine hover:text-ultramarine-foreground font-bold"
            >
              <Phone className="h-4 w-4" />
              Call us
            </Button>
          </div>
          <div className="md:col-span-2 lg:col-span-6">
            <Directions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
