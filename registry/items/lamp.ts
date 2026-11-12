import { defineItem } from "../define.ts"

export default defineItem({
  name: "lamp",
  type: "registry:ui",
  title: "Lamp",
  description: "A glowing bar casting a cone of light that opens over the content below.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["effects","backgrounds","animations"],
  files: [{ path: "registry/default/ui/lamp.tsx", type: "registry:ui" }],
  cssVars: { theme: {"animate-lamp-open":"lamp-open 1.4s cubic-bezier(0.22, 1, 0.36, 1) both"} },
  css: {"@keyframes lamp-open":{"from":{"opacity":"0.4","transform":"scaleX(0.45)"},"to":{"opacity":"1","transform":"scaleX(1)"}}},
  pageDocs: {
    props: [{"name":"color","type":"string","default":"\"oklch(0.78 0.14 220)\"","description":"Color of the light. Any CSS color."},{"name":"children","type":"ReactNode","description":"Content lit by the lamp, usually a heading. Leave top padding (about `pt-40`) so it sits under the light."}],
    extends: "All `<div>` props, including `className`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `lamp-open` keyframes and `--animate-lamp-open`. Works in Server Components."],
    customization: ["Made for dark backgrounds; on light ones, use a deeper `color`.","Give the content below enough top padding to sit under the cones."],
    accessibility: ["The light is decorative (`aria-hidden`).","With reduced motion the lamp is already open."],
    troubleshooting: [{"problem":"The light is cut off at the sides.","solution":"The cones are up to 30rem wide each; give the parent enough width or reduce them in the file."}],
  },
})
