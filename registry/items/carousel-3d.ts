import { defineItem } from "../define.ts"

export default defineItem({
  name: "carousel-3d",
  type: "registry:ui",
  title: "3D Carousel",
  description: "Cards arranged in a ring that turns in 3D, with buttons, arrow keys and announcements.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["3d", "interactive"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/carousel-3d.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "items", type: "{ id: string; label: string; content: ReactNode }[]", description: "Cards. `label` is announced when a card reaches the front. Required." },
      { name: "itemWidth", type: "number", default: "220", description: "Card width in pixels; the ring radius follows." },
      { name: "label", type: "string", default: "\"Carousel\"", description: "Accessible name, e.g. “Featured projects”." },
      { name: "className", type: "string", description: "Classes for the outer element." },
    ],
    extends: "Only the props above.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Five to eight cards look best; fewer make a flat ring.", "Card height is `h-60`; change it in the file for taller content."],
    accessibility: [
      "Follows the carousel pattern: a labelled region of slides, Previous/Next buttons, and the arrow keys when focused.",
      "Only the front card can be focused; the others are `inert`. The front card’s label is announced.",
      "With reduced motion the ring jumps instead of turning.",
    ],
    troubleshooting: [{ problem: "Cards overlap.", solution: "Increase `itemWidth` or use fewer items; the radius is calculated from both." }],
  },
})
