import { defineItem } from "../define.ts"

export default defineItem({
  name: "glow-grid",
  type: "registry:ui",
  title: "Glow Grid",
  description: "Cards whose borders light up near the pointer, as if a light moved across them.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["cards","effects","interactive"],
  files: [{ path: "registry/default/ui/glow-grid.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [{"name":"color","type":"string","default":"\"oklch(0.75 0.17 290)\"","description":"GlowGrid: color of the light. Any CSS color."}],
    extends: "`GlowGrid` and `GlowCard` accept all `<div>` props. Lay out the grid with grid classes.",
    requirements: ["React 19 and Tailwind CSS v4."],
    customization: ["Every `GlowCard` inside one `GlowGrid` shares the light, so neighbors glow too.","Change the light size (260px) in the class list."],
    accessibility: ["Pure decoration; cards keep their normal borders for touch and keyboard users."],
    troubleshooting: [{"problem":"Nothing lights up.","solution":"Cards must be `GlowCard`s inside a `GlowGrid`."}],
  },
})
