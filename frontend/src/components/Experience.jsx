import { useState } from "react";
import experienceData from "../data/experinceData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";
import SectionReveal, {
  StaggerContainer,
  StaggerItem,
} from "./ui/SectionReveal.jsx";

export default function Experience() {
  const [activeTab, setActiveTab] = useState("Work");
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();
  const perPage = 6;

  const filtered = experienceData.experiences.filter(
    (e) => e.tab.toLowerCase() === activeTab.toLowerCase(),
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const openLink = (url, fallbackTitle) => {
    if (!url) {
      Swal.fire({
        title: "Not available",
        text: `${fallbackTitle} is not available yet.`,
        icon: "info",
        confirmButtonColor: "var(--color-accent)",
      });
      return;
    }
    Swal.fire({
      title: "Open link?",
      showCancelButton: true,
      confirmButtonColor: "var(--color-accent)",
      cancelButtonColor: "#6b7280",
    }).then(
      (r) => r.isConfirmed && window.open(url, "_blank", "noopener,noreferrer"),
    );
  };

  const tabClass = (isActive) =>
    `flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? "text-white shadow-lg bg-[var(--gradient-electric)]"
        : "bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    }`;

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fade-up" className="text-center mb-16">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)] mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            Career History
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {experienceData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
            {experienceData.subtitle}
          </p>
        </SectionReveal>

        {/* Tabs */}
        <SectionReveal
          variant="fade-up"
          delay={0.1}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {experienceData.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={tabClass(activeTab === tab)}
            >
              <i
                className={`bx ${tab.toLowerCase() === "work" ? "bx-briefcase" : "bx-group"} text-lg`}
              />
              {tab}
            </button>
          ))}
        </SectionReveal>

        {/* Experience Cards Grid */}
        <StaggerContainer
          key={activeTab + currentPage}
          amount={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {current.map((exp, index) => (
            <StaggerItem
              key={exp.title + exp.company}
              variant="fade-up"
              className="bento-card rainbow-card group relative overflow-hidden flex flex-col justify-between"
              style={{
                borderRadius: "var(--radius-xl)",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`bx ${exp.icon} text-3xl text-[var(--color-accent)]`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-lg font-extrabold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {exp.title}
                  </h3>
                  <p className="text-xs font-bold text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">
                    {[exp.company, exp.year, exp.location]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Key Deliverables
                </h4>
                <ul className="text-sm font-medium text-[var(--color-text-muted)] space-y-1.5">
                  {exp.description.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="bx bx-check text-[var(--color-accent)] mt-0.5 text-base shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs rounded-lg font-bold bg-[var(--color-accent-muted)] border border-[var(--color-border)] text-[var(--color-text-secondary)] shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-[var(--color-border)]">
                {exp.details && (
                  <Tippy content="Details" placement="top">
                    <button
                      type="button"
                      onClick={() => openLink(exp.details, "Details")}
                      className="flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-[var(--gradient-electric)] text-white hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      Details <i className="bx bx-link-external text-sm" />
                    </button>
                  </Tippy>
                )}
                {exp.companyUrl && (
                  <Tippy content="Company" placement="top">
                    <button
                      type="button"
                      onClick={() => openLink(exp.companyUrl, "Company link")}
                      className="flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all flex items-center justify-center gap-1.5"
                    >
                      Company <i className="bx bx-building text-sm" />
                    </button>
                  </Tippy>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <i className="bx bx-chevron-left text-xl" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentPage === page
                    ? "text-white shadow-md bg-[var(--gradient-electric)]"
                    : "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <i className="bx bx-chevron-right text-xl" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
