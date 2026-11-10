import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-07",
  type: "registry:block",
  title: "Particle Wave Hero",
  description: "A centered hero over a rolling 3D particle wave.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["hero"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["particle-wave"],
  files: [{ path: "registry/default/blocks/hero-07/components/hero-07.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["shadcn `button` and kanakui `particle-wave` (three.js). The CLI installs them, including `@types/three`.","A browser with WebGL; without it the text and actions still show."],
    customization: ["The wave sits in the bottom 20rem; change `h-80` to make it taller.","A muted wave color keeps the headline readable."],
    accessibility: ["One `h1`. The wave is a labelled image that pauses off screen and with reduced motion."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
