// src/components/PrivacyPolicyModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PrivacyPolicyModal = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-11/12 md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl font-bold transition-transform hover:scale-110"
          >
            &times;
          </button>

          {/* Header with gradient */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Effective Date: January 19, 2026
            </p>
          </div>

          {/* Modal content */}
          <div className="space-y-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <p>
              At <strong>Your Portfolio Name</strong>, your privacy is important
              to us. This Privacy Policy explains how we collect, use, and
              protect your information when you visit our website.
            </p>

            <h2 className="text-xl font-semibold mt-4">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information that you voluntarily provide,
              such as:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Message submitted through our contact form</li>
            </ul>
            <p>
              We may also automatically collect non-personal information,
              including IP address, browser type, pages visited, and visit time.
            </p>

            <h2 className="text-xl font-semibold mt-4">
              2. How We Use Your Information
            </h2>
            <p>
              Your information may be used to respond to inquiries, provide
              information about our work, improve our website, and analyze
              usage.
            </p>

            <h2 className="text-xl font-semibold mt-4">
              3. Sharing Your Information
            </h2>
            <p>
              We do not sell or rent your personal information. We may share it
              with trusted third-party services to operate our website, who are
              obligated to keep it confidential.
            </p>

            <h2 className="text-xl font-semibold mt-4">
              4. Cookies & Tracking
            </h2>
            <p>
              Our site may use cookies to enhance your experience. You can
              disable cookies in your browser, but some features may not work
              properly.
            </p>

            <h2 className="text-xl font-semibold mt-4">5. Data Security</h2>
            <p>
              We implement reasonable measures to protect your data, but no
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-4">6. Third-Party Links</h2>
            <p>
              Our portfolio may include external links. We are not responsible
              for the privacy practices of third-party sites.
            </p>

            <h2 className="text-xl font-semibold mt-4">
              7. Children’s Privacy
            </h2>
            <p>
              Our website is not directed at children under 13, and we do not
              knowingly collect their information.
            </p>

            <h2 className="text-xl font-semibold mt-4">8. Your Rights</h2>
            <p>
              You can request access, correction, or deletion of your data, or
              opt out of communications by contacting us at{" "}
              <a
                href="mailto:youremail@example.com"
                className="text-blue-500 underline hover:text-blue-700"
              >
                youremail@example.com
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold mt-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this policy from time to time. Updates will be
              posted on this page with a new effective date.
            </p>

            <h2 className="text-xl font-semibold mt-4">10. Contact Us</h2>
            <p>
              For questions or concerns, contact us at{" "}
              <a
                href="mailto:youremail@example.com"
                className="text-blue-500 underline hover:text-blue-700"
              >
                youremail@example.com
              </a>
              .
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;
