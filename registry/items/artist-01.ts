import { defineItem } from "../define.ts"

export default defineItem({
  "name": "artist-01",
  "type": "registry:block",
  "title": "Artist Page",
  "description": "A musician section with a vinyl player, the album's tracklist and upcoming tour dates.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "vinyl-player"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/artist-01/components/artist-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The tracks and shows are arrays at the top of the file.",
    "requirements": [
      "shadcn `button` and kanakui `vinyl-player`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `tracks` and `shows`; a show's `status` is `on-sale`, `few-left` or `sold-out`.",
      "Wire the player's `onPlayingChange` to your audio element to play a real preview."
    ],
    "accessibility": [
      "Labelled by its `h2`. The playing track is marked “Now playing”. Sold-out shows are text, not links."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
