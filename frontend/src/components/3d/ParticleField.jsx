import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useTheme } from "../../context/ThemeContext";

/* ───────── lightweight floating shape ───────── */
function FloatingShape({ geometry, position, color, scale = 1, rotationSpeed = 0.2 }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * rotationSpeed * 0.5;
    ref.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <Float speed={1.4} floatIntensity={0.9} rotationIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          roughness={0.15}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

/* ───────── lightweight main scene ───────── */
function Scene({ isDark, isMobile }) {
  const violet = isDark ? "#a78bfa" : "#8b5cf6";
  const pink = isDark ? "#f0abfc" : "#d946ef";
  const cyan = isDark ? "#38bdf8" : "#06b6d4";

  const shapes = useMemo(() => {
    if (isMobile) {
      return [
        {
          geo: <icosahedronGeometry args={[0.7, 0]} />,
          pos: [1.8, 1.2, -2],
          color: violet,
          scale: 0.6,
          speed: 0.2,
        },
        {
          geo: <octahedronGeometry args={[0.5, 0]} />,
          pos: [-1.8, -1, -3],
          color: cyan,
          scale: 0.5,
          speed: 0.25,
        },
      ];
    }
    return [
      {
        geo: <icosahedronGeometry args={[0.85, 0]} />,
        pos: [3.2, 1.5, -2],
        color: violet,
        scale: 0.65,
        speed: 0.2,
      },
      {
        geo: <torusGeometry args={[0.55, 0.16, 12, 24]} />,
        pos: [-2.8, 1.8, -3],
        color: pink,
        scale: 0.55,
        speed: 0.15,
      },
      {
        geo: <octahedronGeometry args={[0.6, 0]} />,
        pos: [2.2, -1.8, -3.5],
        color: cyan,
        scale: 0.5,
        speed: 0.25,
      },
      {
        geo: <dodecahedronGeometry args={[0.4, 0]} />,
        pos: [-2.2, -1.2, -2.5],
        color: violet,
        scale: 0.4,
        speed: 0.3,
      },
    ];
  }, [isDark, isMobile, violet, pink, cyan]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color={violet} />
      <pointLight position={[-5, -5, -2]} intensity={0.5} color={cyan} />

      {isDark && (
        <Stars
          radius={40}
          depth={30}
          count={isMobile ? 300 : 700}
          factor={2}
          saturation={0}
          fade
          speed={0.3}
        />
      )}

      {shapes.map((s, i) => (
        <FloatingShape
          key={i}
          geometry={s.geo}
          position={s.pos}
          color={s.color}
          scale={s.scale}
          rotationSpeed={s.speed}
        />
      ))}
    </>
  );
}

export default function ParticleField() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene isDark={isDark} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
