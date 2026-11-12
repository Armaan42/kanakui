import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-10",
  type: "registry:block",
  title: "Globe Routes Hero",
  description: "A split hero with a globe of glowing routes, a glowing button and three stats.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["hero"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["arc-globe","glow-border-button"],
  files: [{ path: "registry/default/blocks/hero-10/components/hero-10.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["shadcn `button`, kanakui `arc-globe` (three.js) and `glow-border-button`. The CLI installs them.","It renders inside a `.dark` wrapper so it stays dark in both themes; this relies on shadcn’s class-based dark mode (the default).","A browser with WebGL for the globe."],
    customization: ["The stats are placeholders. Show only figures you can back up.","Pass your own `routes` to the globe."],
    accessibility: ["The globe can be focused and turned with the arrow keys. Stats are a description list."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
