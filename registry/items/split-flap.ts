import { defineItem } from "../define.ts"

export default defineItem({
  "name": "split-flap",
  "type": "registry:ui",
  "title": "Split-Flap Display",
  "description": "An airport departures-board display whose letters flip through to new text.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "text",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/split-flap.tsx",
      "type": "registry:ui"
    }
  ],
  "css": {
    "@keyframes split-flap-top": {
      "from": {
        "transform": "rotateX(0deg)"
      },
      "to": {
        "transform": "rotateX(-90deg)"
      }
    },
    "@keyframes split-flap-bottom": {
      "from": {
        "transform": "rotateX(90deg)"
      },
      "to": {
        "transform": "rotateX(0deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "value",
        "type": "string",
        "description": "Text to show; padded or cut to `length`. Unknown characters show as spaces."
      },
      {
        "name": "length",
        "type": "number",
        "description": "Number of flaps. Defaults to the value's length; set it so the board doesn't change size."
      },
      {
        "name": "speed",
        "type": "number",
        "default": "70",
        "description": "Milliseconds per flip."
      },
      {
        "name": "charset",
        "type": "string",
        "description": "Characters each flap flips through, in order. Defaults to space, A–Z, 0–9 and `:.-/!?`."
      }
    ],
    "extends": "All `<div>` props except `children`; set the size with a text class, e.g. `text-xl`.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the `split-flap-top` and `split-flap-bottom` keyframes to your CSS."
    ],
    "customization": [
      "Each flap flips through the charset in order, so changing “A” to “Z” takes longer than “A” to “B”. A shorter `charset` (e.g. digits only) makes counters snappier."
    ],
    "accessibility": [
      "Screen readers get the text itself, not the flaps.",
      "With reduced motion the text changes without flipping."
    ],
    "troubleshooting": [
      {
        "problem": "Flaps don't animate.",
        "solution": "Check that the `split-flap-*` keyframes are in your CSS; the CLI adds them."
      }
    ]
  }
})
