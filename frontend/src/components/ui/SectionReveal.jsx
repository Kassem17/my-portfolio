import { motion } from "framer-motion";

// Optimized hardware-accelerated variants using 3D transforms & out-expo easing
const variantsMap = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -35 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 35 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

const defaultTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1], // Crisp out-expo easing for zero-lag feeling
};

export default function SectionReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.45,
  className = "",
  style = {},
  once = true,
  amount = 0.05, // Proactive trigger as soon as edge enters view
  margin = "0px 0px -40px 0px",
  ...props
}) {
  const selectedVariant = variantsMap[variant] || variantsMap["fade-up"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={selectedVariant}
      transition={{
        ...defaultTransition,
        duration,
        delay,
      }}
      className={className}
      style={{
        willChange: "transform, opacity",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0,
  className = "",
  style = {},
  once = true,
  amount = 0.05,
  margin = "0px 0px -40px 0px",
  ...props
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      style={{
        willChange: "opacity",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  variant = "fade-up",
  duration = 0.4,
  className = "",
  style = {},
  ...props
}) {
  const selectedVariant = variantsMap[variant] || variantsMap["fade-up"];

  return (
    <motion.div
      variants={selectedVariant}
      transition={{
        ...defaultTransition,
        duration,
      }}
      className={className}
      style={{
        willChange: "transform, opacity",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
