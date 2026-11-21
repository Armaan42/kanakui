import { Mic } from "lucide-react"

import { VolumeKnob } from "@/registry/default/ui/volume-knob"

export const meta = {
  title: "Podcast recording levels",
  description: "Volume knobs as the input gain for each guest in a browser-based podcast recording app.",
}

// The show and guests are made up.
const GUESTS = [
  { name: "Mei Lin", role: "Host", gain: 62 },
  { name: "Jonas Keller", role: "Guest", gain: 48 },
  { name: "Ana Ribeiro", role: "Guest", gain: 71 },
]

export default function PodcastStudio() {
  return (
    <div className="dark mx-auto min-h-svh max-w-4xl bg-background px-6 py-10 text-foreground">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Field Notes · Ep. 43</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Recording levels</h1>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-red-500/40 px-3 py-1 text-sm text-red-400">
          <span className="size-2 animate-pulse rounded-full bg-red-500 motion-reduce:animate-none" />
          Rec 18:42
        </span>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {GUESTS.map((guest) => (
          <li key={guest.name} className="flex flex-col items-center rounded-xl border bg-card p-5 text-center">
            <VolumeKnob label={`${guest.name.split(" ")[0]} gain`} defaultValue={guest.gain} format={(v) => `${v}%`} />
            <p className="mt-3 flex items-center gap-1.5 font-medium">
              <Mic aria-hidden="true" className="size-3.5" />
              {guest.name}
            </p>
            <p className="text-sm text-muted-foreground">{guest.role}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">Keep each level between 50% and 75% so voices peak around −12 dB.</p>
    </div>
  )
}
