import { defineItem } from "../define.ts"

export default defineItem({
  name: "cta-03",
  type: "registry:block",
  title: "Install Command CTA",
  description: "A developer call to action with a pitch and a copyable command.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["cta"],
  internalDependencies: ["copy-button"],
  files: [{ path: "registry/default/blocks/cta-03/components/cta-03.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Set `command` at the top of the file.",
    requirements: ["kanakui `copy-button` (the CLI installs it), React 19 and Tailwind CSS v4.", "HTTPS (or localhost) for copying to work."],
    customization: ["Change `command` to your real getting-started command.", "Long commands scroll sideways inside the box."],
    accessibility: ["The `$` prompt is hidden from screen readers and from text selection.", "The copy result is announced (“Copied”)."],
    troubleshooting: [{ problem: "Copy doesn’t work.", solution: "Browsers only allow clipboard access on HTTPS and localhost." }],
  },
})
