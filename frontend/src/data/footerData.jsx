const copyright = `© ${new Date().getFullYear()} Kassem Haidar. All rights reserved.`;

const footerData = {
  brand: {
    name: "Kassem Haidar",
    phone: "+961 71 343 792",
    icon: "bx bx-code-alt",
    description:
      "MERN stack developer , building a responsive websites and Mobile apps.",
  },

  navigationIcon: "bx bx-navigation",
  socialsIcon: "bx bx-share-alt",

  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  legalLinks: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Use", href: "#terms" },
    { label: "Sitemap", href: "#sitemap" },
  ],

  socials: [
    {
      label: "GitHub",
      icon: "bx bxl-github",
      href: "https://github.com/Kassem17",
    },
    {
      label: "LinkedIn",
      icon: "bx bxl-linkedin-square",
      href: "https://www.linkedin.com/in/kassem-haidar-068262350/",
    },
    {
      label: "Email",
      icon: "bx bx-envelope",
      href: "kassemhaidar290@gmail.com",
    },
    {
      label: "Twitter",
      icon: "bx bxl-twitter",
      href: "#",
    },
  ],

  formSubscription: {
    title: "Subscribe to Newsletter",
    description: "Stay updated with my latest projects and articles.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },

  copyright: copyright,
};

export default footerData;
