import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

/* ───────── Orbiting Skill Mesh Node ───────── */
function SkillMeshNode({ angle, radius, speed, color, index }) {
  const ref = useRef();
  const startAngle = useRef(angle);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + startAngle.current;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.5 + index) * 0.4;
  });

  return (
    <group ref={ref}>
      <Float speed={1.5} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.4}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ───────── Central Wireframe ───────── */
function CenterSphere({ isDark }) {
  const ref = useRef();
  const accentColor = isDark ? "#7ec8a3" : "#c96442";

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
      ref.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.7, 1]} />
      <meshStandardMaterial
        color={accentColor}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

/* ───────── Orbit Ring ───────── */
function OrbitRing({ radius, isDark }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={lineGeo}>
      <lineBasicMaterial
        color={isDark ? "#7ec8a3" : "#c96442"}
        transparent
        opacity={0.15}
      />
    </line>
  );
}

/* ───────── Scene ───────── */
function OrbScene({ categories, isDark }) {
  const accentColor = isDark ? "#7ec8a3" : "#c96442";
  const secondaryColor = isDark ? "#5ab88a" : "#e8836a";

  const allSkills = useMemo(() => {
    return categories.flatMap((cat) => cat.skills);
  }, [categories]);

  const orbits = useMemo(() => {
    const rings = [2.2, 3.4, 4.5];
    return allSkills.map((skill, i) => {
      const ringIdx = i % rings.length;
      const radius = rings[ringIdx];
      const angle = (i / allSkills.length) * Math.PI * 2;
      const speed = 0.2 + ringIdx * 0.08;
      const color = i % 2 === 0 ? accentColor : secondaryColor;
      return { radius, angle, speed, color };
    });
  }, [allSkills, accentColor, secondaryColor]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />

      <CenterSphere isDark={isDark} />

      {[2.2, 3.4, 4.5].map((r) => (
        <OrbitRing key={r} radius={r} isDark={isDark} />
      ))}

      {orbits.map((o, i) => (
        <SkillMeshNode
          key={i}
          angle={o.angle}
          radius={o.radius}
          speed={o.speed}
          color={o.color}
          index={i}
        />
      ))}
    </>
  );
}

/* ───────── Exported Component ───────── */
export default function OrbitingSkills({ categories }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "260px",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        position: "relative",
      }}
      className="bento-card mb-8"
    >
      <div
        className="absolute top-4 left-5 z-10 flex items-center gap-2 pointer-events-none"
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: isDark ? "#7ec8a3" : "#c96442" }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: isDark ? "#7ec8a3" : "#c96442" }}
        >
          Skill Ecosystem Visualization
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 2.5, 6], fov: 45 }}
        dpr={1}
        frameloop={isInView ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <OrbScene categories={categories} isDark={isDark} />
      </Canvas>
    </div>
  );
}
