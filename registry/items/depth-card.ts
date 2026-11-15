import { defineItem } from "../define.ts"

export default defineItem({
  name: "depth-card",
  type: "registry:ui",
  title: "Depth Card",
  description: "A card that tilts toward the pointer while its layers rise off the surface, each to its own depth.",
  version: "0.1.0",
  releasedAt: "2026-11-15",
  categories: ["cards", "interactive", "3d"],
  files: [{ path: "registry/default/ui/depth-card.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "max", type: "number", default: "12", description: "DepthCard: largest tilt in degrees." },
      { name: "perspective", type: "number", default: "1000", description: "DepthCard: distance to the viewer in px. Smaller values exaggerate the depth." },
      { name: "containerClassName", type: "string", description: "DepthCard: class for the outer element that holds the perspective." },
      { name: "depth", type: "number", default: "0", description: "DepthCardItem: how far the layer rises toward the viewer while the card is active, in px." },
      { name: "x, y", type: "number", default: "0", description: "DepthCardItem: sideways and vertical shift while active, in px." },
      { name: "rotateX, rotateY, rotateZ", type: "number", default: "0", description: "DepthCardItem: extra rotation while active, in degrees." },
    ],
    extends: "Both accept all `<div>` props. `DepthCard`'s `className` styles the card itself (border, background, padding).",
    requirements: ["React 19 and Tailwind CSS v4."],
    customization: [
      "Give the layers you want to stand out the biggest `depth`: 80–120px for a photo, 20–60px for text and buttons.",
      "Style anything else on hover with `group-data-active/depth-card:`, e.g. a deeper shadow on the photo as in the demo.",
      "Put several items in a row inside a `div` with `transform-3d`, so each keeps its own depth.",
    ],
    accessibility: [
      "The motion is decoration only: content, links and buttons work the same flat.",
      "Keyboard focus inside the card lifts the layers too, without tilting.",
      "Touch users and anyone who prefers reduced motion see a flat card.",
    ],
    troubleshooting: [
      {
        problem: "The layers don’t rise, or look flat.",
        solution: "Every element between a `DepthCardItem` and the card must keep 3D: add `transform-3d`, and remove `overflow-hidden` (clipping flattens 3D). Round images on the image itself instead.",
      },
      {
        problem: "Text looks blurry while the card is tilted.",
        solution: "Browsers rasterize 3D layers; keep `max` small (8–12) and depths under ~120px for crisp text.",
      },
    ],
  },
})
