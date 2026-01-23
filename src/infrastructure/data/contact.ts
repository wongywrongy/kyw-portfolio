/**
 * Contact Page Content
 * 
 * This file contains all content for the contact page.
 * Edit the content here without touching component code.
 */

export interface ContactContent {
  title: string;
  subtitle: string;
  contacts: Array<{
    label: string;
    value: string;
    href: string;
    description: string;
  }>;
  responseTime?: string;
}

export const contactContent: ContactContent = {
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
  responseTime: "I typically respond within 24 hours",
};

