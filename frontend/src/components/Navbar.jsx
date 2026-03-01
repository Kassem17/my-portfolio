import { useState, useEffect } from "react";
import navbarData from "../data/navbarData.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
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
    "flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300";
  const linkActive = "bg-[var(--color-accent)] text-white shadow-md";
  const linkInactive =
    "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]";

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-2xl"
        style={{
          background: isDarkMode
            ? "rgba(20, 28, 39, 0.8)"
            : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-14">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center  font-bold text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <img src="/logo.png" alt="Logo" className="size-35" />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 mr-20">
              {navbarData.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`${linkBase} ${activeId === item.id ? linkActive : linkInactive}`}
                  >
                    <i className={`bx ${item.icon} text-lg`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
              <li className="ml-2 pl-2 border-l border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className={`${linkBase} ${linkInactive}`}
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  <i
                    className={`bx text-lg transition-transform duration-500 ${isDarkMode ? "bx-sun rotate-0" : "bx-moon rotate-0"}`}
                  />
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2.5 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-accent-muted)] transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <i
                className={`bx text-2xl transition-transform duration-300 ${isMenuOpen ? "bx-x rotate-90" : "bx-menu"}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={toggleMenu}
          aria-hidden
        />
        <div
          className="absolute top-0 right-0 w-full max-w-sm h-full flex flex-col"
          style={{
            background: isDarkMode
              ? "rgba(20, 28, 39, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
            <span
              className="font-bold text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[var(--color-accent)]">K</span>.menu
            </span>
            <button
              type="button"
              className="p-2.5 rounded-xl hover:bg-[var(--color-accent-muted)] text-[var(--color-text)] transition-colors"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <i className="bx bx-x text-2xl" />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto p-4 space-y-2">
            {navbarData.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`${linkBase} ${
                    activeId === item.id ? linkActive : linkInactive
                  } w-full justify-between py-4 text-base`}
                >
                  <span className="flex items-center gap-3">
                    <i className={`bx ${item.icon} text-xl`} />
                    {item.label}
                  </span>
                  <i className="bx bx-chevron-right text-xl opacity-50" />
                </a>
              </li>
            ))}
            <li className="pt-4 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={toggleDarkMode}
                className={`${linkBase} ${linkInactive} w-full justify-between py-4 text-base`}
              >
                <span className="flex items-center gap-3">
                  <i
                    className={`bx text-xl ${isDarkMode ? "bx-sun" : "bx-moon"}`}
                  />
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </li>
          </ul>
          <div className="p-5 border-t border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              © {new Date().getFullYear()} Kassem Haidar
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
