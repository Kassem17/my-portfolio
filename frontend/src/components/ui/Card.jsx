import React from "react";
import { motion } from "framer-motion";

// Reusable Card Component with motion support
export const Card = ({ children, className = "", onClick }) => {
  const Component = onClick ? motion.div : "div";

  const baseProps = {
    className: `bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 dark:shadow-gray-900/30 ${className}`,
  };

  if (onClick) {
    return (
      <Component
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={onClick}
        {...baseProps}
      >
        {children}
      </Component>
    );
  }

  return <div {...baseProps}>{children}</div>;
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};
