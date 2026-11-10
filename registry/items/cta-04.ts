import { defineItem } from "../define.ts"

export default defineItem({
  name: "cta-04",
  type: "registry:block",
  title: "Aurora Call to Action",
  description: "A call to action over a soft aurora with a sparkling keyword.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["cta"],
  registryDependencies: ["button"],
  internalDependencies: ["aurora-background","sparkles"],
  files: [{ path: "registry/default/blocks/cta-04/components/cta-04.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["shadcn `button`, kanakui `aurora-background` and `sparkles`. The CLI installs them with their CSS."],
    customization: ["Pass brand `colors` to `AuroraBackground` at a low `intensity`."],
    accessibility: ["Sparkles and aurora are decorative; both stop with reduced motion."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
