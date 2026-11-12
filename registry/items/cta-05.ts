import { defineItem } from "../define.ts"

export default defineItem({
  name: "cta-05",
  type: "registry:block",
  title: "Beam Rain Call to Action",
  description: "A closing call to action on a dark panel where beams fall and burst into sparks.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["cta"],
  registryDependencies: ["button"],
  internalDependencies: ["beam-rain"],
  files: [{ path: "registry/default/blocks/cta-05/components/cta-05.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["shadcn `button` and kanakui `beam-rain`. The CLI installs them with their CSS.","It renders inside a `.dark` wrapper so it stays dark in both themes; this relies on shadcn’s class-based dark mode (the default)."],
    customization: ["Change the beam colors with `BeamRain`’s `colors`."],
    accessibility: ["The beams are decorative and absent with reduced motion."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
