import { defineItem } from "../define.ts"

export default defineItem({
  name: "toggle-switch",
  type: "registry:ui",
  title: "Toggle Switch",
  description: "An on/off switch whose thumb slides with a little overshoot.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["inputs", "forms"],
  files: [{ path: "registry/default/ui/toggle-switch.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "checked", type: "boolean", description: "Controlled state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called on toggle." },
      { name: "label", type: "ReactNode", description: "Visible label. Without it, pass `aria-label`." },
      { name: "size", type: "\"sm\" | \"md\"", default: "\"md\"", description: "Switch size." },
    ],
    extends: "All `<button>` props except `onChange` and `value`.",
    requirements: ["React 19 and Tailwind CSS v4."],
    customization: ["Change the on color by editing `bg-foreground` in the file."],
    accessibility: ["`role=\"switch\"` with `aria-checked`; Space and Enter toggle it; clicking the label toggles it too.", "No overshoot animation with reduced motion."],
    troubleshooting: [{ problem: "It submits a form.", solution: "It is `type=\"button\"`. Store its value in a hidden input if a form needs it." }],
  },
})
