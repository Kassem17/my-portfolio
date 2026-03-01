import footerData from "../data/footerData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import PrivacyPolicyModal from "./PrivacyPolicyModal.jsx";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Footer() {
  const [activeModal, setActiveModal] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: isDark
          ? "rgba(15, 20, 25, 0.95)"
          : "rgba(245, 240, 235, 0.95)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[var(--color-accent)]">Kassem Haidar</span>
                <span className="text-[var(--color-text)]">.</span>
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              {footerData.brand.description}
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {footerData.brand.phone}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-4">
              <i
                className={`${footerData.navigationIcon} text-[var(--color-accent)]`}
              />
              Navigation
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {footerData.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-4">
              <i
                className={`${footerData.socialsIcon} text-[var(--color-accent)]`}
              />
              Find me online
            </h4>
            <div className="flex flex-wrap gap-3">
              {footerData.socials.map((social) => (
                <Tippy
                  key={social.label}
                  content={social.label}
                  placement="top"
                >
                  <a
                    href={
                      social.label === "Email"
                        ? `mailto:${social.href}`
                        : social.href
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--color-accent-muted)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-lg`} />
                  </a>
                </Tippy>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3">
              <i className="bx bx-mail-send text-[var(--color-accent)]" />
              {footerData.formSubscription.title}
            </h4>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              {footerData.formSubscription.description}
            </p>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={footerData.formSubscription.placeholder}
                className="px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] backdrop-blur-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm"
              />
              <Tippy content="Coming soon">
                <button
                  type="button"
                  onClick={() =>
                    Swal.fire({
                      title: "Coming soon",
                      text: "Newsletter signup isn't live yet. Stay tuned!",
                      icon: "info",
                      confirmButtonColor: "var(--color-accent)",
                    })
                  }
                  className="btn-primary text-sm py-3 justify-center"
                >
                  {footerData.formSubscription.buttonText}
                  <i className="bx bx-send text-sm" />
                </button>
              </Tippy>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-wrap gap-4 justify-center">
            {footerData.legalLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() =>
                  setActiveModal(
                    link.name === "privacy&policy" ? link.name : "",
                  )
                }
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="text-[var(--color-text-muted)]">
            {footerData.copyright}
          </div>
        </div>
      </div>

      {activeModal === "privacy&policy" && (
        <PrivacyPolicyModal onClose={() => setActiveModal("")} />
      )}
    </footer>
  );
}
