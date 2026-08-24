import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { insertVisitorLog } from "../lib/supabase";

export default function VisitorTracker() {
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    // If Supabase is configured, log page view client-side
    const visitorData = {
      location: window.location.origin,
      ip: "",
      device: `${window.innerWidth}x${window.innerHeight}`,
      page_url: location.pathname,
      referrer: document.referrer || "Direct",
      user_agent: navigator.userAgent,
    };

    insertVisitorLog(visitorData).catch(() => {});
  }, [location.pathname]);

  return null;
}
