import { useState } from "react";
import contactData from "../data/contactData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] backdrop-blur-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-300";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const res = await fetch("https://getform.io/f/avrygdma", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          title: "Message sent!",
          text: "I'll get back to you soon.",
          icon: "success",
          confirmButtonColor: "var(--color-accent)",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        Swal.fire({
          title: "Something went wrong",
          text: "Please try again later.",
          icon: "error",
          confirmButtonColor: "var(--color-accent)",
        });
      }
    } catch {
      Swal.fire({
        title: "Network error",
        text: "Unable to send. Check your connection.",
        icon: "error",
        confirmButtonColor: "var(--color-accent)",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2 uppercase tracking-wider">
            Get In Touch
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {contactData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactData.socials.map((item, index) => (
              <a
                key={item.label}
                href={
                  item.label === "Email" ? `mailto:${item.href}` : item.href
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card flex items-center gap-4 group"
                style={{ borderRadius: "var(--radius-xl)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`${item.icon} text-xl text-[var(--color-accent)]`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-[var(--color-text)] block">
                    {item.label}
                  </span>
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {item.description}
                  </span>
                </div>
                <i className="bx bx-chevron-right text-xl text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div
            className="lg:col-span-3 bento-card"
            style={{
              borderRadius: "var(--radius-xl)",
              background: isDark
                ? "rgba(20, 28, 39, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
            }}
          >
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-5 flex items-center gap-2">
              <i className="bx bx-envelope text-[var(--color-accent)]" />
              Send a message
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Your Message
                </label>
                <textarea
                  placeholder="Hello, I'd like to discuss..."
                  className={`${inputClass} min-h-[140px] resize-y`}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  required
                />
              </div>

              <Tippy content="Send message" placement="top">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <i className="bx bx-loader-alt animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-send text-lg" />
                      Send Message
                    </>
                  )}
                </button>
              </Tippy>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
