import { useTheme } from "../context/ThemeContext.jsx";

export default function PrivacyPolicyModal({ onClose }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 relative"
        style={{
          background: isDark
            ? "var(--color-bg-elevated)"
            : "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-accent)] transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          <i className="bx bx-x" />
        </button>

        <div className="mb-6 text-center">
          <h1
            className="text-2xl md:text-3xl font-bold text-[var(--color-accent)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Effective: January 19, 2026
          </p>
        </div>

        <div className="space-y-5 text-sm text-[var(--color-text-muted)] leading-relaxed">
          <p>
            At{" "}
            <strong className="text-[var(--color-text)]">
              Kassem Haidar Portfolio
            </strong>
            , your privacy matters. This policy explains how we collect, use,
            and protect your information when you use this site.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 flex items-center gap-2">
            <i className="bx bx-collection text-[var(--color-accent)]" />
            1. Information we collect
          </h2>
          <p>
            We may collect information you provide (e.g. name, email, message
            via the contact form) and automatic data (IP, browser, pages
            visited).
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 flex items-center gap-2">
            <i className="bx bx-cog text-[var(--color-accent)]" />
            2. How we use it
          </h2>
          <p>
            We use it to respond to inquiries, improve the site, and analyze
            usage.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 flex items-center gap-2">
            <i className="bx bx-share-alt text-[var(--color-accent)]" />
            3. Sharing
          </h2>
          <p>
            We do not sell your data. We may share it only with trusted services
            that help operate this site, under confidentiality obligations.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 flex items-center gap-2">
            <i className="bx bx-cookie text-[var(--color-accent)]" />
            4. Cookies
          </h2>
          <p>
            We may use cookies to improve experience. You can disable them in
            your browser.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 flex items-center gap-2">
            <i className="bx bx-shield text-[var(--color-accent)]" />
            5. Security
          </h2>
          <p>
            We take reasonable measures to protect your data; no internet
            transmission is 100% secure.
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 flex items-center gap-2">
            <i className="bx bx-user-check text-[var(--color-accent)]" />
            6. Your rights
          </h2>
          <p>
            You can request access, correction, or deletion of your data.
            Contact:{" "}
            <a
              href="mailto:kassemhaidar290@gmail.com"
              className="text-[var(--color-accent)] underline hover:no-underline font-medium"
            >
              kassemhaidar290@gmail.com
            </a>
          </p>

          <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 flex items-center gap-2">
            <i className="bx bx-sync text-[var(--color-accent)]" />
            7. Changes
          </h2>
          <p>
            We may update this policy; the effective date will be revised
            accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
