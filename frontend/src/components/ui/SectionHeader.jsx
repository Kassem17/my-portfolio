export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <header className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2
        className="heading-display heading-lg text-[var(--color-text)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  );
}
