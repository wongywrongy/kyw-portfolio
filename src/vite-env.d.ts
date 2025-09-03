/// <reference types="vite/client" />

// KaTeX global declarations
declare global {
  interface Window {
    katex: {
      render: (tex: string, element: HTMLElement, options?: any) => void
    }
  }
}

export {}
