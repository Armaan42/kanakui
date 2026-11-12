import { defineItem } from "../define.ts"

export default defineItem({
  name: "beam-rain",
  type: "registry:ui",
  title: "Beam Rain",
  description: "Beams of light fall to the floor and burst into sparks when they land.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["backgrounds","animations","effects"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/beam-rain.tsx", type: "registry:ui" }],
  cssVars: { theme: {"animate-beam-rain-fall":"beam-rain-fall 6s linear infinite backwards"} },
  css: {"@keyframes beam-rain-fall":{"from":{"transform":"translateY(-140%)"},"to":{"transform":"translateY(var(--beam-rain-distance, 24rem))"}}},
  pageDocs: {
    props: [{"name":"count","type":"number","default":"8","description":"Number of beams."},{"name":"colors","type":"[string, string]","default":"violet → pale cyan","description":"Beam color from tail to head, also used for sparks. Any CSS colors."}],
    extends: "Only the props above, plus `className`.",
    requirements: ["`motion` (the CLI installs it) and Tailwind CSS v4. The CLI adds the `beam-rain-fall` keyframes."],
    customization: ["Made for dark panels. Place inside a `relative isolate overflow-hidden` element."],
    accessibility: ["Decorative (`aria-hidden`).","Paused off screen; absent with reduced motion."],
    troubleshooting: [{"problem":"Beams fall outside the panel.","solution":"Give the parent `relative overflow-hidden`."}],
  },
})
