import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-08",
  type: "registry:block",
  title: "Globe Hero",
  description: "A split hero with an interactive 3D globe, a live status and a list of regions.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["hero"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["dotted-globe","status-dot"],
  files: [{ path: "registry/default/blocks/hero-08/components/hero-08.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["shadcn `button`, kanakui `dotted-globe` (three.js) and `status-dot`. The CLI installs them.","A browser with WebGL for the globe."],
    customization: ["The regions and status text are placeholders. Show your real regions and real status."],
    accessibility: ["The globe can be focused and turned with the arrow keys. The status has visible text."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
