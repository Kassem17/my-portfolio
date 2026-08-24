import { useState } from "react";
import skillsData from "../data/skillData.jsx";
import Tippy from "@tippyjs/react";
import { useTheme } from "../context/ThemeContext.jsx";
import OrbitingSkills from "./3d/OrbitingSkills.jsx";
import SectionReveal, {
  StaggerContainer,
  StaggerItem,
} from "./ui/SectionReveal.jsx";

const levelPercent = {
  Advanced: 90,
  Intermediate: 70,
  Basic: 45,
  Beginner: 30,
  AdvancedBeginner: 30,
};

const levelDescriptions = {
  Advanced: "Proficient in complex tasks & production code",
  Intermediate: "Comfortable building features independently",
  Basic: "Learning and building personal projects",
  Beginner: "Getting started & exploring basics",
};

function ProgressRing({ percent, isDark }) {
  const radius = 16;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const accentColor = isDark ? "#a78bfa" : "#8b5cf6";

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="progress-ring shrink-0"
    >
      <circle
        stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={accentColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="progress-ring__circle"
      />
    </svg>
  );
}

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
    `flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? "text-white shadow-lg bg-[var(--gradient-electric)]"
        : "bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    }`;

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fade-up" className="text-center mb-12">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)] mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            Core Stack
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {skillsData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
            {skillsData.subtitle}
          </p>
        </SectionReveal>

        {/* 3D Orbiting Skill Canvas */}
        <SectionReveal variant="scale-up" delay={0.1}>
          <OrbitingSkills categories={skillsData.categories} />
        </SectionReveal>

        {/* Category Tabs */}
        <SectionReveal
          variant="fade-up"
          delay={0.15}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {skillsData.categories.map((cat) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => {
                setActiveTab(cat.title);
                setCurrentPage(1);
              }}
              className={tabClass(activeTab === cat.title)}
            >
              <i className={`bx ${cat.icon} text-lg`} />
              {cat.title}
            </button>
          ))}
        </SectionReveal>

        {/* Skills Grid */}
        <StaggerContainer
          key={activeTab + currentPage}
          amount={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {current.map((skill) => {
            const pct = levelPercent[skill.level] || 50;
            return (
              <Tippy key={skill.name} placement="none">
                <StaggerItem
                  variant="fade-up"
                  className="bento-card rainbow-card group cursor-pointer"
                  style={{
                    borderRadius: "var(--radius-xl)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm"
                      style={{ background: "var(--color-accent-muted)" }}
                    >
                      <i
                        className={`bx ${skill.icon} text-2xl text-[var(--color-accent)]`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-bold text-[var(--color-text)] mb-0.5 group-hover:text-[var(--color-accent)] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {skill.name}
                      </h3>
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                        {skill.level}
                      </p>
                    </div>

                    <ProgressRing percent={pct} isDark={isDark} />
                  </div>
                </StaggerItem>
              </Tippy>
            );
          })}
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
