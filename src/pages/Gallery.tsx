import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Stamp from "@/components/Stamp";
import GalleryPhoto from "@/components/GalleryPhoto";
import GalleryLightbox from "@/components/GalleryLightbox";
import { DRIVE_FOLDER_ID } from "@/config/gallery";
import { useDriveImages, type DriveImage } from "@/hooks/useDriveImages";
import { useLightbox } from "@/hooks/useLightbox";

/** Each card lies on the table at its own small angle */
const TILTS = ["-2deg", "1.5deg", "-1deg", "2.2deg", "-1.6deg", "0.8deg"];

/** Inline stagger for [data-reveal], capped so a long rack doesn't keep you waiting */
const revealDelay = (i: number) => ({ "--reveal-delay": `${Math.min(i, 8) * 60}ms` }) as CSSProperties;

/** What the closing card says: under photos, in place of them, or when Drive didn't answer. */
type RackState = "photos" | "empty" | "error";

const COPY: Record<RackState, { heading: string; message: string }> = {
  photos: {
    heading: "Better in person, always.",
    message: "Pictures are nice. The smell of the herbs is better. Come and find us in Anaxos.",
  },
  empty: {
    heading: "The rack's empty for now",
    message: "We're still choosing this summer's pictures. Meanwhile the real thing is fifty metres from the sand.",
  },
  error: {
    heading: "The photos didn't arrive",
    message: "Our photo folder didn't answer just now. Try again in a moment, or come and see the real thing in Anaxos.",
  },
};

/** Retry for the error card; the rest of the page has nothing to retry. */
type Retry = { run: () => void; busy: boolean };

const pill = "h-auto rounded-full font-bold px-6 py-3 active:scale-[0.97] transition-transform duration-150 ease-out";

const Actions = ({ retry }: { retry?: Retry }) => (
  <div className="mt-auto flex flex-wrap gap-3">
    {retry && (
      <Button
        onClick={retry.run}
        disabled={retry.busy}
        className={`${pill} bg-primary hover:bg-primary-deep text-primary-foreground`}
      >
        {retry.busy ? "Trying again…" : "Try again"}
      </Button>
    )}
    <Button
      asChild
      variant={retry ? "outline" : "default"}
      className={
        retry
          ? `${pill} border-ultramarine/30 text-ultramarine bg-transparent hover:bg-ultramarine/5`
          : `${pill} bg-primary hover:bg-primary-deep text-primary-foreground`
      }
    >
      <Link to="/#contact">How to find us</Link>
    </Button>
  </div>
);

type BackProps = { state: RackState; retry?: Retry };

/** The message side of a postcard, as on the hero: message | stamp and address. */
const PostcardBack = ({ state, retry }: BackProps) => (
  <div className="rounded-[6px] bg-card border border-border shadow-elevated p-5 sm:p-6 h-full grid grid-cols-[1fr_auto] gap-5">
    <div className="flex flex-col pr-5 border-r border-ultramarine/20 min-w-0">
      <p className="m-0 font-display font-bold italic normal-case text-ultramarine text-[26px] leading-none">
        {COPY[state].heading}
      </p>
      <p className="m-0 mt-3 mb-5 text-[15px] text-muted-foreground leading-[1.65] text-pretty">{COPY[state].message}</p>
      <Actions retry={retry} />
    </div>
    <div className="flex flex-col items-end gap-4 w-[96px] sm:w-[110px]">
      <Stamp className="rotate-[4deg]" />
      <div className="w-full mt-auto space-y-2.5" aria-hidden="true">
        <div className="border-b border-dashed border-ultramarine/30 pb-1 font-display font-bold text-[15px] text-ultramarine leading-none">Anaxos</div>
        <div className="border-b border-dashed border-ultramarine/30 pb-1 font-display font-bold text-[15px] text-ultramarine leading-none">Lesvos</div>
      </div>
    </div>
  </div>
);

/**
 * The same card where it gets too narrow for the address column: the stamp
 * tucks into the corner and the message runs the full width. Only the heading
 * shares a row with the stamp, so it reserves the stamp's height.
 */
const CornerBack = ({ state, retry }: BackProps) => (
  <div className="relative rounded-[6px] bg-card border border-border shadow-elevated p-6 h-full flex flex-col">
    <Stamp className="absolute top-4 right-4 rotate-[4deg] scale-[0.85] origin-top-right" />
    <p className="m-0 pr-[92px] min-h-[80px] font-display font-bold italic normal-case text-ultramarine text-[26px] leading-none text-balance">
      {COPY[state].heading}
    </p>
    <p className="m-0 mt-3 mb-5 text-[15px] text-muted-foreground leading-[1.65] text-pretty">{COPY[state].message}</p>
    <Actions retry={retry} />
  </div>
);

