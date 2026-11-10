import { defineItem } from "../define.ts"

export default defineItem({
  name: "changelog-01",
  type: "registry:block",
  title: "Changelog",
  description: "A changelog section with a timeline of releases.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["content"],
  internalDependencies: ["timeline"],
  files: [{ path: "registry/default/blocks/changelog-01/components/changelog-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["kanakui `timeline` (the CLI installs it). Works in Server Components."],
    customization: ["The releases are placeholders. Mark the newest one with `current`."],
    accessibility: ["An ordered list with `<time>` dates; the current release is announced."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
