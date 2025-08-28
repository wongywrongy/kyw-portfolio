interface ImageFullProps {
  src: string
  alt: string
  caption?: string
  credit?: string
}

export default function ImageFull({ src, alt, caption, credit }: ImageFullProps) {
  return (
    <figure className="my-8 -mx-6">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto rounded-none"
      />
      {(caption || credit) && (
        <figcaption className="mt-3 px-6 text-sm text-fg-1/60 text-center">
          {caption && <span>{caption}</span>}
          {credit && (
            <span className="block mt-1 text-xs">
              Credit: {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
