import { useTheme } from "../../context/ThemeContext";

export default function ElectricMesh() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ transform: "translateZ(0)" }}>
      {/* Ambient Moving Gradient Blobs (Hardware Accelerated) */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[60px] opacity-30 animate-pulse pointer-events-none"
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          background: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(217,70,239,0.08) 50%, transparent 80%)"
            : "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(217,70,239,0.05) 50%, transparent 80%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[70px] opacity-25 animate-pulse pointer-events-none"
        style={{
          animationDuration: "7s",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          background: isDark
            ? "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(139,92,246,0.08) 50%, transparent 80%)"
            : "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.04) 50%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full blur-[65px] opacity-20 pointer-events-none"
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          background: isDark
            ? "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
