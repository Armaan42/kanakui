import { defineItem } from "../define.ts"

export default defineItem({
  name: "features-02",
  type: "registry:block",
  title: "Bento Features",
  description: "Four features in a bento grid of different tile sizes, with a moving border on the main tile.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["features"],
  dependencies: ["lucide-react"],
  internalDependencies: ["border-beam"],
  files: [{ path: "registry/default/blocks/features-02/components/features-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Tiles are written out in the file so each can have its own layout.",
    requirements: [
      "kanakui `border-beam` (the CLI installs it with its CSS), `lucide-react`, React 19 and Tailwind CSS v4.",
    ],
    customization: [
      "Tile sizes come from `md:col-span-*` and `md:row-span-*`. Change them to rearrange the bento.",
      "Replace the grey placeholder shapes with screenshots or charts.",
      "Remove `<BorderBeam />` if the motion feels like too much.",
    ],
    accessibility: [
      "Each tile is an `article` with an `h3`. Placeholder visuals are `aria-hidden`.",
      "The moving border is hidden when the user prefers reduced motion.",
    ],
    troubleshooting: [
      { problem: "Tiles are all the same size on tablets.", solution: "The bento layout starts at the `md` breakpoint (768px); below that tiles stack." },
    ],
  },
})
