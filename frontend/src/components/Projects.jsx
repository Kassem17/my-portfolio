import projectData from "../data/projectData.jsx";
import Tippy from "@tippyjs/react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2 uppercase tracking-wider">
            My Work
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {projectData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto">
            {projectData.subtitle}
          </p>
        </div>

        {/* Projects Grid - Bento Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectData.projects.map((project, index) => (
            <article
              key={project.title}
              className="bento-card group relative overflow-hidden"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              {/* Status Badge */}
              {project.status === "In Progress" && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--color-accent-muted)",
                    color: "var(--color-accent)",
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    In Progress
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "var(--color-accent-muted)" }}
              >
                <i
                  className={`bx ${project.icon} text-2xl text-[var(--color-accent)]`}
                />
              </div>

              {/* Content */}
              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                  style={{
                    background: "var(--color-accent-muted)",
                    color: "var(--color-accent)",
                  }}
                >
                  {project.type}
                </span>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  {project.title}
                </h3>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-5">
                {project.features.slice(0, 3).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
                  >
                    <i className="bx bx-check text-[var(--color-accent)] text-base" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                {project.demo !== "#home" && (
                  <Tippy content="View Demo" placement="top">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl text-center text-sm font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                    >
                      <i className="bx bx-show mr-1" /> View
                    </a>
                  </Tippy>
                )}
                <Tippy content="View Code" placement="top">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl text-center text-sm font-medium bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <i className="bx bxl-github mr-1" /> Code
                  </a>
                </Tippy>
              </div>

              {/* Year */}
              <div className="absolute bottom-4 right-4 text-xs font-medium text-[var(--color-text-muted)]">
                {project.year}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
