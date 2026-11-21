"use client"

import * as React from "react"
import { Check, Speaker } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RippleBackground } from "@/registry/default/ui/ripple-background"

export const meta = {
  title: "Device pairing",
  description: "Ripples behind a speaker app's pairing screen while it searches; nearby devices appear and can be connected.",
}

// The speakers and rooms are made up.
const FOUND = [
  { name: "Kitchen speaker", detail: "Oakline One · 2 m away" },
  { name: "Living room", detail: "Oakline Duo · 6 m away" },
]

export default function DevicePairing() {
  const [found, setFound] = React.useState(0)
  const [connected, setConnected] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (found >= FOUND.length) return
    const timer = setTimeout(() => setFound((n) => n + 1), 1500)
    return () => clearTimeout(timer)
  }, [found])

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Add a speaker</h1>
      <p className="mt-1 text-sm text-muted-foreground">Plug it in and keep your phone close. This takes a few seconds.</p>
      <div className="relative mt-6 flex h-72 items-center justify-center overflow-hidden rounded-2xl border bg-muted/30">
        <RippleBackground rings={5} size={110} step={70} />
        <span className="relative grid size-16 place-items-center rounded-full border bg-background shadow-sm">
          <Speaker aria-hidden="true" className="size-7" />
        </span>
      </div>
      <p role="status" className="mt-4 text-sm text-muted-foreground">
        {found < FOUND.length ? "Looking for speakers nearby…" : `Found ${FOUND.length} speakers`}
      </p>
      <ul className="mt-3 space-y-2">
        {FOUND.slice(0, found).map((device) => (
          <li key={device.name} className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <span>
              <span className="block font-medium">{device.name}</span>
              <span className="block text-sm text-muted-foreground">{device.detail}</span>
            </span>
            {connected === device.name ? (
              <span className="flex items-center gap-1.5 text-sm">
                <Check aria-hidden="true" className="size-4" />
                Connected
              </span>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setConnected(device.name)}>
                Connect
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
