import Link from 'next/link'
import { blobs } from '@/lib/pattern'
import { ArrowUpRight } from '@/components/icons'

export type CardProps = {
  title: string
  /** Shown under the title on list pages; the homepage keeps cards to title + meta. */
  description?: string
  /** One line: a date, a stack, a role. */
  meta?: string
  /** A path under public/, e.g. /images/posts/x.jpg. Without one the band is generated. */
  image?: string
  href?: string
  /** Hide the band (post pages and other places that show the image full size). */
  noBand?: boolean
}

/** The band at the top of a card: the image in duotone, or a generated gradient. */
function Band({ image, title }: { image?: string; title: string }) {
  if (image) {
    return (
      <div className="band" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" />
      </div>
    )
  }
  return (
    <div className="band band-gen" aria-hidden="true">
      {blobs(title).map((style, i) => (
        <span key={i} className="blob" style={style} />
      ))}
    </div>
  )
}

export function Card({ title, description, meta, image, href, noBand }: CardProps) {
  const external = !!href && !href.startsWith('/')
  const body = (
    <>
      {!noBand && <Band image={image} title={title} />}
      <p className="sn">
        <span>{title}</span>
        {external && <ArrowUpRight className="arr" />}
      </p>
      {description && <p className="sd">{description}</p>}
      {meta && <p className="ss">{meta}</p>}
    </>
  )
  if (!href) return <div className="sc">{body}</div>
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="sc">
        {body}
      </a>
    )
  }
  return (
    <Link href={href} className="sc">
      {body}
    </Link>
  )
}
