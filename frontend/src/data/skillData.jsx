const skillsData = {
  title: "Skills",
  subtitle: "Tools and technologies I’ve mastered or currently exploring.",
  categories: [
    {
      title: "Frontend",
      icon: "bx bx-code-alt",
      skills: [
        { name: "HTML", icon: "bx bxl-html5", level: "Advanced" },
        { name: "CSS", icon: "bx bxl-css3", level: "Advanced" },
        { name: "JavaScript", icon: "bx bxl-javascript", level: "Advanced" },
        { name: "React", icon: "bx bxl-react", level: "Advanced" },
        {
          name: "Tailwind CSS",
          icon: "bx bxl-tailwind-css",
          level: "Advanced",
        },
      ],
    },
    {
      title: "Backend",
      icon: "bx bx-server",
      skills: [
        { name: "Node.js", icon: "bx bxl-nodejs", level: "Advanced" },
        { name: "Express.js", icon: "bx bx-layer", level: "Advanced" },
        { name: "MongoDB", icon: "bx bxl-mongodb", level: "Intermediate" },
        { name: "Appwrite", icon: "bx bx-data", level: "Beginner" },
        { name: "JWT Auth", icon: "bx bx-key", level: "Intermediate" },
      ],
    },
    {
      title: "Other Tools",
      icon: "bx bx-wrench",
      skills: [
        { name: "Git", icon: "bx bxl-git", level: "Beginner" },
        { name: "GitHub", icon: "bx bxl-github", level: "Intermediate" },
        { name: "Vercel", icon: "bx bx-upload", level: "Beginner" },
        { name: "Netlify", icon: "bx bx-cloud-upload", level: "Intermediate" },
        { name: "Postman", icon: "bx bx-send", level: "Beginner" },
      ],
    },
  ],
};

export default skillsData;
