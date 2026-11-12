// Runs after `next build`. Shrinks uploaded images in the exported site
// (out/images) so a full-size phone photo doesn't ship at 6 MB. Only the build
// output is touched; the originals in public/images stay as uploaded.
//
// - Caps width at MAX_WIDTH (covers show at ~250-640px, so 1600 covers 2x screens).
// - Re-encodes JPEG/WebP at quality 80 and PNG losslessly.
// - Keeps the original bytes whenever the result isn't smaller.
// - SVG and GIF are left alone.
// - Every other image also gets a THUMB_WIDTH copy, name.thumb.ext, which post
//   cards use (lib/images.ts) instead of the full-size file.
// - The profile photo (`avatar` in content/site.json) is cropped to a small square.
// - Work logos (the `logo` paths in content/work.json) are trimmed of their
//   surrounding whitespace and padded to a square, so a wordmark fills its
//   tile instead of floating small in the middle.

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = path.join(process.cwd(), 'out', 'images')
const MAX_WIDTH = 1600
const THUMB_WIDTH = 640 // post cards show at 236-430px
const WARN_BYTES = 1024 * 1024
const LOGO_SIZE = 256 // px; tiles show at 56px, so this covers 3x screens
const LOGO_PAD = 0.08 // margin around the trimmed logo, as a share of the tile

const AVATAR_SIZE = 256 // px; shown at 64px

/** The profile photo (content/site.json `avatar`), cropped square and shrunk. */
async function avatarPath() {
  try {
    const site = JSON.parse(await fs.readFile(path.join(process.cwd(), 'content', 'site.json'), 'utf8'))
    const a = typeof site.avatar === 'string' ? site.avatar : ''
    return a.startsWith('/images/') ? path.join(process.cwd(), 'out', decodeURIComponent(a)) : ''
  } catch {
    return ''
  }
}

async function logoPaths() {
  try {
    const work = JSON.parse(await fs.readFile(path.join(process.cwd(), 'content', 'work.json'), 'utf8'))
    return new Set(
      work
        .map((j) => (typeof j.logo === 'string' ? j.logo : ''))
        .filter((l) => l.startsWith('/images/'))
        .map((l) => path.join(process.cwd(), 'out', decodeURIComponent(l))),
    )
  } catch {
    return new Set()
  }
}

/** Trim a logo's uniform border and center it on a padded square of the same background. */
async function squareLogo(input, ext) {
  const { data } = await sharp(input)
    .ensureAlpha()
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const background = { r: data[0], g: data[1], b: data[2], alpha: data[3] / 255 }
  const trimmed = await sharp(input, { failOn: 'none' }).rotate().trim({ threshold: 16 }).toBuffer()
  const inner = Math.round(LOGO_SIZE * (1 - 2 * LOGO_PAD))
  const pad = Math.round((LOGO_SIZE - inner) / 2)
  let img = sharp(trimmed)
    .resize(inner, inner, { fit: 'contain', background })
    .extend({
      top: pad,
      bottom: LOGO_SIZE - inner - pad,
      left: pad,
      right: LOGO_SIZE - inner - pad,
      background,
    })
  if (ext === '.png') img = img.png({ compressionLevel: 9 })
  else if (ext === '.webp') img = img.webp({ quality: 90 })
  else img = img.flatten({ background }).jpeg({ quality: 90 })
  return img.toBuffer()
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

/** name.thumb.ext beside the image. Falls back to a plain copy so the path always exists. */
async function writeThumb(file, input, ext) {
  const out = file.replace(/\.(jpe?g|png|webp)$/i, '.thumb.$1')
  try {
    let img = sharp(input, { failOn: 'none' }).rotate().resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    if (ext === '.png') img = img.png({ compressionLevel: 9, effort: 8 })
    else if (ext === '.webp') img = img.webp({ quality: 78 })
    else img = img.jpeg({ quality: 78, mozjpeg: true })
    const output = await img.toBuffer()
    await fs.writeFile(out, output.length < input.length ? output : input)
  } catch {
    await fs.writeFile(out, input)
  }
}

async function optimize(file, logos) {
  const ext = path.extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return null
  if (/\.thumb\.[a-z]+$/i.test(file)) return null

  const input = await fs.readFile(file)
  if (file === avatar) {
    let img = sharp(input, { failOn: 'none' }).rotate().resize(AVATAR_SIZE, AVATAR_SIZE, { fit: 'cover' })
    img =
      ext === '.png'
        ? img.png({ compressionLevel: 9 })
        : ext === '.webp'
          ? img.webp({ quality: 85 })
          : img.jpeg({ quality: 85, mozjpeg: true })
    const output = await img.toBuffer()
    await fs.writeFile(file, output)
    return { file, before: input.length, after: output.length, avatar: true }
  }
  if (logos.has(file)) {
    const output = await squareLogo(input, ext)
    await fs.writeFile(file, output)
    return { file, before: input.length, after: output.length, logo: true }
  }
  await writeThumb(file, input, ext)
  let img = sharp(input, { failOn: 'none' }).rotate() // apply EXIF orientation
  const { width = 0 } = await img.metadata()
  if (width > MAX_WIDTH) img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true })

  if (ext === '.png') img = img.png({ compressionLevel: 9, effort: 8 })
  else if (ext === '.webp') img = img.webp({ quality: 80 })
  else img = img.jpeg({ quality: 80, mozjpeg: true })

  const output = await img.toBuffer()
  if (output.length >= input.length) return { file, before: input.length, after: input.length }
  await fs.writeFile(file, output)
  return { file, before: input.length, after: output.length }
}

const kb = (n) => `${Math.round(n / 1024)} KB`

try {
  await fs.access(DIR)
} catch {
  process.exit(0) // no uploads yet
}

const logos = await logoPaths()
const avatar = await avatarPath()
let saved = 0
for await (const file of walk(DIR)) {
  try {
    const r = await optimize(file, logos)
    if (!r) continue
    saved += r.before - r.after
    const rel = path.relative(path.join(process.cwd(), 'out'), file)
    if (r.avatar)
      console.log(`images: ${rel} cropped to a ${AVATAR_SIZE}px avatar (${kb(r.before)} -> ${kb(r.after)})`)
    else if (r.logo) console.log(`images: ${rel} trimmed to a ${LOGO_SIZE}px square logo`)
    else if (r.after < r.before) console.log(`images: ${rel} ${kb(r.before)} -> ${kb(r.after)}`)
    if (r.after > WARN_BYTES)
      console.warn(`images: ${rel} is still ${kb(r.after)}; consider a smaller upload`)
  } catch (err) {
    // A broken image shouldn't fail the deploy; it ships as uploaded.
    console.warn(`images: skipped ${path.relative(process.cwd(), file)} (${err.message})`)
  }
}
if (saved > 0) console.log(`images: saved ${kb(saved)} in total`)
