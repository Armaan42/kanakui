import { defineItem } from "../define.ts"

export default defineItem({
  name: "navbar-02",
  type: "registry:block",
  title: "Floating Pill Navbar",
  description: "A floating, rounded navigation bar that stays centered at the top of the page.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["navbars"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/blocks/navbar-02/components/navbar-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [
      { name: "currentHref", type: "string", default: "\"#features\"", description: "Highlights the matching link. Pass your router’s current path." },
    ],
    extends: "Only the prop above.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: [
      "In Next.js, pass `currentHref={usePathname()}` from a Client Component and use real paths in `links`.",
      "Remove `sticky top-4` from the outer element if it shouldn’t follow the page.",
    ],
    accessibility: [
      "The current link has `aria-current=\"page\"`.",
      "The menu button exposes `aria-expanded`; Escape closes the menu and returns focus.",
    ],
    troubleshooting: [{ problem: "Content shows through the bar.", solution: "It uses a translucent background with blur. Raise the opacity (`bg-background/95`) for busy pages." }],
  },
})
