import { Metronome } from "@/registry/default/ui/metronome"

export const meta = {
  title: "Practice log",
  description: "The metronome in a music student's practice app, set to today's tempo for each exercise.",
}

// The student, teacher and exercises are made up.
const EXERCISES = [
  { name: "C major scale, two octaves", tempo: "72 bpm", done: true },
  { name: "Arpeggios in G", tempo: "80 bpm", done: true },
  { name: "Minuet in G, bars 1–16", tempo: "88 bpm", done: false },
]

export default function PracticeLog() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <Metronome className="mx-auto" defaultTempo={88} defaultBeats={3} sound={false} />
      <div>
        <p className="text-sm text-muted-foreground">Leo&apos;s piano practice · Tuesday</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">25 minutes today</h1>
        <p className="mt-2 text-muted-foreground">From Ms Varga: keep the minuet steady at 88 in three. Only speed up when it&apos;s clean twice in a row.</p>
        <ul className="mt-6 divide-y border-y text-sm">
          {EXERCISES.map((exercise) => (
            <li key={exercise.name} className="flex items-center justify-between gap-4 py-3">
              <span className={exercise.done ? "text-muted-foreground line-through" : "font-medium"}>{exercise.name}</span>
              <span className="shrink-0 text-muted-foreground tabular-nums">{exercise.tempo}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
