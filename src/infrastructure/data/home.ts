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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
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

