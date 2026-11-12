import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import { imageSize } from '@/lib/images'

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

async function Img({ alt, src, ...props }: React.ComponentProps<'img'>) {
  // Width and height let the browser hold the image's space, so the text
  // below doesn't jump when it loads.
  const size = typeof src === 'string' ? await imageSize(src) : undefined
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt ?? ''} src={src} loading="lazy" decoding="async" {...size} {...props} />
}

/**
 * Renders a post body. `.md` posts (what Pages CMS writes) are parsed as plain
 * Markdown, so a stray { or < in the text stays text instead of breaking the
 * build. `.mdx` posts keep full MDX.
 */
export function Mdx({ source, format }: { source: string; format: 'md' | 'mdx' }) {
  return (
    <MDXRemote source={source} components={{ code: Code, img: Img }} options={{ mdxOptions: { format } }} />
  )
}
