import { defineItem } from "../define.ts"

export default defineItem({
  name: "scroll-progress",
  type: "registry:ui",
  title: "Scroll Progress",
  description: "A thin bar that fills as the reader scrolls through a page or container.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["navigation", "loaders"],
  files: [{ path: "registry/default/ui/scroll-progress.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "target", type: "RefObject<HTMLElement | null>", description: "Scrollable element to track. Defaults to the page." },
      { name: "label", type: "string", default: "\"Reading progress\"", description: "Accessible name." },
      { name: "className", type: "string", description: "Classes, e.g. `fixed inset-x-0 top-0 z-50`." },
    ],
    extends: "Only the props above.",
    requirements: ["React 19 and Tailwind CSS v4."],
    customization: ["Pin it under your header with `fixed top-14 inset-x-0`.", "Change the color by editing `bg-foreground`."],
    accessibility: ["A labelled progress bar whose `aria-valuenow` follows the scroll."],
    troubleshooting: [{ problem: "It stays empty.", solution: "The page (or `target`) must be taller than the viewport to scroll." }],
  },
})
