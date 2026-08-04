import { useEffect } from "react";
import { insertVisitorLog } from "../lib/supabase";

export default function VisitorTracker() {
  useEffect(() => {
    // Session check: notify once per browser session
    const alreadyLogged = sessionStorage.getItem("visitor_notification_sent");
    if (alreadyLogged) return;

    const trackVisitor = async () => {
      try {
        let location = "Unknown Location";
        let ip = "Unknown IP";

        // Fetch location and IP info
        try {
          const ipRes = await fetch("https://ipapi.co/json/", { cache: "no-cache" });
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            location = `${ipData.city || ""}, ${ipData.region || ""}, ${ipData.country_name || ""}`.trim();
            ip = ipData.ip || "Unknown IP";
          }
        } catch {
          // Fallback if IP API is unreachable
        }

        const device = `${navigator.platform || "Device"} (${window.innerWidth}x${window.innerHeight})`;
        const pageUrl = window.location.href;
        const referrer = document.referrer || "Direct Visit";
        const userAgent = navigator.userAgent;
        const localTime = new Date().toLocaleString();

        const visitorObj = {
          location,
          ip,
          device,
          page_url: pageUrl,
          referrer,
          user_agent: userAgent,
        };

        // 1. Insert record into Supabase Database ('visitors' table)
        await insertVisitorLog(visitorObj);

        // 2. Send instant Telegram Bot Push Notification
        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
          const messageText =
            `⚡ *NEW PORTFOLIO VISITOR!*\n\n` +
            `📍 *Location:* ${location} (IP: ${ip})\n` +
            `⏰ *Time:* ${localTime}\n` +
            `💻 *Device:* ${device}\n` +
            `🔗 *Referrer:* ${referrer}\n` +
            `🌐 *Page:* ${pageUrl}`;

          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: "Markdown",
            }),
          });
        } else {
          // Fallback to Getform email if Telegram token isn't configured yet
          const formData = new FormData();
          formData.append("form_type", "🌐 Visitor Alert");
          formData.append("name", "Website Visitor");
          formData.append("email", "visitor@portfolio.local");
          formData.append(
            "message",
            `🎉 New Visitor Alert!\n\n📍 Location: ${location} (${ip})\n⏰ Time: ${localTime}\n💻 Device: ${device}\n🔗 Referrer: ${referrer}`
          );

          await fetch("https://getform.io/f/avrygdma", {
            method: "POST",
            body: formData,
          });
        }

        // Mark session as logged
        sessionStorage.setItem("visitor_notification_sent", "true");
      } catch (err) {
        console.warn("Visitor tracking notification error:", err);
      }
    };

    trackVisitor();
  }, []);

  return null;
}
