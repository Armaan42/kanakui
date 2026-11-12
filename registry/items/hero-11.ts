import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-11",
  type: "registry:block",
  title: "Galaxy Hero",
  description: "A full-height hero over a turning particle galaxy.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["hero"],
  registryDependencies: ["button"],
  internalDependencies: ["particle-galaxy","blur-text"],
  files: [{ path: "registry/default/blocks/hero-11/components/hero-11.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["shadcn `button`, kanakui `particle-galaxy` (three.js) and `blur-text`. The CLI installs them.","It renders inside a `.dark` wrapper so it stays dark in both themes; this relies on shadcn’s class-based dark mode (the default).","A browser with WebGL for the galaxy; the text works without it."],
    customization: ["A dark wash behind the text keeps it readable; adjust it in the file."],
    accessibility: ["One `h1`. The galaxy is a labelled image that pauses off screen and with reduced motion."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
