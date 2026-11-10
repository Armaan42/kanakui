import { defineItem } from "../define.ts"

export default defineItem({
  name: "testimonials-03",
  type: "registry:block",
  title: "Featured Quote",
  description: "One large quote with a star rating and an avatar row of other customers.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["testimonials"],
  internalDependencies: ["rating","avatar-stack"],
  files: [{ path: "registry/default/blocks/testimonials-03/components/testimonials-03.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["kanakui `rating` and `avatar-stack`. The CLI installs both."],
    customization: ["The quote, rating and names are placeholders. Use a real quote with permission, and a real rating."],
    accessibility: ["A `figure` with `blockquote` and `figcaption`; the rating is read as “5 out of 5 stars”."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
