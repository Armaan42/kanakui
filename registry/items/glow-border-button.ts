import { defineItem } from "../define.ts"

export default defineItem({
  name: "glow-border-button",
  type: "registry:ui",
  title: "Glow Border Button",
  description: "A button with a light that keeps circling its border.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["buttons","animations"],
  files: [{ path: "registry/default/ui/glow-border-button.tsx", type: "registry:ui" }],
  cssVars: { theme: {"animate-glow-border-spin":"glow-border-spin 4s linear infinite"} },
  css: {"@keyframes glow-border-spin":{"to":{"rotate":"1turn"}}},
  pageDocs: {
    props: [{"name":"colors","type":"[string, string]","default":"violet → sky","description":"Colors of the circling light. Any CSS colors."}],
    extends: "All `<button>` props. `type` defaults to `\"button\"`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `glow-border-spin` keyframes. Works in Server Components."],
    customization: ["For a link, copy the markup onto an `<a>` or your router’s link.","Change the size with `h-*` and the inner `px-*` padding."],
    accessibility: ["A real `<button>` with a visible focus ring.","The light stops with reduced motion; the border stays."],
    troubleshooting: [{"problem":"The light looks clipped.","solution":"The button needs `overflow-hidden` (set by default); don’t remove it."}],
  },
})
