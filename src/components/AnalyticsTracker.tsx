import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getConsent, initAnalytics, trackPageView } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (getConsent() !== "granted") return;
    initAnalytics();
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
