import { defineItem } from "../define.ts"

export default defineItem({
  name: "like-button",
  type: "registry:ui",
  title: "Like Button",
  description: "A heart toggle that pops and bursts when liked, with an optional count.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["buttons", "interactive", "animations"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/like-button.tsx", type: "registry:ui" }],
  cssVars: {
    theme: {
      "animate-like-pop": "like-pop 400ms ease-out",
      "animate-like-burst": "like-burst 500ms ease-out forwards",
    },
  },
  css: {
    "@keyframes like-pop": { "0%": { transform: "scale(1)" }, "40%": { transform: "scale(1.35)" }, "100%": { transform: "scale(1)" } },
    "@keyframes like-burst": {
      from: { transform: "translate(-50%, -50%) rotate(var(--burst-angle)) translateY(0) scale(1)", opacity: "1" },
      to: { transform: "translate(-50%, -50%) rotate(var(--burst-angle)) translateY(-14px) scale(0)", opacity: "0" },
    },
  },
  pageDocs: {
    props: [
      { name: "liked", type: "boolean", description: "Controlled state." },
      { name: "defaultLiked", type: "boolean", default: "false", description: "Initial state." },
      { name: "onLikedChange", type: "(liked: boolean) => void", description: "Called on toggle." },
      { name: "count", type: "number", description: "Count shown beside the heart; adjusts by one on toggle." },
      { name: "label", type: "string", default: "\"Like\"", description: "Accessible name, e.g. “Like this post”." },
    ],
    extends: "All `<button>` props except `onChange`.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4. The CLI adds the keyframes."],
    customization: ["Save likes on the server in `onLikedChange` and roll back if the request fails."],
    accessibility: ["A toggle button with `aria-pressed`. The burst is decorative and skipped with reduced motion."],
    troubleshooting: [{ problem: "The count is off by one.", solution: "Pass the server count as `count` and let the button adjust it, or control both yourself." }],
  },
})
