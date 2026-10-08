import { useCallback, useState } from "react";

/** Index of the open photo, or null. Stepping wraps at both ends. */
export const useLightbox = (count: number) => {
  const [index, setIndex] = useState<number | null>(null);
  const step = useCallback(
    (by: number) => setIndex((i) => (i === null || count === 0 ? i : (i + by + count) % count)),
    [count]
  );

  return {
    index,
    open: setIndex,
    close: () => setIndex(null),
    next: () => step(1),
    prev: () => step(-1),
  };
};

export type Lightbox = ReturnType<typeof useLightbox>;
