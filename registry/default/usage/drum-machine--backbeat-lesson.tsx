import { DrumMachine } from "@/registry/default/ui/drum-machine"

export const meta = {
  title: "Drum lesson: the backbeat",
  description: "The drum machine in an online music lesson, loaded with the basic rock beat for students to play and change.",
}

// The course is made up.
export default function BackbeatLesson() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Copperleaf Music · Rhythm for beginners · Lesson 3</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">The backbeat</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Almost every pop song sits on this: kick on beats 1 and 3, snare on 2 and 4, and the hi-hat keeping time in between. Press Play, then
        try moving the second kick one step later.
      </p>
      <DrumMachine
        className="mt-8"
        defaultTempo={92}
        defaultPattern={["x.......x.......", "....x.......x...", "x.x.x.x.x.x.x.x.", "................"]}
      />
      <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <p className="font-medium">Try this</p>
          <p className="mt-1 text-muted-foreground">Add a clap on beat 4 only. It makes the end of each bar land harder.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="font-medium">Next lesson</p>
          <p className="mt-1 text-muted-foreground">Ghost notes: quiet snare hits that give a beat its swing.</p>
        </div>
      </div>
    </div>
  )
}
