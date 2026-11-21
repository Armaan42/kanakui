import { Button } from "@/components/ui/button"
import { CassettePlayer } from "@/registry/default/ui/cassette-player"

export const meta = {
  title: "Shared mixtape page",
  description: "The cassette player at the top of a shared playlist page, as if a friend had made you a tape.",
}

// The playlist, people and songs are made up.
const SONGS = [
  { title: "Harbour Lights", artist: "Ines Varga", length: "3:41" },
  { title: "Ferry at Six", artist: "The Low Tides", length: "4:05" },
  { title: "Salt", artist: "Copper Kites", length: "2:58" },
  { title: "Home by Dark", artist: "Ana & The Engine Shed", length: "5:12" },
]

export default function MixtapeShare() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Jonas made you a mixtape</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">For the drive to the coast</h1>
      <CassettePlayer className="mt-6" title="For the drive to the coast" artist="Side A · made by Jonas" duration={954} side="A" />
      <ol className="mt-8 divide-y border-y text-sm">
        {SONGS.map((song, i) => (
          <li key={song.title} className="flex items-center gap-4 py-3">
            <span className="w-5 text-muted-foreground tabular-nums">{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium">{song.title}</span>
              <span className="text-muted-foreground">{song.artist}</span>
            </span>
            <span className="text-muted-foreground tabular-nums">{song.length}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex gap-3">
        <Button>Save to my library</Button>
        <Button variant="outline">Make one back</Button>
      </div>
    </div>
  )
}
