import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import homeData from "../data/homeData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";
const OrbitingSkills = lazy(() => import("./3d/OrbitingSkills.jsx"));
const ParticleField = lazy(() => import("./3d/ParticleField.jsx"));
const Certificates = lazy(() => import("./Certificates.jsx"));

export default function Home() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCertificatesModal, setShowCertificatesModal] = useState(false);
  const { theme } = useTheme();

  // Optimized Mouse tilt effect (Direct rAF DOM mutation)
  const profileCardRef = useRef(null);
  const animFrameRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!profileCardRef.current) return;
    const card = profileCardRef.current;
    
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * -8;
      const tiltY = (x / rect.width) * 8;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
  };

  const handleMouseLeave = () => {
    if (profileCardRef.current) {
      profileCardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  useEffect(() => {
    const titles = homeData.typingTexts;
    const currentTitle = titles[currentIndex];
    const typeSpeed = isDeleting ? 70 : 110;
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
      className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 3D Particle Canvas Background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-5 lg:gap-6 min-h-[calc(100vh-8rem)]">
          {/* Left Column - Hero Details */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-5">
            {/* Main Title Card */}
            <div
              className="bento-card p-6 lg:p-8 rainbow-card animate-slide-up stagger-1"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-accent-muted)] border border-[var(--color-border-strong)] text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
                Full-Stack & Mobile Developer
              </div>
              <h1
                className="heading-display heading-xl text-[var(--color-text)] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kassem <span className="text-gradient">Haidar</span>
              </h1>
              <p className="text-xl lg:text-2xl font-bold text-[var(--color-text-secondary)] min-h-[2.5rem] flex items-center">
                {currentText}
                <span className="inline-block w-1 h-7 ml-1 bg.gradient-electric bg-[var(--color-accent)] animate-typing-blink rounded-full" />
              </p>
            </div>

            {/* Narrative Card */}
            <div
              className="bento-card flex-1 max-h-fit animate-slide-up stagger-2"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4 font-medium">
                {homeData.description}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
                {homeData.education}
              </p>

              {/* Social Media Links */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Connect
                </span>
                <div className="flex gap-2.5">
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
                        className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        aria-label={social.platform}
                      >
                        <i className={`${social.icon} text-xl`} />
                      </a>
                    </Tippy>
                  ))}
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleDownload}
                  className="btn-primary group px-7 py-3.5 rounded-full font-bold 
               flex items-center gap-2 text-white shadow-xl transition-all duration-300"
                >
                  <i className="bx bx-download text-lg group-hover:animate-bounce" />
                  Download CV
                </button>

                <a
                  href="#contact"
                  className="btn-secondary px-7 py-3.5 rounded-full font-bold
               flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                >
                  <i className="bx bx-envelope text-lg text-[var(--color-accent)]" />
                  Get in Touch
                </a>

                <button
                  onClick={() => setShowCertificatesModal(true)}
                  className="px-6 py-3.5 rounded-full font-bold text-sm
               bg-[var(--color-surface-glass)] backdrop-blur-md
               border border-[var(--color-border)]
               text-[var(--color-text)]
               hover:bg-[var(--color-accent-muted)]
               hover:border-[var(--color-accent)]
               transition-all duration-300"
                >
                  🎓 Certificates
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Image & Stats */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
            {/* Profile Photo Card */}
            <div
              ref={profileCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bento-card rainbow-card relative overflow-hidden animate-slide-up stagger-3"
              style={{
                borderRadius: "var(--radius-xl)",
                minHeight: "310px",
                transition: "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)",
                willChange: "transform",
              }}
            >
              <div className="relative z-10 flex flex-col items-center justify-center h-full py-8">
                <div className="relative mb-6">
                  {/* Glowing Rainbow Aura Circle */}
                  <div
                    className="w-52 h-52 lg:w-58 lg:h-58 rounded-full p-1.5 animate-glow-pulse shadow-2xl"
                    style={{
                      background: "var(--gradient-electric)",
                    }}
                  >
                    <img
                      src={homeData.img}
                      alt="Kassem Haidar"
                      className="w-full h-full object-cover rounded-full border-4 border-[var(--color-bg-elevated)]"
                    />
                  </div>
                  {/* Status Badge */}
                  <div
                    className="absolute -bottom-2 -right-2 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl uppercase tracking-wider"
                    style={{
                      background: "var(--gradient-electric)",
                      color: "white",
                    }}
                  >
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                    Open for opportunities
                  </div>
                </div>

                {/* Floating Tech Badges */}
                <div className="flex gap-3 mt-3">
                  {homeData.floatingIcons.map((tech, index) => (
                    <Tippy
                      key={tech.label}
                      content={tech.label}
                      placement="top"
                    >
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-accent)] hover:scale-115 hover:rotate-6 transition-all duration-300 animate-float shadow-sm"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <i className={`${tech.icon} text-xl`} />
                      </div>
                    </Tippy>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 animate-slide-up stagger-4">
              {homeData.stats.map((item) => (
                <div
                  key={item.label}
                  className="bento-card text-center hover:border-[var(--color-accent)] transition-all duration-300"
                  style={{ borderRadius: "var(--radius-xl)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5 shadow-sm"
                    style={{ background: "var(--color-accent-muted)" }}
                  >
                    <i
                      className={`${item.icon} text-lg text-[var(--color-accent)]`}
                    />
                  </div>
                  <p className="font-extrabold text-lg text-[var(--color-text)]">
                    {item.value}
                  </p>
                  <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5">
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
        <Suspense fallback={null}>
          <Certificates
            isModal={showCertificatesModal}
            onClose={() => setShowCertificatesModal(false)}
          />
        </Suspense>
      )}
    </section>
  );
}
