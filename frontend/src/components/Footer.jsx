import footerData from "../data/footerData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import PrivacyPolicyModal from "./PrivacyPolicyModal.jsx";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import SectionReveal, {
  StaggerContainer,
  StaggerItem,
} from "./ui/SectionReveal.jsx";

export default function Footer() {
  const [activeModal, setActiveModal] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className="relative z-10 pt-10">
      <div
        className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-border)]"
        style={{
          background: isDark
            ? "rgba(7, 9, 14, 0.95)"
            : "rgba(248, 250, 252, 0.95)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <StaggerContainer
            amount={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand */}
            <StaggerItem variant="fade-up" className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-2xl font-extrabold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-gradient">Kassem Haidar</span>
                  <span className="text-[var(--color-text)]">.</span>
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mb-3 leading-relaxed font-medium">
                {footerData.brand.description}
              </p>
              <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                {footerData.brand.phone}
              </p>
            </StaggerItem>

            {/* Navigation */}
            <StaggerItem variant="fade-up">
              <h4
                className="flex items-center gap-2 text-xs font-extrabold text-[var(--color-text)] uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <i
                  className={`${footerData.navigationIcon} text-base text-[var(--color-accent)]`}
                />
                Navigation
              </h4>
              <ul className="flex flex-col gap-3 text-sm font-semibold">
                {footerData.navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:translate-x-1 transition-all inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            {/* Socials */}
            <StaggerItem variant="fade-up">
              <h4
                className="flex items-center gap-2 text-xs font-extrabold text-[var(--color-text)] uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <i
                  className={`${footerData.socialsIcon} text-base text-[var(--color-accent)]`}
                />
                Social Profiles
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
                      className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--color-surface-glass)] border border-[var(--color-border)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                      aria-label={social.label}
                    >
                      <i className={`${social.icon} text-xl`} />
                    </a>
                  </Tippy>
                ))}
              </div>
            </StaggerItem>

            {/* Newsletter */}
            <StaggerItem variant="fade-up">
              <h4
                className="flex items-center gap-2 text-xs font-extrabold text-[var(--color-text)] uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <i className="bx bx-mail-send text-base text-[var(--color-accent)]" />
                {footerData.formSubscription.title}
              </h4>
              <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed font-medium">
                {footerData.formSubscription.description}
              </p>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder={footerData.formSubscription.placeholder}
                  className="px-4 py-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] backdrop-blur-md text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none input-glow text-sm font-medium"
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
                    className="btn-primary text-xs font-extrabold uppercase tracking-wider py-3 justify-center"
                  >
                    {footerData.formSubscription.buttonText}
                    <i className="bx bx-send text-sm" />
                  </button>
                </Tippy>
              </form>
            </StaggerItem>
          </StaggerContainer>

          <div className="h-px bg-[var(--color-border)] mb-8" />

          {/* Bottom Bar */}
          <SectionReveal
            variant="fade-up"
            amount={0.1}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold"
          >
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
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="text-[var(--color-text-muted)] uppercase tracking-wider">
              {footerData.copyright}
            </div>
          </SectionReveal>
        </div>

        {activeModal === "privacy&policy" && (
          <PrivacyPolicyModal onClose={() => setActiveModal("")} />
        )}
      </div>
    </footer>
  );
}
