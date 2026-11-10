import { defineItem } from "../define.ts"

export default defineItem({
  name: "navbar-01",
  type: "registry:block",
  title: "Responsive Navbar",
  description: "A site header with links and actions that collapses into a menu on small screens.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["navbars"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/blocks/navbar-01/components/navbar-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Links are in the `links` array; logo and actions are in the file.",
    requirements: ["shadcn `button`. The CLI installs it.", "`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: [
      "Edit the `links` array and replace `href=\"#\"`; use your router’s `Link` for internal pages.",
      "Make it sticky with `sticky top-0 z-40` on the `header`.",
      "Change where it collapses by replacing `md:` with another breakpoint throughout the file.",
    ],
    accessibility: [
      "The menu button exposes `aria-expanded` and `aria-controls`, and its label switches between open and close.",
      "Escape closes the menu and returns focus to the button. Choosing a link closes it too.",
      "Only one navigation landmark is visible at a time; the other is hidden with `display: none`.",
    ],
    troubleshooting: [
      { problem: "The menu button does nothing.", solution: "The block is a Client Component (`\"use client\"`). Keep that line at the top of the file." },
    ],
  },
})
