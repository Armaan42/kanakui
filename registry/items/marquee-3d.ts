import { defineItem } from "../define.ts"

export default defineItem({
  name: "marquee-3d",
  type: "registry:ui",
  title: "3D Marquee",
  description: "A tilted wall of vertically scrolling columns, for screenshots and showcases.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["3d", "effects", "animations"],
  internalDependencies: ["marquee"],
  files: [{ path: "registry/default/ui/marquee-3d.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "items", type: "ReactNode[]", description: "Tiles to show; split across the columns. Required." },
      { name: "columns", type: "number", default: "4", description: "Number of scrolling columns." },
      { name: "className", type: "string", description: "Classes for the wall, e.g. a height." },
    ],
    extends: "Only the props above.",
    requirements: ["kanakui `marquee` (the CLI installs it and its CSS). Works in Server Components."],
    customization: ["Use screenshots of your product as tiles for a showcase wall.", "Change the tilt in the `rotateX`/`rotateZ` transform in the file."],
    accessibility: [
      "Each tile is read once: repeated copies are hidden from screen readers.",
      "Columns pause on hover and stop moving with reduced motion.",
    ],
    troubleshooting: [{ problem: "Columns end early.", solution: "Add more items; each column needs enough tiles to fill its height." }],
  },
})
