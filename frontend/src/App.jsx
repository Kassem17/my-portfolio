import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ElectricMesh from "./components/ui/ElectricMesh";
// import VisitorTracker from "./components/VisitorTracker";
// import Dashboard from "./components/Dashboard";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <Routes>
      {/* Admin Dashboard */}
      {/* <Route path="/admin" element={<Dashboard />} /> */}

      {/* Public Portfolio site */}
      <Route
        path="/*"
        element={
          <div
            className="min-h-screen relative overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-white"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(180deg, #07090e 0%, #0b0f19 50%, #030712 100%)"
                  : "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
            }}
          >
            {/* Automatic Visitor Notification Tracker */}
            {/* <VisitorTracker /> */}

            {/* Dynamic Electric Mesh Fluid Background Blobs */}
            <ElectricMesh />

            {/* Texture Noise Overlay */}
            <div className="noise-overlay" />

            <Navbar />
            <main className="relative z-10">
              <Home />
              <About />
              <Projects />
              <Experience />
              <Skills />
              {/* <Testimonials /> */}
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
