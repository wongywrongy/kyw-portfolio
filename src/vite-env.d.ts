/// <reference types="vite/client" />

// MathJax global declarations
declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>
    }
  }
}

// Marked library types
declare module 'marked' {
  export function marked(text: string, options?: any): string
}

// Allow importing markdown files as raw text
declare module '*.md?raw' {
  const content: string;
  export default content;
}

// Allow importing JSON files
declare module '*.json' {
  const content: any;
  export default content;
}

export {}
