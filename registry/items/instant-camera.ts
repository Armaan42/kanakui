import { defineItem } from "../define.ts"

export default defineItem({
  "name": "instant-camera",
  "type": "registry:ui",
  "title": "Instant Camera",
  "description": "An instant camera that fires its flash and ejects a print that slowly develops.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/instant-camera.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-instant-camera-eject": "instant-camera-eject 1.1s cubic-bezier(0.2, 0.75, 0.3, 1) both",
      "animate-instant-camera-develop": "instant-camera-develop 5s ease-out both"
    }
  },
  "css": {
    "@keyframes instant-camera-eject": {
      "from": {
        "translate": "0 -100%",
        "rotate": "0deg"
      },
      "to": {
        "translate": "0 0",
        "rotate": "var(--tilt)"
      }
    },
    "@keyframes instant-camera-develop": {
      "from": {
        "filter": "brightness(1.9) saturate(0) contrast(0.55) blur(3px)"
      },
      "to": {
        "filter": "none"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "photos",
        "type": "{ src: string; alt: string; caption?: string }[]",
        "description": "Photos it “takes”, in order."
      },
      {
        "name": "film",
        "type": "number",
        "description": "Exposures in a pack.",
        "default": "8"
      },
      {
        "name": "defaultTaken",
        "type": "number",
        "description": "Photos already taken when it first appears.",
        "default": "0"
      },
      {
        "name": "onCapture",
        "type": "(photo, remaining: number) => void",
        "description": "Called for each shot."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Square photos fit the print exactly."
    ],
    "accessibility": [
      "The shutter is a named button and the remaining film is announced. Reduced motion skips the eject and develop animation."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
