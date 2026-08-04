import { useTheme } from "../../context/ThemeContext";

export default function ElectricMesh() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient Moving Gradient Blobs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 animate-pulse pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(217,70,239,0.1) 70%, transparent 100%)"
            : "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(217,70,239,0.08) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25 animate-pulse pointer-events-none"
        style={{
          animationDuration: "7s",
          background: isDark
            ? "radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(139,92,246,0.1) 70%, transparent 100%)"
            : "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(139,92,246,0.05) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
