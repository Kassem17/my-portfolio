import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "tippy.js/dist/tippy.css";
import { BrowserRouter } from "react-router-dom";

import "boxicons/css/boxicons.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";

AOS.init({ duration: 600, once: true, easing: "ease-out", offset: 40 });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
