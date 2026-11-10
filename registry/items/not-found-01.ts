import { defineItem } from "../define.ts"

export default defineItem({
  name: "not-found-01",
  type: "registry:block",
  title: "404 Page",
  description: "A 404 page body with an extruded 404, a short message and a link home.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["content"],
  dependencies: ["lucide-react"],
  internalDependencies: ["text-3d","grid-pattern"],
  files: [{ path: "registry/default/blocks/not-found-01/components/not-found-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["kanakui `text-3d` and `grid-pattern`. The CLI installs both. Works in Server Components."],
    customization: ["Built for Next.js: render it from `app/not-found.tsx`. In other frameworks, replace `Link` with your router's link."],
    accessibility: ["The “404” is visible text; the page title is an `h1`."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
