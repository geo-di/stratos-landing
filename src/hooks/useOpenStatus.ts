import { useEffect, useState } from "react";
import { athensNow, resolveOpenStatus, STORE_PLACE_ID, type OpenStatus } from "@/config/store";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";

/**
 * Live open/closed status plus today's weekday in Athens.
 *
 * Both start null and resolve in an effect: the clock differs between build
 * time and visit time, so reading it during render would break hydration.
 * The status comes from Google's real weekly periods (the published table if
 * Google has none) and is recomputed every minute, so the label flips at the
 * actual opening and closing times while the page is open.
 */
export const useOpenStatus = () => {
  const { openingHours } = useSharedGoogleData(STORE_PLACE_ID);
  const [status, setStatus] = useState<OpenStatus | null>(null);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setStatus(resolveOpenStatus(now, openingHours));
      setToday(athensNow(now).day);
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [openingHours]);

  return { status, today };
};
