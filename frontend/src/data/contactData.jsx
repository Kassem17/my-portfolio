const defaultMessage = encodeURIComponent(
  "Hello, I would like to inquire about your services. Can you please provide more details?"
);
const whatsappUrl = `https://wa.me/+96171343792?text=${defaultMessage}`;

const contactData = {
  title: "Contact Me",
  subtitle: "Reach out via form or social media.",

  tabs: [
    {
      label: "Form",
      value: "form",
      icon: "bx bx-envelope",
    },
    {
      label: "Social",
      value: "social",
      icon: "bx bx-link",
    },
    {
      label: "Support Me",
      value: "support",
      icon: "bx bx-heart",
    },
  ],

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Kassem17",
      icon: "bx bxl-github",
      description: "Explore my code & projects",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kassem-haidar-068262350/",
      icon: "bx bxl-linkedin-square",
      description: "Let’s connect professionally",
    },
    {
      label: "Email",
      href: "kassemhaidar290@gmail.com",
      icon: "bx bx-envelope",
      description: "Communication Method",
    },
    {
      label: "Twitter",
      href: "https://x.com/kassemh31200911?t=TQIOiyPxaktGplFPBkKQSA&s=09",
      icon: "bx bx-x",
    },
  ],

  // supportPlatforms: [
  //     {
  //         label: "QRIS",
  //         type: "image",
  //         imageSrc: "/assets/qris.jpg",
  //         alt: "Scan to support via QRIS",
  //     }
  // ],
};

export default contactData;
