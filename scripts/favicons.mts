/**
 * Builds every site icon from the VenusUI mark (four tiles, one raised):
 *
 *   npm run favicons
 *
 *   src/app/icon.svg        browser tabs; light or dark mark to suit the browser
 *   src/app/favicon.ico     16, 32 and 48 px for older browsers and Windows
 *   src/app/apple-icon.png  180 px for iOS home screens
 *   public/icon-192.png     Android home screen (see src/app/manifest.ts)
 *   public/icon-512.png     Android splash and install prompts
 *
 * Next.js links the files in src/app automatically. Keep the mark in step
 * with `LogoMark` in src/components/site/icons.tsx.
 */
import { writeFile } from "node:fs/promises"
import path from "node:path"
import { chromium } from "playwright"

const root = path.resolve(import.meta.dirname, "..")
const DARK = "#0a0a0a"
const LIGHT = "#fafafa"

/** The mark on a 20 × 20 grid: one solid tile, three faded ones. */
const tiles = (fill: string) =>
  [
    `<rect x="1" y="1" width="8" height="8" rx="2" fill="${fill}"/>`,
    `<rect x="11" y="1" width="8" height="8" rx="2" fill="${fill}" opacity=".35"/>`,
    `<rect x="1" y="11" width="8" height="8" rx="2" fill="${fill}" opacity=".35"/>`,
    `<rect x="11" y="11" width="8" height="8" rx="2" fill="${fill}" opacity=".35"/>`,
  ].join("")

/** Tab icon: transparent, dark mark that turns light in dark mode. */
const tabSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><style>rect{fill:${DARK}}@media (prefers-color-scheme:dark){rect{fill:${LIGHT}}}</style>${tiles(DARK)}</svg>\n`

/**
 * A light mark on a dark square, for places with no dark-mode switch.
 * `radius` is a share of the size; iOS and Android round corners themselves.
 */
const tileSvg = (size: number, { radius, inset }: { radius: number; inset: number }) => {
  const scale = (size * (1 - inset * 2)) / 20
  const offset = size * inset
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${size * radius}" fill="${DARK}"/><g transform="translate(${offset} ${offset}) scale(${scale})">${tiles(LIGHT)}</g></svg>`
}

const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })

async function png(svg: string, size: number) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<style>html,body{margin:0;background:transparent}</style>${svg}`)
  return page.locator("svg").screenshot({ omitBackground: true, type: "png" })
}

/** An .ico file whose images are PNGs (supported everywhere since Windows Vista). */
function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6 + images.length * 16)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16
    header.writeUInt8(size >= 256 ? 0 : size, entry)
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1)
    header.writeUInt16LE(1, entry + 4)
    header.writeUInt16LE(32, entry + 6)
    header.writeUInt32LE(data.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += data.length
  })
  return Buffer.concat([header, ...images.map((image) => image.data)])
}

const favicon = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(tileSvg(size, { radius: 0.22, inset: 0.16 }), size) })))

await writeFile(path.join(root, "src/app/icon.svg"), tabSvg)
await writeFile(path.join(root, "src/app/favicon.ico"), ico(favicon))
await writeFile(path.join(root, "src/app/apple-icon.png"), await png(tileSvg(180, { radius: 0, inset: 0.24 }), 180))
await writeFile(path.join(root, "public/icon-192.png"), await png(tileSvg(192, { radius: 0, inset: 0.24 }), 192))
await writeFile(path.join(root, "public/icon-512.png"), await png(tileSvg(512, { radius: 0, inset: 0.24 }), 512))
await browser.close()
console.log("✓ icon.svg, favicon.ico (16/32/48), apple-icon.png, icon-192.png, icon-512.png")