/** Cards waiting to be set out. Each pulses a beat after the last, so the rack shimmers rather than blinks. */
const pulse = (i: number) => ({ animationDelay: `${i * 150}ms` }) as CSSProperties;
const bar = "block rounded-full bg-muted motion-safe:animate-pulse";

const SkeletonCard = ({ i }: { i: number }) => (
  <div
    className="postcard rounded-[6px] bg-card p-3 border border-border shadow-soft"
    style={{ "--tilt": TILTS[i % TILTS.length] } as CSSProperties}
  >
    <div className="aspect-[4/3] rounded-[3px] bg-muted motion-safe:animate-pulse" style={pulse(i)} />
  </div>
);

/** The closing card in outline: heading, a few lines, the button, and the stamp's place. */
const SkeletonBack = ({ i }: { i: number }) => (
  <div className="h-full rotate-[1.2deg] rounded-[6px] bg-card border border-border shadow-soft p-6 flex gap-5">
    <div className="flex-1 min-w-0 flex flex-col gap-3">
      <span className={`${bar} h-6 w-4/5`} style={pulse(i)} />
      <span className={`${bar} mt-2 h-3 w-full`} style={pulse(i)} />
      <span className={`${bar} h-3 w-11/12`} style={pulse(i)} />
      <span className={`${bar} h-3 w-2/3`} style={pulse(i)} />
      <span className={`${bar} mt-auto h-11 w-40`} style={pulse(i)} />
    </div>
    <span
      className="shrink-0 w-[74px] h-[90px] rounded-[3px] border-2 border-dashed border-muted motion-safe:animate-pulse"
      style={pulse(i)}
    />
  </div>
);

const SKELETON_PHOTOS = 5;

const Postcard = ({ image, i, onOpen }: { image: DriveImage; i: number; onOpen: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    className="postcard block w-full text-left rounded-[6px] bg-card p-3 border border-border shadow-elevated"
    style={{ "--tilt": TILTS[i % TILTS.length] } as CSSProperties}
    aria-label={`Open photo ${i + 1}`}
  >
    <GalleryPhoto
      image={image}
      frameClassName="aspect-[4/3] overflow-hidden rounded-[3px] bg-muted"
      className="w-full h-full object-cover"
    />
  </button>
);

/**
 * A rack of postcards: each photo is a card set down at a small angle, and
 * the rack closes with the message side of a postcard, so a single photo
 * still makes a pair. Photos come from the Drive folder (see config/gallery).
 */
const Gallery = () => {
  const { data, isPending, isError, isFetching, refetch } = useDriveImages(DRIVE_FOLDER_ID);
  const images = data ?? [];
  const empty = images.length === 0;
  // A failed background refresh keeps the photos already on screen
  const state: RackState = !empty ? "photos" : isError ? "error" : "empty";
  const retry = state === "error" ? { run: () => void refetch(), busy: isFetching } : undefined;
  const lightbox = useLightbox(images.length);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-5 sm:px-10 py-14 md:py-20">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <div className="section-index text-ultramarine">Gallery — The rack</div>
            <h1 className="font-display text-[clamp(2.75rem,7vw,80px)] text-foreground m-0">
              Postcards<br />from Anaxos
            </h1>
          </div>
          <p className="text-[17px] text-muted-foreground max-w-[400px] leading-relaxed text-pretty m-0 md:mb-2">
            The shop, the shelf and the village, one card at a time.
            {!isPending && !empty && ` ${images.length} ${images.length === 1 ? "card" : "cards"} in the rack.`}
          </p>
        </header>

        {/* Pending also covers the prerender, so the static page shows the rack being set out */}
        <p className="sr-only" role="status">
          {isPending ? "Loading photos" : ""}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 m-0 p-0 list-none" aria-busy={isPending}>
          {isPending ? (
            <>
              {Array.from({ length: SKELETON_PHOTOS }, (_, i) => (
                <li key={i} aria-hidden="true">
                  <SkeletonCard i={i} />
                </li>
              ))}
              <li aria-hidden="true">
                <SkeletonBack i={SKELETON_PHOTOS} />
              </li>
            </>
          ) : (
            <>
              {images.map((image, i) => (
                <li key={image.driveId} data-reveal style={revealDelay(i)}>
                  <Postcard image={image} i={i} onOpen={() => lightbox.open(i)} />
                </li>
              ))}
              <li
                data-reveal
                style={revealDelay(images.length)}
                className={`postcard-back ${empty ? "sm:col-span-2" : ""}`}
              >
                <div className="postcard-back--standard h-full rotate-[1.2deg]">
                  <PostcardBack state={state} retry={retry} />
                </div>
                <div className="postcard-back--corner h-full rotate-[1.2deg]">
                  <CornerBack state={state} retry={retry} />
                </div>
              </li>
            </>
          )}
        </ul>

        <GalleryLightbox lightbox={lightbox} images={images} />
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
