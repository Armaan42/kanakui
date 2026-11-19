import { defineItem } from "../define.ts"

export default defineItem({
  "name": "camera-shutter",
  "type": "registry:ui",
  "title": "Camera Shutter",
  "description": "A lens with a working iris: blades close to the chosen aperture and snap shut when you release the shutter.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "interactive",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/camera-shutter.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "stops",
        "type": "number[]",
        "description": "Apertures as f-numbers, widest first.",
        "default": "[1.8 … 16]"
      },
      {
        "name": "defaultStop",
        "type": "number",
        "description": "Aperture selected at first."
      },
      {
        "name": "lensLabel",
        "type": "string",
        "description": "Text engraved on the lens ring.",
        "default": "\"50mm 1:1.8\""
      },
      {
        "name": "onStopChange",
        "type": "(stop: number) => void",
        "description": "Called when the aperture changes."
      },
      {
        "name": "onCapture",
        "type": "(shot: { stop: number; count: number }) => void",
        "description": "Called each time the shutter fires."
      }
    ],
    "extends": "All `<div>` props; `className` sets the width.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Connect `onCapture` to a real camera flow or use it as a playful confirmation control."
    ],
    "accessibility": [
      "Apertures are native radio buttons, so the arrow keys work. The shot count is announced politely.",
      "With reduced motion the blades move straight to their position."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
