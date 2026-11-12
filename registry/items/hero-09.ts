import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-09",
  type: "registry:block",
  title: "Lamp Hero",
  description: "A centered hero lit by a lamp, with a headline that rises out of a blur.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  featured: true,
  categories: ["hero"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["lamp","blur-text"],
  files: [{ path: "registry/default/blocks/hero-09/components/hero-09.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["shadcn `button`, kanakui `lamp` and `blur-text`. The CLI installs them with their CSS. Works in Server Components.","It renders inside a `.dark` wrapper so it stays dark in both themes; this relies on shadcn’s class-based dark mode (the default)."],
    customization: ["Change the light with `Lamp`’s `color`."],
    accessibility: ["One `h1`, real text. The light is decorative and the animations respect reduced motion."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
