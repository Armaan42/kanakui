import { defineItem } from "../define.ts"

export default defineItem({
  name: "dock",
  type: "registry:ui",
  title: "Dock",
  description: "A row of icons that magnify as the mouse approaches, like the macOS dock.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["navigation", "interactive", "animations"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/dock.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "items", type: "{ label: string; icon: ReactNode; href?: string; onClick?: () => void }[]", description: "Dock items. Each becomes a link (with `href`) or a button. Required." },
      { name: "size", type: "number", default: "40", description: "Item size at rest, in pixels." },
      { name: "magnification", type: "number", default: "64", description: "Item size right under the pointer, in pixels." },
      { name: "distance", type: "number", default: "140", description: "How far, in pixels, the magnification reaches." },
      { name: "label", type: "string", default: "\"Dock\"", description: "Accessible name for the navigation." },
      { name: "className", type: "string", description: "Classes for the dock bar." },
    ],
    extends: "Only the props above.",
    requirements: ["The `motion` package. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Fix it to the bottom of the screen: wrap it in `fixed inset-x-0 bottom-4 flex justify-center`.",
      "Use any icon component; it is sized to 45% of the item.",
    ],
    accessibility: [
      "It is a labelled `nav` list; each item is a named link or button with a tooltip on hover and focus.",
      "Magnification follows the mouse only, and is off when the user prefers reduced motion.",
    ],
    troubleshooting: [
      { problem: "Tooltips are cut off.", solution: "They sit above the dock. Leave about 2.5rem of space above it, or remove `overflow-hidden` from its container." },
    ],
  },
})
