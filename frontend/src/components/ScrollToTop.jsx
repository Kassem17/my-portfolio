import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-accent)] text-white shadow-[var(--shadow-lg)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 transition-opacity"
      aria-label="Scroll to top"
    >
      <i className="bx bx-chevron-up text-2xl" />
    </button>
  );
}
