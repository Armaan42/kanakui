import { defineItem } from "../define.ts"

export default defineItem({
  name: "background-beams",
  type: "registry:ui",
  title: "Background Beams",
  description: "Curved lines across a section with light traveling along them.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["backgrounds","animations","effects"],
  files: [{ path: "registry/default/ui/background-beams.tsx", type: "registry:ui" }],
  cssVars: { theme: {"animate-beam-travel":"beam-travel 8s linear infinite"} },
  css: {"@keyframes beam-travel":{"from":{"stroke-dashoffset":"1.12"},"to":{"stroke-dashoffset":"0"}}},
  pageDocs: {
    props: [{"name":"count","type":"number","default":"18","description":"Number of beams."},{"name":"colors","type":"[string, string]","default":"violet → sky","description":"Start and end color of the traveling light. Any CSS colors."}],
    extends: "All `<div>` props, including `className`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `beam-travel` keyframes and `--animate-beam-travel`."],
    customization: ["The faint lines use the text color; the moving light uses `colors`.","Place inside a `relative` element with `isolate` so it stays behind your content."],
    accessibility: ["Decorative (`aria-hidden`).","The traveling light is hidden with reduced motion; the faint lines stay."],
    troubleshooting: [{"problem":"Beams cover the content.","solution":"Add `relative isolate` to the parent; the beams sit at `-z-10`."}],
  },
})
