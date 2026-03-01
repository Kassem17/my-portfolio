const experienceData = {
  title: "Experience",
  subtitle:
    "A glimpse of where I've been — from work experience to organizational life that shaped who I am.",

  tabs: ["Work", "Organization"],

  experiences: [
    // === Work Experience ===
    {
      icon: "bx bx-code-alt",
      tab: "Work",
      title: "MERN Developer",
      company: "Freelancer",
      location: "Remote",
      description: [
        "Build responsive UI with React & Tailwind",
        "Build Backend using Node js",
        "Store Data in Mongo DB",
      ],
      tech: ["React", "Tailwind", "Axios", "React-packages"],
      companyUrl: "",
    },

    // === Organization Experience ===
    {
      icon: "bx bx-group",
      tab: "Organization",
      title: "Head of Web Development",
      company: "",
      year: "2024 - 2025",
      location: "Remote",
      description: [
        "Build internal info system for members",
        "Host weekly dev workshops",
      ],
      tech: ["React", "Node", "Mongo DB"],
    },
  ],
};

export default experienceData;
