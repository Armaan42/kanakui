import { defineItem } from "../define.ts"

export default defineItem({
  "name": "game-night-01",
  "type": "registry:block",
  "title": "Game Night",
  "description": "A game-night scoreboard: flip for who starts, roll dice and add rolls to players.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "coin-flip",
    "dice-roller"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/game-night-01/components/game-night-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `button` and VenusUI `coin-flip` and VenusUI `dice-roller`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `PLAYERS`; scores live in component state.",
      "The people, businesses and numbers in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "The section is labelled by its heading, and every control works from the keyboard and announces its result."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
