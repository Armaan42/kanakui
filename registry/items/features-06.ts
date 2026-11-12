import { defineItem } from "../define.ts"

export default defineItem({
  name: "features-06",
  type: "registry:block",
  title: "Glow Grid Features",
  description: "Six feature cards whose borders light up near the pointer.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["features"],
  dependencies: ["lucide-react"],
  internalDependencies: ["glow-grid"],
  files: [{ path: "registry/default/blocks/features-06/components/features-06.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["kanakui `glow-grid` and `lucide-react`. The CLI installs them."],
    customization: ["The features are placeholders. List what your product really does."],
    accessibility: ["Each card has an `h3`. Icons are decorative."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
