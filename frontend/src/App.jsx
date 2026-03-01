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
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(180deg, #0f1419 0%, #141c27 100%)"
            : "linear-gradient(180deg, #fdf4ef 0%, #f5f0eb 50%, #e8e2db 100%)",
      }}
    >
      <Navbar />
      <main>
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
  );
}

export default App;
