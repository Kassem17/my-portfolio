import Navbar from "./components/Navbar";
import Home from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Snowfall from "react-snowfall";
import Testimonials from "./components/Testimonial";
import { useEffect, useState } from "react";
import { useTheme } from "./context/ThemeContext";

function App() {
  // const [snowColor, setSnowColor] = useState("#000");

  // const updateSnowColor = () => {
  //   const theme = localStorage.getItem("theme");
  //   setSnowColor(theme === "dark" ? "#FFFFFF" : "#000000");
  // };

  // useEffect(() => {
  //   updateSnowColor(); // initial load

  //   // Listen to theme changes
  //   window.addEventListener("storage", updateSnowColor);
  //   window.addEventListener("theme-change", updateSnowColor);

  //   return () => {
  //     window.removeEventListener("storage", updateSnowColor);
  //     window.removeEventListener("theme-change", updateSnowColor);
  //   };
  // }, []);

  const { theme } = useTheme();

  return (
    <>
      {/* Snowfall overlay */}
      <Snowfall
        color={theme === "dark" ? "rgba(255,255,255)" : "gray"}
        snowflakeCount={theme === "dark" ? 200 : 120}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      <Navbar />
      <Home />
      <About />
      <Projects />
      <Experience />
      <Skills />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
