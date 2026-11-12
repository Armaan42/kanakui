import { defineItem } from "../define.ts"

export default defineItem({
  name: "features-07",
  type: "registry:block",
  title: "Device Reveal",
  description: "A heading above a tilted screen that straightens as it scrolls into view.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["features"],
  internalDependencies: ["scroll-device"],
  files: [{ path: "registry/default/blocks/features-07/components/features-07.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["kanakui `scroll-device` (the CLI installs it and `motion`)."],
    customization: ["The screen shows a mock dashboard built from divs. Replace it with a screenshot or your real UI."],
    accessibility: ["The mock dashboard is `aria-hidden`; describe your product in the heading and text."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
