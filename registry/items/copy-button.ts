import { defineItem } from "../define.ts"

export default defineItem({
  name: "copy-button",
  type: "registry:ui",
  title: "Copy Button",
  description: "Copies text to the clipboard and confirms with a check mark and a screen reader message.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["buttons", "interactive"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/copy-button.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "value", type: "string", description: "Text to copy. Required." },
      { name: "timeout", type: "number", default: "2000", description: "Milliseconds the copied state is shown." },
      { name: "onCopy", type: "(value: string) => void", description: "Called after a successful copy." },
    ],
    extends: "All `<button>` props except `value`. Give icon-only buttons an `aria-label`.",
    requirements: ["`lucide-react` for icons, React 19 and Tailwind CSS v4.", "A secure context (HTTPS or localhost) for the Clipboard API."],
    customization: [
      "Pass children for a text button (`<CopyButton value={x}>Copy</CopyButton>`), or none for an icon button.",
      "Style the copied state with `data-[state=copied]:` classes, e.g. a green border.",
    ],
    accessibility: [
      "The result (“Copied” or “Copy failed”) is announced through a polite live region.",
      "Icon-only usage needs `aria-label`, e.g. “Copy install command”.",
    ],
    troubleshooting: [
      { problem: "Nothing is copied on a plain HTTP page.", solution: "Browsers only allow the Clipboard API on HTTPS and localhost. The button shows the failed state in that case." },
    ],
  },
})
