/**
 * Home Page Content
 * 
 * This file contains all content for the home page.
 * Edit the content here without touching component code.
 */

export interface HomeContent {
  hero: {
    name: string;
    description: string;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  blog: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    contacts: Array<{
      label: string;
      value: string;
      href: string;
      description: string;
    }>;
  };
}

export const homeContent: HomeContent = {
  hero: {
    name: "Kyle Wong",
    description: "Computer Science @ SJSU",
  },
  about: {
    title: "About me",
    paragraphs: [
      "Hey, I’m Kyle, a Computer Science student at San José State University. I enjoy working with software beneath layers of abstraction and understanding systems at their core. I’m drawn to projects where details matter, impact is tangible, and the code is practical and intentional.",
      "I’ve worked across embedded systems, open-source software, and full-stack applications, and I spent a full semester in Korea studying applied artificial intelligence while developing projects alongside my coursework. This mix of experiences has reinforced my interest in the field and strengthened my focus on applying theory to real-world problems.",
      "Outside of academics, I enjoy playing badminton both casually and competitively. I currently serve as the Vice President of SJSU Badminton, where I help others play, compete, and improve. I’m also passionate about photography and enjoy capturing moments on my Fujifilm camera.",
    ],
  },
  blog: {
    title: "Blog",
    subtitle: "Explore my research, projects, and thoughts",
  },
  contact: {
    title: "Get in Touch",
    subtitle: "I'd love to hear from you. Feel free to reach out!",
    contacts: [
      {
        label: "Email",
        value: "kyle.t.wong@sjsu.edu",
        href: "mailto:kyle.t.wong@sjsu.edu",
        description: "Send me an email",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/ktwong665",
        href: "https://www.linkedin.com/in/ktwong665/",
        description: "Connect with me on LinkedIn",
      },
      {
        label: "GitHub",
        value: "github.com/wongywrongy",
        href: "https://github.com/wongywrongy",
        description: "View my code repositories",
      },
    ],
  },
};

