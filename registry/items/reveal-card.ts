import { defineItem } from "../define.ts"

export default defineItem({
  name: "reveal-card",
  type: "registry:ui",
  title: "Reveal Card",
  description: "A media card whose details slide up on hover or keyboard focus.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["cards", "interactive"],
  files: [{ path: "registry/default/ui/reveal-card.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "media", type: "ReactNode", description: "Image, video or illustration at the top. Required." },
      { name: "title", type: "ReactNode", description: "Always-visible title. Required." },
      { name: "children", type: "ReactNode", description: "Details revealed on hover or focus. Required." },
    ],
    extends: "All `<article>` props, including `className`.",
    requirements: ["Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. Works in Server Components (no JavaScript needed)."],
    customization: [
      "The media area is 4:3; change `aspect-[4/3]` in the file for other ratios.",
      "Put a link or button in the details; focusing it reveals the panel for keyboard users.",
    ],
    accessibility: [
      "Details are always in the page for screen readers; they are only visually tucked away.",
      "The panel opens on keyboard focus, and is always open on touch screens without hover.",
      "No sliding when the user prefers reduced motion.",
    ],
    troubleshooting: [
      { problem: "Long details are cut off.", solution: "The panel is as tall as its content up to the card height. Keep details short, or increase the media aspect ratio." },
    ],
  },
})
