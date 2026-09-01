import profile from "../assets/profile.png";
import cv from "../assets/KassemHaidar_cv.pdf";
import profile2 from "../assets/imag3.jpg";

const aboutData = {
  title: "About Me",
  subtitle: "Discover my journey, passions, and the story behind my work",
  image: profile2,

  biodata: [
    { label: "Name", value: "Kassem Haidar", icon: "bx bx-id-card" },

    {
      label: "Email",
      value: "kassemhaidar290@gmail.com",
      icon: "bx bx-envelope",
    },
    { label: "Phone", value: "+961 71 343 792", icon: "bx bx-phone" },
    {
      label: "Education",
      value: "Lebanese International University",
      icon: "bx bx-book",
    },
  ],

  resume: {
    label: "Download My Resume",
    href: cv,
    icon: "bx bx-download",
    type: "secondary",
  },

  aboutNarrative: {
    whoAmI: {
      text: `I'm a MERN stack developer who creates responsive, interactive, and clean user interfaces. 
      With a background in Informatics Engineering, I combine design sensibilities with technical rationality.`,
      icon: "bx-info-circle",
    },
    approach: {
      text: `In order to provide seamless digital experiences, I concentrate on 
      user-centered design, performance, and accessibility that are constantly changing with modern technology.`,
      icon: "bx-bulb",
    },
  },
};

export default aboutData;
