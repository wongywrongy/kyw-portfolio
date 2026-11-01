// Runs after `next build`. Shrinks uploaded images in the exported site
// (out/images) so a full-size phone photo doesn't ship at 6 MB. Only the build
// output is touched; the originals in public/images stay as uploaded.
//
// - Caps width at MAX_WIDTH (covers show at ~250-640px, so 1600 covers 2x screens).
// - Re-encodes JPEG/WebP at quality 80 and PNG losslessly.
// - Keeps the original bytes whenever the result isn't smaller.
// - SVG and GIF are left alone.

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = path.join(process.cwd(), 'out', 'images')
const MAX_WIDTH = 1600
const WARN_BYTES = 1024 * 1024

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return null

  const input = await fs.readFile(file)
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

let saved = 0
for await (const file of walk(DIR)) {
  try {
    const r = await optimize(file)
    if (!r) continue
    saved += r.before - r.after
    const rel = path.relative(path.join(process.cwd(), 'out'), file)
    if (r.after < r.before) console.log(`images: ${rel} ${kb(r.before)} -> ${kb(r.after)}`)
    if (r.after > WARN_BYTES) console.warn(`images: ${rel} is still ${kb(r.after)}; consider a smaller upload`)
  } catch (err) {
    // A broken image shouldn't fail the deploy; it ships as uploaded.
    console.warn(`images: skipped ${path.relative(process.cwd(), file)} (${err.message})`)
  }
}
if (saved > 0) console.log(`images: saved ${kb(saved)} in total`)
