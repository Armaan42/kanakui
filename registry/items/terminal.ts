import { defineItem } from "../define.ts"

export default defineItem({
  name: "terminal",
  type: "registry:ui",
  title: "Terminal",
  description: "A terminal window that types commands and prints their output when it scrolls into view.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["data-display","text","animations"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/terminal.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [{"name":"lines","type":"{ type: \"command\" | \"output\" | \"success\"; text: string; delay?: number }[]","description":"The session. Commands are typed; other lines appear. Required."},{"name":"title","type":"string","default":"\"Terminal\"","description":"Title in the window bar."},{"name":"typingSpeed","type":"number","default":"30","description":"Milliseconds per typed character."}],
    extends: "Only the props above, plus `className`.",
    requirements: ["`lucide-react` (the CLI installs it), React 19 and Tailwind CSS v4."],
    customization: ["Show real output from your CLI, not invented results.","Use `delay` on a line to pause before it, e.g. while something builds."],
    accessibility: ["Screen readers get the whole session as text at once.","With reduced motion the finished session shows immediately. A Replay button appears when it finishes."],
    troubleshooting: [{"problem":"It never starts.","solution":"It starts when half of it is on screen; make sure it isn’t hidden."}],
  },
})
