import { defineItem } from "../define.ts"

export default defineItem({
  name: "footer-03",
  type: "registry:block",
  title: "Wordmark Footer",
  description: "A footer with link columns and a huge brand wordmark along the bottom.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["footers"],
  files: [{ path: "registry/default/blocks/footer-03/components/footer-03.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["React 19 and Tailwind CSS v4. No other dependencies. Works in Server Components."],
    customization: ["Replace “acme” with your brand; the size scales with the viewport.","Replace each `href=\"#\"`."],
    accessibility: ["The giant wordmark is decorative (`aria-hidden`); link columns are labelled `nav` elements."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
