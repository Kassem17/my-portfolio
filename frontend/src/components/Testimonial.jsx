import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext.jsx";

const CustomModal = ({ isOpen, onClose, children }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-xl transition-opacity"
        onClick={onClose}
        style={{ background: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)" }}
      />

      {/* Modal Content */}
      <div
        className="relative rounded-2xl shadow-xl max-w-md w-full transform transition-all"
        style={{
          background: isDark
            ? "var(--color-bg-elevated)"
            : "var(--color-surface)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Close modal"
        >
          <i className="bx bx-x text-2xl"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Fetch testimonials from Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Testimonial is required";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Testimonial must be at least 10 characters";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          content: formData.content,
          position: formData.position,
          rating: 5,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            formData.name,
          )}&background=c96442&color=fff&size=100`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit testimonial");
      }

      const data = await response.json();

      // Refetch testimonials
      const res = await fetch("http://localhost:5000/api/testimonials");
      const updated = await res.json();
      setTestimonials(updated);

      // Reset
      setFormData({ name: "", email: "", content: "", position: "" });
      setIsModalOpen(false);
      setIsSubmitting(false);

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Testimonial submitted successfully!",
        confirmButtonColor: "var(--color-accent)",
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting testimonial:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit testimonial. Please try again.",
        confirmButtonColor: "var(--color-accent)",
      });
    }
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`bx bxs-star text-sm ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border ${
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
        : "border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]"
    } bg-[var(--color-surface-glass)] backdrop-blur-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 transition-all duration-300`;

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[var(--color-accent)] mb-2 uppercase tracking-wider">
            Testimonials
          </p>
          <h2
            className="heading-display heading-lg text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What People Say
          </h2>
          <p className="text-[var(--color-text-muted)] mt-3 max-w-2xl mx-auto">
            Voices from clients, collaborators, and friends who have experienced
            my work.
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          className="bento-card max-w-4xl mx-auto"
          style={{ borderRadius: "var(--radius-xl)" }}
        >
          {/* Card Header */}
          <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
              <i className="bx bx-comment-detail text-2xl text-[var(--color-accent)]" />
              Testimonials
            </h3>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-sm py-2.5"
              aria-label="Add a new testimonial"
            >
              <i className="bx bx-plus text-lg" />
              Add Testimonial
            </button>
          </div>

          {/* Card Body */}
          <div className="max-h-[500px] overflow-y-auto scrollbar-hide p-6">
            {testimonials.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="bento-card"
                    style={{ borderRadius: "var(--radius-lg)" }}
                  >
                    {/* Quote Icon */}
                    <div className="mb-3">
                      <i className="bx bxs-quote-alt-left text-3xl text-[var(--color-accent)]/30" />
                    </div>

                    {/* Content */}
                    <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed text-sm">
                      {testimonial.content}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={`Avatar of ${testimonial.name}`}
                        className="w-12 h-12 rounded-full shadow-lg object-cover ring-2 ring-[var(--color-accent)]"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            testimonial.name,
                          )}&background=c96442&color=fff&size=48`;
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-[var(--color-text)] text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="bx bx-message-dots text-6xl text-[var(--color-accent)]/30 mb-4" />
                <p className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  No Testimonials Yet
                </p>
                <p className="text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
                  Be the first to share your experience and inspire others with
                  your story!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--gradient-primary)" }}
            >
              <i className="bx bx-message-dots text-xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
              Share Your Testimonial
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Tell us about your experience working with us
            </p>
          </div>

          <div className="grid gap-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Full Name
              </label>
              <div className="relative">
                <i className="bx bx-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass(errors.name)}
                  placeholder="Enter your full name"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <i className="bx bx-error-circle" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Email
              </label>
              <div className="relative">
                <i className="bx bx-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass(errors.email)}
                  placeholder="name@email.com"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <i className="bx bx-error-circle" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Position Input */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Position
              </label>
              <div className="relative">
                <i className="bx bx-briefcase absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={inputClass(errors.position)}
                  placeholder="CEO, Developer, Designer, etc."
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
              {errors.position && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <i className="bx bx-error-circle" />
                  {errors.position}
                </p>
              )}
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Testimonial
              </label>
              <div className="relative">
                <i className="bx bx-message-detail absolute left-3 top-4 text-[var(--color-text-muted)]" />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="4"
                  className={inputClass(errors.content)}
                  placeholder="Share your experience..."
                  style={{ paddingLeft: "2.5rem", resize: "none" }}
                />
              </div>
              {errors.content && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <i className="bx bx-error-circle" />
                  {errors.content}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] rounded-xl text-sm font-medium hover:bg-[var(--color-accent-muted)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary flex-1 justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="bx bx-loader-alt animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="bx bx-send" />
                    Submit
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </CustomModal>
    </section>
  );
};

export default Testimonials;
