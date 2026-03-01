import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fall from "../assets/Fall.png";
import Spring from "../assets/spring.png";
import Javascript from "../assets/javascript.png";
import Python from "../assets/python.png";
import { Card, CardContent } from "./ui/Card.jsx";

const certificates = [
  { name: "Certificate 1", date: "2023 - 2024", image: Fall },
  { name: "Certificate 2", date: "2023 - 2024", image: Spring },
  { name: "Certificate 3", date: "20-9-2025", image: Javascript },
  { name: "Certificate 4", date: "25-9-2025", image: Python },
];

// Enhanced Modal Component with better design
const CertificateModal = ({
  isOpen,
  onClose,
  certificate,
  onNext,
  onPrev,
  currentIndex,
  total,
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-gray-700 dark:text-white transition-all duration-200 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Counter */}
            <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-sm font-medium text-gray-700 dark:text-white">
              {currentIndex + 1} / {total}
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6 p-6 lg:p-8">
              {/* Left Arrow */}
              <button
                onClick={onPrev}
                className="hidden lg:flex w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[var(--color-accent)] hover:text-white dark:hover:bg-[var(--color-accent)] items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-110 flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Certificate Image */}
              <motion.div
                key={certificate?.image}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 w-full flex items-center justify-center"
              >
                <img
                  src={certificate?.image}
                  alt={certificate?.name}
                  className="max-h-[60vh] lg:max-h-[70vh] w-auto rounded-2xl shadow-lg object-contain"
                />
              </motion.div>

              {/* Right Arrow */}
              <button
                onClick={onNext}
                className="hidden lg:flex w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[var(--color-accent)] hover:text-white dark:hover:bg-[var(--color-accent)] items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-110 flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Certificate Info */}
            <div className="px-6 lg:px-8 pb-6 lg:pb-8 text-center">
              <motion.h3
                key={certificate?.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white"
              >
                {certificate?.name}
              </motion.h3>
              <motion.p
                key={certificate?.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-gray-500 dark:text-gray-400 mt-2 text-lg"
              >
                {certificate?.date}
              </motion.p>
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden justify-center gap-4 pb-6">
              <button
                onClick={onPrev}
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[var(--color-accent)] hover:text-white flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={onNext}
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[var(--color-accent)] hover:text-white flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Section View Component
const CertificatesSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const nextCert = () =>
    setSelectedIndex((prev) => (prev + 1) % certificates.length);

  const prevCert = () =>
    setSelectedIndex((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1,
    );

  return (
    <section className="w-full py-20 px-6 md:px-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            My Certificates
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
            Click a certificate to preview in full view.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                onClick={() => openModal(index)}
                className="cursor-pointer overflow-hidden group"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {cert.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {cert.date}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <CertificateModal
        isOpen={selectedIndex !== null}
        onClose={closeModal}
        certificate={certificates[selectedIndex]}
        onNext={nextCert}
        onPrev={prevCert}
        currentIndex={selectedIndex}
        total={certificates.length}
      />
    </section>
  );
};

// Modal View Component (for Hero section)
const CertificatesModalView = ({ isOpen, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModalWrapper = () => {
    setSelectedIndex(null);
    onClose();
  };

  const nextCert = () =>
    setSelectedIndex((prev) => (prev + 1) % certificates.length);

  const prevCert = () =>
    setSelectedIndex((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1,
    );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={closeModalWrapper}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeModalWrapper}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-gray-700 dark:text-white transition-all duration-200 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center pt-8 px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              My Certificates
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Click a certificate to preview in full view.
            </p>
          </div>

          {/* Grid */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => openModal(index)}
                    className="cursor-pointer overflow-hidden group"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="text-center">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {cert.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {cert.date}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Detail Modal */}
        <CertificateModal
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          certificate={certificates[selectedIndex]}
          onNext={nextCert}
          onPrev={prevCert}
          currentIndex={selectedIndex}
          total={certificates.length}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// Main Component with isModal prop
export default function Certificates({ isModal = false, onClose }) {
  if (isModal) {
    return <CertificatesModalView isOpen={true} onClose={onClose} />;
  }
  return <CertificatesSection />;
}
