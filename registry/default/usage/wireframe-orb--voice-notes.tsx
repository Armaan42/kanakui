"use client"

import * as React from "react"
import { Mic, Square } from "lucide-react"

import { Button } from "@/components/ui/button"
import { WireframeOrb } from "@/registry/default/ui/wireframe-orb"

export const meta = {
  title: "Voice notes recorder",
  description: "The wireframe orb as the listening indicator of a voice-notes app, with the live transcript underneath.",
}

// The app and transcript are made up.
const TRANSCRIPT = "Remind the team the venue walkthrough moved to Thursday at ten. Ask Lena for the floor plan, and check catering numbers with Tomás before Friday."

export default function VoiceNotes() {
  const [recording, setRecording] = React.useState(true)
  const [words, setWords] = React.useState(8)
  const all = TRANSCRIPT.split(" ")

  React.useEffect(() => {
    if (!recording || words >= all.length) return
    const timer = setTimeout(() => setWords((w) => w + 1), 350)
    return () => clearTimeout(timer)
  }, [recording, words, all.length])

  return (
    <div className="dark mx-auto flex min-h-svh max-w-md flex-col items-center bg-background px-6 py-10 text-center text-foreground">
      <p className="text-sm text-muted-foreground">Paperkite Notes</p>
      <h1 className="mt-1 text-xl font-semibold">{recording ? "Listening…" : "Saved to Inbox"}</h1>
      <WireframeOrb className="mt-4 size-60" label={recording ? "Recording" : "Stopped"} />
      <p aria-live="polite" className="mt-4 min-h-24 text-left text-lg leading-7">
        {all.slice(0, words).join(" ")}
        {recording ? <span className="ml-1 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-foreground motion-reduce:animate-none" /> : null}
      </p>
      <Button
        size="lg"
        className="mt-auto rounded-full"
        variant={recording ? "default" : "outline"}
        onClick={() => {
          if (!recording) setWords(0)
          setRecording(!recording)
        }}
      >
        {recording ? <Square aria-hidden="true" /> : <Mic aria-hidden="true" />}
        {recording ? "Stop and save" : "New note"}
      </Button>
    </div>
  )
}
