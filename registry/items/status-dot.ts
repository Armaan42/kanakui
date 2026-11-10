import { defineItem } from "../define.ts"

export default defineItem({
  name: "status-dot",
  type: "registry:ui",
  title: "Status Dot",
  description: "A colored status indicator with a label and an optional live pulse.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["data-display"],
  files: [{ path: "registry/default/ui/status-dot.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "status", type: "\"online\" | \"busy\" | \"away\" | \"offline\"", description: "Status to show. Required." },
      { name: "label", type: "string | false", default: "status name", description: "Visible text; `false` keeps it for screen readers only." },
      { name: "pulse", type: "boolean", default: "false", description: "Pulse the dot." },
    ],
    extends: "All `<span>` props except `children`.",
    requirements: ["Tailwind CSS v4. Works in Server Components."],
    customization: ["Add statuses by extending the `STATUS` map."],
    accessibility: ["Always has text, so status never relies on color alone. The pulse stops with reduced motion."],
    troubleshooting: [{ problem: "No pulse.", solution: "It uses Tailwind’s built-in `animate-ping`; check reduced motion isn’t on." }],
  },
})
