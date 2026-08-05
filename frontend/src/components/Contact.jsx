import { useState } from "react";
import contactData from "../data/contactData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";
import WhishDonateButton from "./ui/WhishButton.jsx";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass =
    "w-full px-4 py-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] backdrop-blur-md text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none input-glow transition-all duration-300 font-medium text-sm";

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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)] mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            Let's Collaborate
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {contactData.title}
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
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
                className="bento-card rainbow-card flex items-center gap-4 group animate-slide-up"
                style={{
                  borderRadius: "var(--radius-xl)",
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm"
                  style={{ background: "var(--color-accent-muted)" }}
                >
                  <i
                    className={`${item.icon} text-2xl text-[var(--color-accent)]`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-extrabold text-[var(--color-text)] block group-hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {item.label}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-muted)] truncate block mt-0.5">
                    {item.description}
                  </span>
                </div>
                <i className="bx bx-chevron-right text-2xl text-[var(--color-text-muted)] group-hover:translate-x-1 group-hover:text-[var(--color-accent)] transition-all" />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div
            className="lg:col-span-3 bento-card rainbow-card animate-slide-up stagger-3"
            style={{
              borderRadius: "var(--radius-xl)",
            }}
          >
            <h3 className="text-lg font-extrabold text-[var(--color-text)] mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <i className="bx bx-envelope text-xl text-[var(--color-accent)]" />
              Send a message
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Your Message
                </label>
                <textarea
                  placeholder="Hello, I'd like to discuss a project..."
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
                  className="btn-primary w-full justify-center py-4 font-bold text-base shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <i className="bx bx-loader-alt animate-spin text-xl" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-send text-xl" />
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
