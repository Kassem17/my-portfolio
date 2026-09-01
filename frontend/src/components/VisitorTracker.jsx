import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const FORMINIT_ENDPOINT =
  import.meta.env.VITE_FORMINIT_ENDPOINT || "https://forminit.com/f/avrygdma";

export default function VisitorTracker() {
  const location = useLocation();
  const trackedPathsRef = useRef(new Set());

  useEffect(() => {
    const currentPath = location.pathname;

    // Avoid duplicate email alerts for the same path in the current session
    const sessionKey = `visited_${currentPath}`;
    if (
      trackedPathsRef.current.has(currentPath) ||
      sessionStorage.getItem(sessionKey)
    ) {
      return;
    }

    trackedPathsRef.current.add(currentPath);
    sessionStorage.setItem(sessionKey, "true");

    const trackVisit = async () => {
      let ipInfo = {};
      try {
        const ipRes = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(3000),
        });
        if (ipRes.ok) {
          ipInfo = await ipRes.json();
        }
      } catch {
        // Fallback gracefully if IP geolocation lookup is blocked or times out
      }

      const formData = new FormData();
      formData.append(
        "_subject",
        `Portfolio Visit: ${currentPath} ${
          ipInfo.country_name ? `(${ipInfo.country_name})` : ""
        }`
      );
      formData.append("page_url", window.location.href);
      formData.append("path", currentPath);
      formData.append("referrer", document.referrer || "Direct / Bookmark");
      formData.append(
        "screen_resolution",
        `${window.innerWidth}x${window.innerHeight}`
      );
      formData.append("user_agent", navigator.userAgent);
      if (ipInfo.ip) formData.append("ip_address", ipInfo.ip);
      if (ipInfo.city) formData.append("city", ipInfo.city);
      if (ipInfo.region) formData.append("region", ipInfo.region);
      if (ipInfo.country_name) formData.append("country", ipInfo.country_name);
      if (ipInfo.org) formData.append("isp_org", ipInfo.org);
      formData.append("timestamp", new Date().toLocaleString());

      try {
        await fetch(FORMINIT_ENDPOINT, {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        console.error("Failed to send visit report via Forminit:", err);
      }
    };

    trackVisit();
  }, [location.pathname]);

  return null;
}

