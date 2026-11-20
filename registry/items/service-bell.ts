import { defineItem } from "../define.ts"

export default defineItem({
  "name": "service-bell",
  "type": "registry:ui",
  "title": "Service Bell",
  "description": "A brass service bell: tap it for a ding as the dome wobbles.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/service-bell.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-service-bell-wobble": "service-bell-wobble 0.6s ease-out"
    }
  },
  "css": {
    "@keyframes service-bell-wobble": {
      "0%": {
        "transform": "rotate(0deg)"
      },
      "20%": {
        "transform": "rotate(-3deg) scaleY(0.97)"
      },
      "40%": {
        "transform": "rotate(2.5deg)"
      },
      "60%": {
        "transform": "rotate(-1.5deg)"
      },
      "80%": {
        "transform": "rotate(0.8deg)"
      },
      "100%": {
        "transform": "rotate(0deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Engraved under the bell.",
        "default": "\"Please ring\""
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      },
      {
        "name": "onRing",
        "type": "(count: number) => void",
        "description": "Called on every ring."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Use `onRing` to notify your team, e.g. a support request."
    ],
    "accessibility": [
      "The bell is a button; each ring is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      },
      {
        "problem": "There’s no sound.",
        "solution": "Browsers only play audio after a click or key press on the page, and the device must not be muted. Pass `sound={false}` to turn it off."
      }
    ]
  }
})
