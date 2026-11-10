import { defineItem } from "../define.ts"

export default defineItem({
  name: "password-input",
  type: "registry:ui",
  title: "Password Input",
  description: "A password field with a show/hide toggle and an optional strength meter.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["inputs", "forms"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/password-input.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "showStrength", type: "boolean", default: "false", description: "Show a four-step meter and a hint under the field." },
    ],
    extends: "All `<input>` props except `type`. Works controlled (`value` + `onChange`) or uncontrolled.",
    requirements: ["`lucide-react` for the eye icons, React 19 and Tailwind CSS v4."],
    customization: [
      "`scorePassword` is exported. Replace it with your own rules (or a library such as zxcvbn) to match your policy.",
      "Use `autoComplete=\"new-password\"` on sign-up and `\"current-password\"` on sign-in so password managers help.",
    ],
    accessibility: [
      "The eye button is a toggle labelled “Show password” with `aria-pressed`.",
      "The strength hint is linked with `aria-describedby` and announced politely as it changes.",
      "The meter colors are backed by text, so strength isn’t conveyed by color alone.",
    ],
    troubleshooting: [
      { problem: "The meter says Strong but the server rejects the password.", solution: "The meter is only a guide. Always validate passwords on the server against your real policy." },
    ],
  },
})
