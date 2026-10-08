import { useCallback, useState } from "react";
import type { DriveImage } from "@/hooks/useDriveImages";

type Status = "loading" | "loaded" | "cached" | "failed";

/**
 * A Drive photo in its frame. While it downloads the frame pulses like the
 * rack's skeleton, then the photo fades in over it; one already in the cache
 * appears at once, so stepping through the lightbox stays instant. A dead
 * link becomes a quiet paper tile rather than the broken-image icon.
 */
const GalleryPhoto = ({
  image,
  frameClassName = "",
  className = "",
  loadingClassName = "",
  fallbackClassName = "",
  eager = false,
}: {
  image: DriveImage;
  frameClassName?: string;
  className?: string;
  /** Extra frame classes until the photo lands, e.g. a height while it has none of its own */
  loadingClassName?: string;
  fallbackClassName?: string;
  eager?: boolean;
}) => {
  const [status, setStatus] = useState<Status>("loading");

  // Runs before the first paint, so a cached photo never shows the skeleton
  const checkCache = useCallback((img: HTMLImageElement | null) => {
    if (!img?.complete) return;
    setStatus(img.naturalWidth > 0 ? "cached" : "failed");
  }, []);

  const loading = status === "loading";

  return (
    <span className={`relative block ${frameClassName} ${loading ? loadingClassName : ""}`}>
      {loading && <span aria-hidden="true" className="absolute inset-0 bg-muted motion-safe:animate-pulse" />}
      {status === "failed" ? (
        <span
          className={`flex h-full w-full items-center justify-center p-4 text-center text-xs bg-muted text-muted-foreground ${fallbackClassName}`}
        >
          Photo unavailable
        </span>
      ) : (
        <img
          ref={checkCache}
          src={image.src}
          alt={image.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setStatus((s) => (s === "loading" ? "loaded" : s))}
          onError={() => setStatus("failed")}
          className={`relative ${className} ${
            status === "cached" ? "" : "transition-opacity duration-[250ms] ease-out"
          } ${loading ? "opacity-0" : "opacity-100"}`}
        />
      )}
    </span>
  );
};

export default GalleryPhoto;
