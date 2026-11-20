import { defineItem } from "../define.ts"

export default defineItem({
  "name": "calm-break-01",
  "type": "registry:block",
  "title": "Calm Break",
  "description": "A two-minute break: rake a sand garden, breathe with a circle and wind a music box.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "zen-garden",
    "music-box"
  ],
  "files": [
    {
      "path": "registry/default/blocks/calm-break-01/components/calm-break-01.tsx",
      "type": "registry:component"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-calm-break-01-breathe": "calm-break-01-breathe 10s ease-in-out infinite",
      "animate-calm-break-01-in": "calm-break-01-in 10s step-end infinite",
      "animate-calm-break-01-out": "calm-break-01-out 10s step-end infinite"
    }
  },
  "css": {
    "@keyframes calm-break-01-breathe": {
      "0%, 100%": {
        "transform": "scale(0.55)"
      },
      "40%": {
        "transform": "scale(1)"
      }
    },
    "@keyframes calm-break-01-in": {
      "0%": {
        "opacity": "1"
      },
      "40%": {
        "opacity": "0"
      }
    },
    "@keyframes calm-break-01-out": {
      "0%": {
        "opacity": "0"
      },
      "40%": {
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `zen-garden` and VenusUI `music-box`. The CLI installs them. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Swap the music box `tune`, or change the breathing rhythm in the keyframes (4 seconds in, 6 out).",
      "The businesses, people and prices in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "The breathing guide has a text version for screen readers and a still one for reduced motion; the garden and music box work from the keyboard."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
