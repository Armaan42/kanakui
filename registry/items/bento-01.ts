import { defineItem } from "../define.ts"

export default defineItem({
  name: "bento-01",
  type: "registry:block",
  title: "Live Bento Grid",
  description: "A bento grid built from live components: a counter, a scrolling integrations row and a beam tile.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["features"],
  internalDependencies: ["number-ticker", "marquee", "border-beam"],
  files: [{ path: "registry/default/blocks/bento-01/components/bento-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Tiles are written out in the file so each can have its own layout.",
    requirements: ["kanakui `number-ticker`, `marquee` and `border-beam`. The CLI installs them with their CSS.", "React 19 and Tailwind CSS v4."],
    customization: [
      "The counter value and integration names are placeholders. Show only real numbers and integrations you actually support.",
      "Tile widths come from `md:col-span-*` on a 6-column grid.",
    ],
    accessibility: [
      "Each tile is an `article`. The counter gives screen readers its final value, and the integrations row is read once.",
      "The status bars are decorative; describe status in text if it matters.",
      "Motion stops with reduced motion.",
    ],
    troubleshooting: [{ problem: "Tiles stack on tablets.", solution: "The bento layout starts at the `md` breakpoint (768px)." }],
  },
})
