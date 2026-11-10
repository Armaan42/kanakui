import { defineItem } from "../define.ts"

export default defineItem({
  name: "logo-cloud-01",
  type: "registry:block",
  title: "Scrolling Logo Cloud",
  description: "A heading and a slowly scrolling row of customer logos with faded edges.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["logo-clouds"],
  internalDependencies: ["marquee"],
  files: [{ path: "registry/default/blocks/logo-cloud-01/components/logo-cloud-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Logos are in the `logos` array at the top of the file.",
    requirements: ["kanakui `marquee` (the CLI installs it with its CSS), React 19 and Tailwind CSS v4."],
    customization: [
      "The names are placeholders. Replace them with logos of customers who agreed to be listed, e.g. `<img src=\"/logos/x.svg\" alt=\"X\" className=\"h-6 w-auto\" />`.",
      "Use monochrome logos and lower their opacity so no single brand dominates.",
    ],
    accessibility: [
      "Give every logo image `alt` text with the company name.",
      "The row is read once and stops moving with reduced motion.",
    ],
    troubleshooting: [
      { problem: "Gaps appear on very wide screens.", solution: "Add more logos, or raise `repeat` on the `Marquee`." },
    ],
  },
})
