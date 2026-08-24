import { useState, useEffect } from "react";
import navbarData from "../data/navbarData.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.3 },
    );
    navbarData.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => setTheme(isDarkMode ? "light" : "dark");
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleNavClick = (id) => {
    setActiveId(id);
    setIsMenuOpen(false);
  };

  const linkBase =
    "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 z-10 font-bold text-sm";

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl rounded-full"
        style={{
          background: isDarkMode
            ? "rgba(15, 20, 32, 0.75)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--color-border)",
          boxShadow: isDarkMode
            ? "0 10px 35px rgba(0, 0, 0, 0.6)"
            : "0 10px 35px rgba(139, 92, 246, 0.12)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center justify-center gap-1 w-full">
              {navbarData.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`${linkBase} ${
                        isActive
                          ? "text-white"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                      }`}
                    >
                      <i className={`bx ${item.icon} text-base`} />
                      <span>{item.label}</span>
                    </a>
                    {/* Active capsule indicator */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-full shadow-lg z-0 transition-all duration-300"
                        style={{
                          background: "var(--gradient-electric)",
                        }}
                      />
                    )}
                  </li>
                );
              })}

              <li className="ml-3 pl-3 border-l border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)] transition-all duration-300"
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  <i
                    className={`bx text-xl transition-transform duration-500 ${
                      isDarkMode ? "bx-sun rotate-180 text-amber-400" : "bx-moon rotate-0 text-violet-600"
                    }`}
                  />
                </button>
              </li>
            </ul>

            {/* Mobile View Header */}
            <div className="md:hidden flex items-center justify-between w-full">
              <a
                href="#home"
                className="font-extrabold text-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-gradient">K</span>.Haidar
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-[var(--color-text)] hover:bg-[var(--color-accent-muted)] transition-colors"
                  aria-label="Toggle dark mode"
                >
                  <i
                    className={`bx text-xl ${
                      isDarkMode ? "bx-sun text-amber-400" : "bx-moon text-violet-600"
                    }`}
                  />
                </button>

                <button
                  type="button"
                  className="p-2.5 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-accent-muted)] transition-colors"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                >
                  <i
                    className={`bx text-2xl transition-transform duration-300 ${
                      isMenuOpen ? "bx-x rotate-90" : "bx-menu"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          onClick={toggleMenu}
          aria-hidden
        />
        <div
          className="absolute top-0 right-0 w-full max-w-sm h-full flex flex-col shadow-2xl"
          style={{
            background: isDarkMode
              ? "rgba(15, 20, 32, 0.96)"
              : "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
            <span
              className="font-extrabold text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient">Kassem</span> Haidar
            </span>
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-[var(--color-accent-muted)] text-[var(--color-text)] transition-colors"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <i className="bx bx-x text-2xl" />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto p-4 space-y-2">
            {navbarData.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  className={`animate-slide-up stagger-${idx + 1}`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-[var(--gradient-electric)] text-white shadow-lg"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <i className={`bx ${item.icon} text-xl`} />
                      {item.label}
                    </span>
                    <i className="bx bx-chevron-right text-xl opacity-50" />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="p-5 border-t border-[var(--color-border)] text-center">
            <p className="text-xs font-semibold text-[var(--color-text-muted)]">
              © {new Date().getFullYear()} Kassem Haidar
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
