import { defineItem } from "../define.ts"

export default defineItem({
  "name": "volume-knob",
  "type": "registry:ui",
  "title": "Volume Knob",
  "description": "A synth-style knob you drag, scroll or use the keyboard to turn, with an LED ring.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/volume-knob.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "value, defaultValue",
        "type": "number",
        "default": "50",
        "description": "Controlled or initial value."
      },
      {
        "name": "onValueChange",
        "type": "(value: number) => void",
        "description": "Called as it turns."
      },
      {
        "name": "min, max, step",
        "type": "number",
        "default": "0, 100, 1",
        "description": "Range and step."
      },
      {
        "name": "label",
        "type": "string",
        "default": "\"Volume\"",
        "description": "Accessible name and caption."
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "description": "Formats the readout and the value read to screen readers, e.g. `+3 dB`."
      }
    ],
    "extends": "All `<div>` props except `onChange` and `defaultValue`.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Drag sensitivity is `DRAG_RANGE` (pixels for the full range) in the file."
    ],
    "accessibility": [
      "It's a `slider` with value text; arrow keys step, Page Up/Down jump a tenth, Home and End go to the ends.",
      "Scrolling over it turns it without scrolling the page."
    ],
    "troubleshooting": [
      {
        "problem": "Dragging on a phone scrolls the page.",
        "solution": "The knob uses `touch-none`; make sure a parent isn't capturing the touch first."
      }
    ]
  }
})
