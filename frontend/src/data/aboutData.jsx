import profile from "../assets/profile.png";
import cv from "../assets/kassemhaidar_cv.pdf";

const aboutData = {
  title: "About Me",
  subtitle: "Discover my journey, passions, and the story behind my work",
  image: profile,

  biodata: [
    { label: "Name", value: "Kassem Haidar", icon: "bx bx-id-card" },
    {
      label: "Date of Birth",
      value: "October,17-2000",
      icon: "bx bx-calendar",
    },
    { label: "Place of Birth", value: "Beirut, Lebanon", icon: "bx bx-map" },
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
    { label: "GPA", value: "3.13 / 4.00", icon: "bx bx-award" },
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
