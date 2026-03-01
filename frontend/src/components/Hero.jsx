import { useState, useEffect } from "react";
import homeData from "../data/homeData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";
import Certificates from "./Certificates.jsx";

export default function Home() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCertificatesModal, setShowCertificatesModal] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const titles = homeData.typingTexts;
    const currentTitle = titles[currentIndex];
    const typeSpeed = isDeleting ? 80 : 120;
    const pauseTime = isDeleting ? 400 : 2500;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting]);

  const handleDownload = () => {
    if (!homeData.buttons[0]?.href || homeData.buttons[0].href === "#") {
      Swal.fire({
        title: "Not available yet",
        text: "This file is not ready. Check back later!",
        icon: "info",
        confirmButtonColor: "var(--color-accent)",
      });
      return;
    }
    Swal.fire({
      title: "Download resume?",
      text: "Get my CV to learn more about me.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--color-accent)",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        const link = document.createElement("a");
        link.href = homeData.buttons[0].href;
        link.download = "Kassem_Haidar_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 min-h-[calc(100vh-8rem)]">
          {/* Main Content - Left Column */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
            {/* Greeting Card */}
            <div
              className="bento-card p-6 lg:p-8"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <p className="text-sm font-medium text-[var(--color-accent)] mb-2 uppercase tracking-wider">
                Hello, I'm
              </p>
              <h1
                className="heading-display heading-xl text-[var(--color-text)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kassem <span className="text-gradient">Haidar</span>
              </h1>
              <p className="text-xl lg:text-2xl font-medium text-[var(--color-text-secondary)] min-h-[2.5rem] flex items-center">
                {currentText}
                <span className="inline-block w-1 h-8 ml-1 bg-[var(--color-accent)] animate-pulse rounded-full" />
              </p>
            </div>

            {/* Description Card */}
            <div
              className="bento-card flex-1"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {homeData.description}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                {homeData.education}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  Connect with me
                </span>
                <div className="flex gap-2">
                  {homeData.socialMedia.map((social) => (
                    <Tippy
                      key={social.platform}
                      content={social.platform}
                      placement="top"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--color-accent-muted)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 hover:-translate-y-1"
                        aria-label={social.platform}
                      >
                        <i className={`${social.icon} text-lg`} />
                      </a>
                    </Tippy>
                  ))}
                </div>
                <img
                  src="/logo.png"
                  alt=""
                  className="w-50 opacity-100"
                />
              </div>

              {/* CTA Buttons */}
              <div className="relative mt-6">
                {/* Decorative Logo (Background Style) */}

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 relative z-10">
                  {/* Primary Button */}
                  <button
                    onClick={handleDownload}
                    className="group px-6 py-3 rounded-xl font-semibold 
                 flex items-center gap-2
                 bg-[var(--color-accent)] text-white
                 shadow-md hover:shadow-xl
                 hover:scale-105
                 transition-all duration-300"
                  >
                    <i className="bx bx-download text-lg group-hover:animate-bounce" />
                    Download CV
                  </button>

                  {/* Secondary Button */}
                  <a
                    href="#contact"
                    className="px-6 py-3 rounded-xl font-semibold
                 flex items-center gap-2
                 border border-[var(--color-accent)]
                 text-[var(--color-accent)]
                 hover:bg-[var(--color-accent)]
                 hover:text-white
                 hover:shadow-lg
                 transition-all duration-300"
                  >
                    <i className="bx bx-envelope text-lg" />
                    Get in Touch
                  </a>

                  {/* Glass Button (Certificates) */}
                  <button
                    onClick={() => setShowCertificatesModal(true)}
                    className="px-6 py-3 rounded-xl font-semibold
                 flex items-center gap-2
                 bg-white/60 backdrop-blur-md
                 border border-gray-200
                 text-gray-800
                 hover:bg-gray-100
                 hover:shadow-md
                 transition-all duration-300"
                  >
                    🎓 Certificates
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile & Stats */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            {/* Profile Image Card */}
            <div
              className="bento-card relative overflow-hidden"
              style={{
                borderRadius: "var(--radius-xl)",
                minHeight: "280px",
              }}
            >
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--color-accent)] to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full py-8">
                <div className="relative mb-6">
                  <div
                    className="w-40 h-40 lg:w-48 lg:h-48 rounded-full p-1"
                    style={{
                      background: "var(--gradient-primary)",
                      boxShadow: "0 0 60px rgba(201, 100, 66, 0.3)",
                    }}
                  >
                    <img
                      src={homeData.img}
                      alt="Kassem Haidar"
                      className="w-full h-full object-cover rounded-full border-4 border-white dark:border-[var(--color-bg)]"
                    />
                  </div>
                  {/* Floating Status Badge */}
                  <div
                    className="absolute -bottom-2 -right-2 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2"
                    style={{
                      background: "var(--gradient-primary)",
                      color: "white",
                      boxShadow: "var(--shadow-lg)",
                    }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Available for work
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="flex gap-3 mt-4">
                  {homeData.floatingIcons.map((tech, index) => (
                    <Tippy
                      key={tech.label}
                      content={tech.label}
                      placement="top"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-accent)] hover:scale-110 transition-all duration-300 animate-float"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <i className={`${tech.icon} text-2xl`} />
                      </div>
                    </Tippy>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {homeData.stats.map((item, index) => (
                <div
                  key={item.label}
                  className="bento-card text-center"
                  style={{ borderRadius: "var(--radius-xl)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: "var(--color-accent-muted)" }}
                  >
                    <i
                      className={`${item.icon} text-lg text-[var(--color-accent)]`}
                    />
                  </div>
                  <p className="font-bold text-lg text-[var(--color-text)]">
                    {item.value}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Modal */}
      {showCertificatesModal && (
        <Certificates
          isModal={showCertificatesModal}
          onClose={() => setShowCertificatesModal(false)}
        />
      )}
    </section>
  );
}
