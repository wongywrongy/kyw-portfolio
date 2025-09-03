import { MDXProvider } from '@mdx-js/react'
import ImageFull from '../media/ImageFull'
import ImageGrid from '../media/ImageGrid'
import Figure from '../media/Figure'
import Callout from '../ui/Callout'
import BlogImage from './BlogImage'
import LaTeX from './LaTeX'
import CodeBlock from './CodeBlock'

const components = {
  ImageFull,
  ImageGrid,
  Figure,
  Callout,
  BlogImage,
  LaTeX,
  CodeBlock,
  h1: (props: any) => <h1 className="mt-8 mb-4 first:mt-0" {...props} />,
  h2: (props: any) => <h2 className="mt-6 mb-3 first:mt-0" {...props} />,
  h3: (props: any) => <h3 className="mt-4 mb-2 first:mt-0" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="mb-4 pl-6 space-y-1" {...props} />,
  ol: (props: any) => <ol className="mb-4 pl-6 space-y-1" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-c3 pl-4 italic text-fg-1/80 my-6" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-white/5 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-white/5 p-4 rounded-2xl overflow-x-auto my-6" {...props} />
  ),
  a: (props: any) => (
    <a className="text-c3 hover:text-c2 transition-colors underline" {...props} />
  ),
}

export default function CustomMDXProvider({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  )
}
