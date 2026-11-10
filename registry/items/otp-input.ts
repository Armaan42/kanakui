import { defineItem } from "../define.ts"

export default defineItem({
  name: "otp-input",
  type: "registry:ui",
  title: "OTP Input",
  description: "One-time code entry in separate boxes with paste, autofill and keyboard navigation.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["inputs", "forms"],
  files: [{ path: "registry/default/ui/otp-input.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "length", type: "number", default: "6", description: "Number of characters." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called whenever the value changes." },
      { name: "onComplete", type: "(value: string) => void", description: "Called when every box is filled, e.g. to submit." },
      { name: "alphanumeric", type: "boolean", default: "false", description: "Accept letters as well as digits." },
      { name: "label", type: "string", default: "\"Verification code\"", description: "Accessible name for the group." },
      { name: "disabled", type: "boolean", description: "Disable all boxes." },
    ],
    extends: "Only the props above.",
    requirements: ["React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`."],
    customization: [
      "Submit automatically with `onComplete`, but keep a submit button for people who type slowly.",
      "Letters are converted to upper case when `alphanumeric` is on.",
    ],
    accessibility: [
      "The boxes form a labelled group, and each box is named “Character n of 6”.",
      "Arrow keys move between boxes, Backspace deletes and moves back, and pasting a code fills every box.",
      "The first box uses `autocomplete=\"one-time-code\"`, so phones can fill codes from SMS.",
    ],
    troubleshooting: [
      { problem: "SMS autofill doesn’t appear.", solution: "The OS offers it only when the field is in a page served over HTTPS and the SMS follows the platform’s one-time-code format." },
    ],
  },
})
