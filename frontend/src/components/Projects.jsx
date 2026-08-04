import { useRef } from "react";
import projectData from "../data/projectData.jsx";
import Tippy from "@tippyjs/react";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const animFrameRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) hover:text-bold hover:text-white`;
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bento-card rainbow-card group relative overflow-hidden animate-slide-up"
      style={{
        borderRadius: "var(--radius-xl)",
        transition: "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease",
        willChange: "transform",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Status Badge */}
      {project.status === "In Progress" && (
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10"
          style={{
            background: "var(--color-accent-muted)",
            color: "var(--color-accent)",
          }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-ping" />
            In Progress
          </span>
        </div>
      )}

      {/* Icon with hover rotation */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 z-10 relative shadow-sm"
        style={{ background: "var(--color-accent-muted)" }}
      >
        <i
          className={`bx ${project.icon} text-2xl text-[var(--color-accent)]`}
        />
      </div>

      {/* Content */}
      <div className="mb-4 relative z-10 ">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 hover:text-bold hover:text-white"
          style={{
            background: "var(--color-accent-muted)",
            color: "var(--color-accent)",
          }}
        >
          {project.type}
        </span>
        <h3 className="text-xl font-extrabold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors group-hover:font-bold group-hover:text-white" style={{ fontFamily: "var(--font-display)" }}>
          {project.title}
        </h3>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-5 relative z-10">
        {project.features.slice(0, 3).map((feature, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)]"
          >
            <i className="bx bx-check text-[var(--color-accent)] text-base shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-5 relative z-10">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[var(--color-accent-muted)] border border-[var(--color-border)] text-[var(--color-text-secondary)] shadow-2xs"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)] relative z-10">
        {project.demo !== "#home" && (
          <Tippy content="View Live Demo" placement="top">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl text-center text-xs font-extrabold uppercase tracking-wider bg-[var(--gradient-electric)] text-white hover:opacity-90 transition-all hover:shadow-md flex items-center justify-center gap-1.5"
            >
              <i className="bx bx-show text-base" /> View Demo
            </a>
          </Tippy>
        )}
        <Tippy content="View Source Code" placement="top">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl text-center text-xs font-extrabold uppercase tracking-wider bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all flex items-center justify-center gap-1.5"
          >
            <i className="bx bxl-github text-base" /> Code
          </a>
        </Tippy>
      </div>

      {/* Year */}
      <div className="absolute bottom-4 right-4 text-xs font-bold text-[var(--color-text-muted)] opacity-60">
        {project.year}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)] mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            Selected Works
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {projectData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
            {projectData.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectData.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
