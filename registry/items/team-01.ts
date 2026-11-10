import { defineItem } from "../define.ts"

export default defineItem({
  name: "team-01",
  type: "registry:block",
  title: "Team Grid",
  description: "Team members as a grid of avatars, names and roles.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["team"],
  files: [{ path: "registry/default/blocks/team-01/components/team-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. People are in the `team` array at the top of the file.",
    requirements: ["React 19 and Tailwind CSS v4. No other dependencies. Works in Server Components."],
    customization: [
      "The names are placeholders. List your real team, with their consent.",
      "Replace the initials tile with a photo: `<img src=\"…\" alt=\"Name\" className=\"aspect-square rounded-xl object-cover\" />`.",
    ],
    accessibility: ["People are a list; each name is an `h3`.", "Initials are decorative; real photos need `alt` text with the person’s name."],
    troubleshooting: [{ problem: "Uneven rows.", solution: "Keep the number of people a multiple of 4 (desktop) and 2 (phone), or accept a shorter last row." }],
  },
})
