import { defineItem } from "../define.ts"

export default defineItem({
  name: "tilt-card",
  type: "registry:ui",
  title: "Tilt Card",
  description: "A card that tilts in 3D toward the pointer, with a glare that follows it.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["cards","interactive","3d"],
  files: [{ path: "registry/default/ui/tilt-card.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [{"name":"max","type":"number","default":"10","description":"Largest tilt in degrees."},{"name":"glare","type":"boolean","default":"true","description":"Show a glare that follows the pointer."}],
    extends: "All `<div>` props, including `className`.",
    requirements: ["React 19 and Tailwind CSS v4."],
    customization: ["Keep `max` small (6–12) so text stays readable."],
    accessibility: ["Touch and keyboard users see a normal card.","Stays flat with reduced motion."],
    troubleshooting: [{"problem":"The tilt looks flat.","solution":"Don’t remove the wrapper with `perspective-[900px]`."}],
  },
})
