import { defineItem } from "../define.ts"

export default defineItem({
  "name": "sketch-pad",
  "type": "registry:ui",
  "title": "Sketch Pad",
  "description": "A two-knob drawing toy: one knob draws across, the other up and down; shake to clear.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "inputs"
  ],
  "files": [
    {
      "path": "registry/default/ui/sketch-pad.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-sketch-pad-shake": "sketch-pad-shake 0.5s ease-in-out"
    }
  },
  "css": {
    "@keyframes sketch-pad-shake": {
      "0%, 100%": {
        "transform": "translateX(0) rotate(0)"
      },
      "20%": {
        "transform": "translateX(-10px) rotate(-2deg)"
      },
      "40%": {
        "transform": "translateX(10px) rotate(2deg)"
      },
      "60%": {
        "transform": "translateX(-6px) rotate(-1deg)"
      },
      "80%": {
        "transform": "translateX(6px) rotate(1deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "width, height",
        "type": "number",
        "description": "Screen size in pixels.",
        "default": "300, 200"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Read the canvas with `toDataURL()` to save a drawing."
    ],
    "accessibility": [
      "Focus the screen and draw with the arrow keys; the knobs also take arrow keys."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
