import { defineItem } from "../define.ts"

export default defineItem({
  name: "footer-01",
  type: "registry:block",
  featured: true,
  title: "Multi-column Footer",
  description: "A footer with a brand column, three link columns and a legal bar.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "footers"
  ],
  files: [
    {
      path: "registry/default/blocks/footer-01/components/footer-01.tsx",
      type: "registry:component"
    }
  ],
  pageDocs: {
    props: [],
    extends: "No props. Brand, link columns and legal links are arrays at the top of the file.",
    requirements: [
      "React 19 and Tailwind CSS v4. No other dependencies."
    ],
    customization: [
      "Edit the `columns` and `legal` arrays to change links. Replace each `href=\"#\"` with real URLs, or use `next/link` for internal pages.",
      "Replace the square logo placeholder and the name “Acme” with your logo.",
      "Update the copyright line, which is plain text so it never changes unexpectedly."
    ],
    accessibility: [
      "Each link column is a `nav` labelled by its heading, so screen reader users can jump between them.",
      "Uses a `footer` element, which is announced as the content information landmark."
    ],
    troubleshooting: [
      {
        problem: "The footer headings don’t fit my page outline.",
        solution: "Column titles are `h2`. Change them to `h3` or plain text if your page needs a different heading structure."
      }
    ]
  }
})
