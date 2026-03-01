const variantStyles = {
  primary:
    "bg-[var(--color-accent)] text-white hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
  secondary:
    "bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] backdrop-blur-sm",
  ghost:
    "text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-accent)]",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none";
  const variantClass = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      className={`${base} ${variantClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <i className={`${icon} text-lg`} aria-hidden />}
      {children}
      {icon && iconPosition === "right" && <i className={`${icon} text-lg`} aria-hidden />}
    </button>
  );
}
