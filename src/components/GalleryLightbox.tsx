import { useRef, type PointerEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import GalleryPhoto from "@/components/GalleryPhoto";
import type { DriveImage } from "@/hooks/useDriveImages";
import type { Lightbox } from "@/hooks/useLightbox";

const control =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-foreground shadow-soft " +
  "transition-transform duration-150 ease-out active:scale-[0.97]";

/**
 * The open photo, enlarged on a postcard. Radix handles focus, Escape and the
 * scroll lock; arrow keys and a horizontal swipe step through the photos.
 * Stepping swaps instantly: it's repeated and often keyboard-driven, so by the
 * frequency rule it gets no animation. Opening eases out over 200ms; closing
 * is the system responding, so it's quicker. Photos carry no titles, only alt text.
 */
const GalleryLightbox = ({ lightbox, images }: { lightbox: Lightbox; images: DriveImage[] }) => {
  const swipe = useRef<{ x: number; t: number } | null>(null);
  const count = images.length;
  const many = count > 1;
  const current = lightbox.index !== null ? images[lightbox.index] : null;
  const position = (lightbox.index ?? 0) + 1;

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, t: e.timeStamp };
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || !many) return;
    const dx = e.clientX - start.x;
    const velocity = Math.abs(dx) / Math.max(1, e.timeStamp - start.t);
    // A quick flick counts even when it's short
    if (Math.abs(dx) > 60 || (Math.abs(dx) > 16 && velocity > 0.11)) {
      if (dx < 0) lightbox.next();
      else lightbox.prev();
    }
  };

  return (
    <DialogPrimitive.Root open={current !== null} onOpenChange={(open) => !open && lightbox.close()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/80 duration-200 ease-out data-[state=closed]:duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onKeyDown={(e) => {
            if (!many) return;
            if (e.key === "ArrowRight") lightbox.next();
            if (e.key === "ArrowLeft") lightbox.prev();
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[960px] -translate-x-1/2 -translate-y-1/2 outline-none duration-200 ease-out data-[state=closed]:duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] motion-reduce:data-[state=open]:zoom-in-100 motion-reduce:data-[state=closed]:zoom-out-100"
        >
          <DialogPrimitive.Title className="sr-only">
            Photo {position} of {count}
          </DialogPrimitive.Title>
          {current && (
            <figure className="m-0 rounded-[6px] bg-card p-3 sm:p-4 shadow-elevated">
              <GalleryPhoto
                key={current.driveId}
                image={current}
                eager
                frameClassName="overflow-hidden rounded-[3px] bg-foreground/90 flex items-center justify-center"
                className="max-h-[68vh] w-auto max-w-full object-contain"
                loadingClassName="h-[40vh]"
                fallbackClassName="h-[40vh]"
              />
            </figure>
          )}
          <div className="mt-3 flex items-center justify-between gap-3">
            {many ? (
              <div className="flex gap-2">
                <button type="button" onClick={lightbox.prev} aria-label="Previous photo" className={control}>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={lightbox.next} aria-label="Next photo" className={control}>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <span />
            )}
            {many && (
              <span className="text-sm font-semibold tabular-nums text-background/80" aria-hidden="true">
                {position} / {count}
              </span>
            )}
            <DialogPrimitive.Close aria-label="Close" className={control}>
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default GalleryLightbox;
