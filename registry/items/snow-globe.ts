import { defineItem } from "../define.ts"

export default defineItem({
  "name": "snow-globe",
  "type": "registry:ui",
  "title": "Snow Globe",
  "description": "A snow globe around any photo: snow drifts gently, and a shake sends a flurry.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "animations",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/snow-globe.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-snow-globe-shake": "snow-globe-shake 0.6s ease-in-out",
      "animate-snow-globe-fall": "snow-globe-fall 6s linear infinite"
    }
  },
  "css": {
    "@keyframes snow-globe-shake": {
      "0%, 100%": {
        "transform": "rotate(0)"
      },
      "25%": {
        "transform": "rotate(-8deg)"
      },
      "50%": {
        "transform": "rotate(7deg)"
      },
      "75%": {
        "transform": "rotate(-4deg)"
      }
    },
    "@keyframes snow-globe-fall": {
      "from": {
        "transform": "translate(0, 0)"
      },
      "to": {
        "transform": "translate(var(--drift), 270px)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "src, alt",
        "type": "string",
        "description": "The scene inside."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Engraved on the base.",
        "default": "\"Greetings\""
      },
      {
        "name": "flakes",
        "type": "number",
        "description": "Flakes when still.",
        "default": "40"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Works with any photo; square crops look best."
    ],
    "accessibility": [
      "The globe and Shake are buttons. Reduced motion keeps the snow still."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
