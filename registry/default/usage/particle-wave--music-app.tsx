import { Pause, SkipBack, SkipForward } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ParticleWave } from "@/registry/default/ui/particle-wave"

export const meta = {
  title: "Ambient sound player",
  description: "The particle wave as the visual behind a sleep-sounds app's now-playing screen.",
}

// The app and tracks are made up.
const NEXT = [
  { title: "Rain on a tin roof", length: "45:00" },
  { title: "Harbour at night", length: "60:00" },
  { title: "Train through the countryside", length: "30:00" },
]

export default function MusicApp() {
  return (
    <div className="dark mx-auto flex min-h-svh max-w-md flex-col bg-background text-foreground">
      <div className="relative">
        <ParticleWave amplitude={0.45} className="text-muted-foreground" label="Slow rolling wave of dots" />
      </div>
      <div className="flex-1 px-6 pb-10">
        <p className="text-sm text-muted-foreground">Tidewell Sleep · Now playing</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Waves on a pebble beach</h1>
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-muted" role="img" aria-label="12 of 60 minutes played">
          <div className="h-full w-1/5 rounded-full bg-foreground" />
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted-foreground tabular-nums">
          <span>12:04</span>
          <span>60:00</span>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6">
          <Button variant="ghost" size="icon" aria-label="Previous">
            <SkipBack aria-hidden="true" />
          </Button>
          <Button size="icon" className="size-14 rounded-full" aria-label="Pause">
            <Pause aria-hidden="true" className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next">
            <SkipForward aria-hidden="true" />
          </Button>
        </div>
        <h2 className="mt-10 text-sm font-medium text-muted-foreground">Up next</h2>
        <ul className="mt-2 divide-y text-sm">
          {NEXT.map((track) => (
            <li key={track.title} className="flex justify-between py-3">
              <span>{track.title}</span>
              <span className="text-muted-foreground tabular-nums">{track.length}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
