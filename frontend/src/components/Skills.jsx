import { useState } from "react";
import skillsData from "../data/skillData.jsx";
import Tippy from "@tippyjs/react";
import { useTheme } from "../context/ThemeContext.jsx";

const levelDescriptions = {
  Advanced: "Proficient in complex tasks",
  Intermediate: "Comfortable with common tasks",
  Basic: "Learning and experimenting",
  Beginner: "Getting started",
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const perPage = 6;

  const category = skillsData.categories.find(
    (c) => c.title.toLowerCase() === activeTab.toLowerCase(),
  );
  const skills = category ? category.skills : [];
  const totalPages = Math.ceil(skills.length / perPage);
  const start = (currentPage - 1) * perPage;
  const current = skills.slice(start, start + perPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const tabClass = (isActive) =>
    `flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-white shadow-lg"
        : "bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    }`;

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2 uppercase tracking-wider">
            My Expertise
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {skillsData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto">
            {skillsData.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {skillsData.categories.map((cat) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => {
                setActiveTab(cat.title);
                setCurrentPage(1);
              }}
              className={tabClass(activeTab === cat.title)}
              style={
                activeTab === cat.title
                  ? { background: "var(--gradient-primary)" }
                  : {}
              }
            >
              <i className={`bx ${cat.icon}`} />
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid - Bento Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {current.map((skill, index) => (
            <Tippy
              key={skill.name}
              content={levelDescriptions[skill.level] || skill.level}
              placement="top"
            >
              <article
                className="bento-card group cursor-pointer"
                style={{ borderRadius: "var(--radius-xl)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "var(--color-accent-muted)" }}
                  >
                    <i
                      className={`bx ${skill.icon} text-2xl text-[var(--color-accent)]`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[var(--color-text)] mb-1">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {skill.level}
                    </p>
                  </div>
                  {/* Hover indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="bx bx-arrow-right text-lg text-[var(--color-accent)]" />
                  </div>
                </div>
              </article>
            </Tippy>
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
