/// <reference types="vite/client" />

// KaTeX global declarations
declare global {
  interface Window {
    katex: {
      render: (tex: string, element: HTMLElement, options?: any) => void
    }
  }
}

// Marked library types
declare module 'marked' {
  export function marked(text: string, options?: any): string
}

export {}
