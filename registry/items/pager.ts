import { defineItem } from "../define.ts"

export default defineItem({
  "name": "pager",
  "type": "registry:ui",
  "title": "Pager",
  "description": "A 90s pager: new pages beep, buzz and blink, and long messages scroll across the two-line screen.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "data-display",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/pager.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-pager-buzz": "pager-buzz 0.5s linear 2",
      "animate-pager-blink": "pager-blink 1s linear infinite",
      "animate-pager-scroll": "pager-scroll 6s ease-in-out infinite alternate"
    }
  },
  "css": {
    "@keyframes pager-buzz": {
      "0%, 100%": {
        "transform": "translateX(0)"
      },
      "10%, 50%, 90%": {
        "transform": "translateX(-3px)"
      },
      "30%, 70%": {
        "transform": "translateX(3px)"
      }
    },
    "@keyframes pager-blink": {
      "0%, 49%": {
        "opacity": "1"
      },
      "50%, 100%": {
        "opacity": "0.2"
      }
    },
    "@keyframes pager-scroll": {
      "0%, 15%": {
        "transform": "translateX(0)"
      },
      "85%, 100%": {
        "transform": "translateX(calc(-100% + 11.5rem))"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "messages",
        "type": "{ from: string; text: string; time: string }[]",
        "description": "Pages already received."
      },
      {
        "name": "incoming",
        "type": "{ from: string; text: string; time: string }[]",
        "description": "Pages the “Page me” button sends."
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Feed real notifications in through `messages`."
    ],
    "accessibility": [
      "Each page is announced in full, so the scrolling screen isn’t the only way to read it."
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
