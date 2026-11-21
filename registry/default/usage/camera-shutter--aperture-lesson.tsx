"use client"

import * as React from "react"

import { CameraShutter } from "@/registry/default/ui/camera-shutter"

export const meta = {
  title: "Photography course: aperture",
  description: "The camera shutter in an online photography lesson: change the f-stop and the lesson explains what it does to your photo.",
}

// The course is made up.
const STOPS = [1.8, 2.8, 4, 5.6, 8, 11, 16]

function explain(stop: number) {
  if (stop <= 2.8) return "Wide open. Lots of light and a shallow focus: a sharp face against a soft, blurred background. Good for portraits."
  if (stop <= 5.6) return "The middle ground. Enough depth for a small group or a plate of food, still with a gentle background blur."
  return "Stopped down. Less light, but nearly everything is sharp from front to back. Good for landscapes and street scenes."
}

export default function ApertureLesson() {
  const [stop, setStop] = React.useState(2.8)
  const [shots, setShots] = React.useState(0)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <CameraShutter
        className="mx-auto"
        stops={STOPS}
        defaultStop={2.8}
        lensLabel="50mm 1:1.8"
        onStopChange={setStop}
        onCapture={(shot) => setShots(shot.count)}
      />
      <div>
        <p className="text-sm text-muted-foreground">Halcyon Photo School · Lesson 4 of 12</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">What aperture does</h1>
        <p className="mt-2 text-muted-foreground">Turn the lens ring and watch the blades. A smaller f-number means a wider opening.</p>
        <div role="status" className="mt-6 rounded-xl border bg-card p-5">
          <p className="font-semibold tabular-nums">f/{stop}</p>
          <p className="mt-1 text-sm text-muted-foreground">{explain(stop)}</p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{shots === 0 ? "Press the shutter to take a practice shot." : `${shots} practice ${shots === 1 ? "shot" : "shots"} taken.`}</p>
      </div>
    </div>
  )
}
