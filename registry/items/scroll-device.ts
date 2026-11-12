import { defineItem } from "../define.ts"

export default defineItem({
  name: "scroll-device",
  type: "registry:ui",
  title: "Scroll Device",
  description: "A large screen, tipped back in 3D, that swings upright as it scrolls into view.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["3d","animations","cards"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/scroll-device.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [{"name":"children","type":"ReactNode","description":"What runs on the screen: a screenshot, a video or live UI. Required."},{"name":"tilt","type":"number","default":"38","description":"Starting tilt in degrees."}],
    extends: "Only the props above, plus `className`.",
    requirements: ["`motion` (the CLI installs it), React 19 and Tailwind CSS v4."],
    customization: ["The screen is 16:10; fill it with an image using `object-cover`.","Give the section `overflow-hidden` so the tilted screen doesn’t cause sideways scrolling."],
    accessibility: ["Pure motion; the screen content keeps its own semantics.","Flat and still with reduced motion."],
    troubleshooting: [{"problem":"It doesn’t move.","solution":"The motion follows page scroll; it needs room above and below to scroll through."}],
  },
})
