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

export {}
