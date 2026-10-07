import { useEffect, useState } from "react";
import { athensNow, getOpenStatus, STORE_PLACE_ID, type OpenStatus } from "@/config/store";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";

/**
 * Live open/closed status plus today's weekday in Athens.
 *
 * Both start null and resolve in an effect: the clock differs between build
 * time and visit time, so reading it during render would break hydration.
 * Google's live `open_now` wins when available (it knows about holidays);
 * the published hours fill in the label.
 */
export const useOpenStatus = () => {
  const { openingHours } = useSharedGoogleData(STORE_PLACE_ID);
  const [status, setStatus] = useState<OpenStatus | null>(null);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const fromHours = getOpenStatus();
      const live = openingHours?.open_now;
      setStatus(
        live === undefined || live === fromHours.isOpen
          ? fromHours
          : { isOpen: live, label: live ? "Open now" : "Closed now" }
      );
      setToday(athensNow().day);
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [openingHours?.open_now]);

  return { status, today };
};
