import { defineItem } from "../define.ts"

export default defineItem({
  name: "timeline",
  type: "registry:ui",
  title: "Timeline",
  description: "A vertical timeline for changelogs, roadmaps and history.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["data-display"],
  files: [{ path: "registry/default/ui/timeline.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "entries",
        type: "{ id: string; date: string; dateTime?: string; title: ReactNode; description?: ReactNode; current?: boolean }[]",
        description: "Entries, newest first. `dateTime` fills the `<time>` element. Required.",
      },
    ],
    extends: "All `<ol>` props except `children`.",
    requirements: ["Tailwind CSS v4. Works in Server Components."],
    customization: ["Mark the latest entry with `current` to highlight its marker.", "Put links or badges in `description`."],
    accessibility: ["An ordered list with `<time>` dates and `h3` titles. The current entry is announced as “(current)”."],
    troubleshooting: [{ problem: "Markers don’t sit on the line.", solution: "They are positioned for the default `pl-6`; adjust `-left-[1.95rem]` if you change the padding." }],
  },
})
