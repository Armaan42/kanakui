import { defineItem } from "../define.ts"

export default defineItem({
  "name": "credit-01",
  "type": "registry:block",
  "title": "Credit Score Card",
  "description": "A credit health section: the score gauge, the factors behind it, the trend and a tip.",
  "version": "0.1.1",
  "releasedAt": "2026-11-16",
  "categories": [
    "stats"
  ],
  "internalDependencies": [
    "score-gauge"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/credit-01/components/credit-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The factors and history are arrays at the top of the file.",
    "requirements": [
      "VenusUI `score-gauge`. The CLI installs it.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `factors` (level is 0–1) and `history` (the last six scores)."
    ],
    "accessibility": [
      "The trend line is an image labelled with the scores; factor ratings are text, not color alone."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
