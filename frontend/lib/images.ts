import path from 'node:path'
import sharp from 'sharp'

const RASTER = /\.(jpe?g|png|webp)$/i

/**
 * The small version of an uploaded image, for post cards. The build writes
 * these next to the originals (scripts/optimize-images.mjs); `next dev` has no
 * build output, so there it is the original.
 */
export function thumb(src: string): string {
  if (process.env.NODE_ENV !== 'production') return src
  if (!src.startsWith('/images/') || !RASTER.test(src)) return src
  return src.replace(RASTER, '.thumb.$1')
}

/**
 * Width and height of an image in public/, so the browser can reserve its
 * space before it loads. Undefined for anything that can't be read.
 */
export async function imageSize(src: string): Promise<{ width: number; height: number } | undefined> {
  if (!src.startsWith('/') || src.startsWith('//')) return undefined
  try {
    const file = path.join(process.cwd(), 'public', decodeURIComponent(src))
    const { width, height, orientation } = await sharp(file).metadata()
    if (!width || !height) return undefined
    // EXIF orientations 5-8 are rotated a quarter turn; the build applies it.
    return orientation && orientation >= 5 ? { width: height, height: width } : { width, height }
  } catch {
    return undefined
  }
}
