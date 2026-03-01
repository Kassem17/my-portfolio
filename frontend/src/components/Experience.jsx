import { useState } from "react";
import experienceData from "../data/experinceData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Experience() {
  const [activeTab, setActiveTab] = useState("Work");
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
    `flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-white shadow-lg"
        : "bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    }`;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2 uppercase tracking-wider">
            My Journey
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {experienceData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto">
            {experienceData.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {experienceData.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={tabClass(activeTab === tab)}
              style={
                activeTab === tab
                  ? { background: "var(--gradient-primary)" }
                  : {}
              }
            >
              <i
                className={`bx ${tab.toLowerCase() === "work" ? "bx-briefcase" : "bx-group"}`}
              />
              {tab}
            </button>
          ))}
        </div>

        {/* Experience Cards - Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {current.map((exp) => (
            <article
              key={exp.title + exp.company}
              className="bento-card"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`bx ${exp.icon} text-3xl text-[var(--color-accent)]`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {[exp.company, exp.year, exp.location]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">
                  Responsibilities
                </h4>
                <ul className="text-sm text-[var(--color-text-muted)] space-y-1.5">
                  {exp.description.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="bx bx-check text-[var(--color-accent)] mt-0.5 text-base" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">
                  Tech
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs rounded-lg font-medium bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
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
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center gap-2"
                    >
                      Company <i className="bx bx-building text-sm" />
                    </button>
                  </Tippy>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <i className="bx bx-chevron-left" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentPage === page
                    ? "text-white shadow-md"
                    : "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
                }`}
                style={
                  currentPage === page
                    ? { background: "var(--gradient-primary)" }
                    : {}
                }
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
              <i className="bx bx-chevron-right" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
