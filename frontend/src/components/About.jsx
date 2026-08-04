import aboutData from "../data/aboutData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleResumeClick = () => {
    if (!aboutData.resume.href || aboutData.resume.href === "#") {
      Swal.fire({
        title: "Not available yet",
        text: "Resume will be available soon. Check back later!",
        icon: "info",
        confirmButtonColor: "var(--color-accent)",
      });
      return;
    }
    Swal.fire({
      title: "Download resume?",
      text: "Get my CV to know more about me.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--color-accent)",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        const link = document.createElement("a");
        link.href = aboutData.resume.href;
        link.download = "Kassem_Haidar_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)] mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            Background
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {aboutData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
            {aboutData.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Image Card */}
          <div
            className="lg:col-span-5 bento-card rainbow-card relative overflow-hidden animate-slide-up stagger-1 group"
            style={{ borderRadius: "var(--radius-xl)" }}
          >
            <img
              src={aboutData.image}
              alt="About Kassem Haidar"
              className="w-full h-[450px] lg:h-full object-cover rounded-[var(--radius-xl)] relative z-10 group-hover:scale-103 transition-transform duration-700"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            />

            {/* Floating Glass Badge */}
            <div
              className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl z-20"
              style={{
                background: isDark
                  ? "rgba(15, 20, 32, 0.85)"
                  : "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <p className="text-sm font-bold text-[var(--color-text)] flex items-center justify-between">
                <span>Computer Engineer</span>
                <span className="text-gradient">MERN Developer</span>
              </p>
            </div>
          </div>

          {/* Content Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Who I Am & Approach */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                className="bento-card rainbow-card animate-slide-up stagger-2"
                style={{ borderRadius: "var(--radius-xl)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`bx ${aboutData.aboutNarrative.whoAmI.icon} text-2xl text-[var(--color-accent)]`}
                  />
                </div>
                <h3 className="font-extrabold text-[var(--color-text)] text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Who I am
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-medium hover:text-bold hover:text-white">
                  {aboutData.aboutNarrative.whoAmI.text}
                </p>
              </div>

              <div
                className="bento-card rainbow-card animate-slide-up stagger-3"
                style={{ borderRadius: "var(--radius-xl)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`bx ${aboutData.aboutNarrative.approach.icon} text-2xl text-[var(--color-accent)]`}
                  />
                </div>
                <h3 className="font-extrabold text-[var(--color-text)] text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  My approach
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-medium hover:text-bold hover:text-white">
                  {aboutData.aboutNarrative.approach.text}
                </p>
              </div>
            </div>

            {/* Personal Info Grid */}
            <div
              className="bento-card flex-1 animate-slide-up stagger-4"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-[var(--color-text)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                <i className="bx bx-info-circle text-xl text-[var(--color-accent)]" />
                Personal Bio
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {aboutData.biodata.map((item) => (
                  <div
                    key={item.label}
                    className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] hover:border-[var(--color-accent)] transition-all group"
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"
                      style={{ background: "var(--color-accent-muted)" }}
                    >
                      <i
                        className={`${item.icon} text-base text-[var(--color-accent)]`}
                      />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                      {item.label}
                    </span>
                    <span className="text-sm font-extrabold text-[var(--color-text)] truncate block mt-0.5">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Button */}
            <div className="animate-slide-up stagger-5">
              <Tippy content={aboutData.resume.label} placement="top">
                <button
                  onClick={handleResumeClick}
                  className="btn-primary w-full sm:w-auto"
                >
                  <i className="bx bx-download text-lg" />
                  {aboutData.resume.label}
                </button>
              </Tippy>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
