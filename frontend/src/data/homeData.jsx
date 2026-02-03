import profile from "../assets/profile.png";
import cv from "../assets/kassemhaidar_cv.pdf";

const homeData = {
  title: "Hi, I’m Kassem Haidar 👋",
  typingTexts: ["Mobile developing beginner", "MERN developer"],
  description:
    "I build modern, responsive web apps with clean UI and smooth UX  blending design and code to create experiences that feel intuitive, fast, and delightful to use.",
  education:
    "I completed my Bachelor's degree in Computer Engineering and am currently pursuing a Master's in Computer and Communication Engineering.",
  img: profile,
  buttons: [
    // {
    //   label: "Explore My Project",
    //   href: "/projects",
    //   type: "primary",
    // },
    {
      label: "Download My CV",
      href: cv,
      type: "secondary",
    },
  ],
  floatingIcons: [
    { icon: "bx bxl-html5", color: "#e34c26", label: "HTML" },
    { icon: "bx bxl-nodejs", color: "#264de4", label: "Node Js" },
    { icon: "bx bxl-javascript", color: "#f0db4f", label: "JavaScript" },
    { icon: "bx bxl-react", color: "#61dbfb", label: "React" },
  ],
  socialMedia: [
    {
      platform: "GitHub",
      icon: "bx bxl-github",
      href: "https://github.com/Kassem17",
    },
    {
      platform: "LinkedIn",
      icon: "bx bxl-linkedin-square",
      href: "https://www.linkedin.com/in/kassem-haidar-068262350/",
    },
    // {
    //   platform: "Instagram",
    //   icon: "bx bxl-instagram",
    //   href: "#",
    // },
    // {
    //   platform: "Twitter",
    //   icon: "bx bxl-twitter",
    //   href: "#",
    // },
  ],
  stats: [
    {
      label: "Experience",
      value: "1+ Years",
      icon: "bx bx-briefcase",
    },
    {
      label: "Main Language",
      value: "JavaScript",
      icon: "bx bxl-javascript",
    },
    {
      label: "Total Projects",
      value: "15 Projects",
      icon: "bx bx-code-alt",
    },
    {
      label: "GPA",
      value: "3.13 / 4.00",
      icon: "bx bx-award",
    },
  ],
};

export default homeData;
