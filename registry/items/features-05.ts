import { defineItem } from "../define.ts"

export default defineItem({
  name: "features-05",
  type: "registry:block",
  title: "Orbiting Integrations",
  description: "Integration icons orbiting your logo, beside a short pitch.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["features"],
  dependencies: ["lucide-react"],
  internalDependencies: ["orbiting-circles"],
  files: [{ path: "registry/default/blocks/features-05/components/features-05.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["kanakui `orbiting-circles` (the CLI installs it and its CSS), `lucide-react`, Tailwind CSS v4."],
    customization: ["The icons are placeholders. List only integrations you actually support.","Change the ring sizes with `radius` on each `OrbitingCircles`."],
    accessibility: ["Each icon has a visually hidden name. Items rest on the orbit with reduced motion."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
