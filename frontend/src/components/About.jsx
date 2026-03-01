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
    <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2 uppercase tracking-wider">
            About Me
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {aboutData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto">
            {aboutData.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Image Card - Left */}
          <div
            className="lg:col-span-5 bento-card relative overflow-hidden"
            style={{ borderRadius: "var(--radius-xl)" }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(126, 200, 163, 0.2) 0%, transparent 50%)"
                  : "linear-gradient(135deg, rgba(201, 100, 66, 0.15) 0%, transparent 50%)",
              }}
            />
            <img
              src={aboutData.image}
              alt="About Kassem Haidar"
              className="w-full h-[500px] lg:h-full object-cover rounded-[var(--radius-xl)] relative z-10"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
            />

            {/* Floating Badge */}
            <div
              className="absolute bottom-6 left-6 right-6 p-4 rounded-xl z-20"
              style={{
                background: "var(--gradient-card)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--color-border)",
              }}
            >
              <p className="text-sm font-medium text-[var(--color-text)]">
                Computer Engineer &{" "}
                <span className="text-[var(--color-accent)]">
                  MERN Developer
                </span>
              </p>
            </div>
          </div>

          {/* Content Cards - Right */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Who I Am & My Approach */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                className="bento-card"
                style={{ borderRadius: "var(--radius-xl)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`bx ${aboutData.aboutNarrative.whoAmI.icon} text-xl text-[var(--color-accent)]`}
                  />
                </div>
                <h3 className="font-semibold text-[var(--color-text)] text-lg mb-2">
                  Who I am
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {aboutData.aboutNarrative.whoAmI.text}
                </p>
              </div>

              <div
                className="bento-card"
                style={{ borderRadius: "var(--radius-xl)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`bx ${aboutData.aboutNarrative.approach.icon} text-xl text-[var(--color-accent)]`}
                  />
                </div>
                <h3 className="font-semibold text-[var(--color-text)] text-lg mb-2">
                  My approach
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {aboutData.aboutNarrative.approach.text}
                </p>
              </div>
            </div>

            {/* Personal Info */}
            <div
              className="bento-card flex-1"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text)] mb-4">
                <i className="bx bx-info-circle text-[var(--color-accent)]" />
                Personal Info
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {aboutData.biodata.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-muted)]/30"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                      style={{ background: "var(--color-accent-muted)" }}
                    >
                      <i
                        className={`${item.icon} text-base text-[var(--color-accent)]`}
                      />
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text-muted)] block">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)] truncate block">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Button */}
            <Tippy content={aboutData.resume.label} placement="top">
              <div>
                <button
                  onClick={handleResumeClick}
                  className="btn-primary w-full sm:w-auto"
                >
                  <i className="bx bx-download text-lg" />
                  {aboutData.resume.label}
                </button>
              </div>
            </Tippy>
          </div>
        </div>
      </div>
    </section>
  );
}
