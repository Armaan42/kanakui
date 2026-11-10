import { defineItem } from "../define.ts"

export default defineItem({
  name: "footer-02",
  type: "registry:block",
  title: "Minimal Footer",
  description: "A compact centered footer with one row of links, social links and the copyright line.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["footers"],
  files: [{ path: "registry/default/blocks/footer-02/components/footer-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. `links` and `social` are arrays at the top of the file.",
    requirements: ["React 19 and Tailwind CSS v4. No other dependencies. Works in Server Components."],
    customization: ["Replace each `href=\"#\"` and the brand.", "Swap social text links for icons, keeping a text label (`aria-label`)."],
    accessibility: ["Links sit in a labelled `nav`; social links in a labelled list.", "Uses a `footer` landmark."],
    troubleshooting: [{ problem: "Links wrap on phones.", solution: "They wrap and stay centered by design; keep the list short." }],
  },
})
