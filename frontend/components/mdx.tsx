import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'

function Code({ className, children, ...props }: React.ComponentProps<'code'>) {
  // Fenced blocks arrive with a language-* class; inline code does not.
  if (className?.startsWith('language-') && typeof children === 'string') {
    return (
      <code
        className={className}
        dangerouslySetInnerHTML={{ __html: highlight(children.replace(/\n$/, '')) }}
      />
    )
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

function Img({ alt, ...props }: React.ComponentProps<'img'>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt ?? ''} loading="lazy" {...props} />
}

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={{ code: Code, img: Img }} />
}
