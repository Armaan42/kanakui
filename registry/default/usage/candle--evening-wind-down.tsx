import { Candle } from "@/registry/default/ui/candle"

export const meta = {
  title: "Evening wind-down",
  description: "The candle in a sleep app's wind-down routine: it burns for ten minutes while you work through the steps.",
}

// The app and routine are made up.
const STEPS = ["Put your phone on the other side of the room", "Write down one thing for tomorrow", "Three slow breaths, longer out than in", "Lights off when the candle is out"]

export default function EveningWindDown() {
  return (
    <div className="dark min-h-[34rem] bg-background text-foreground">
      <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
        <Candle burnMinutes={10} className="mx-auto" />
        <div>
          <p className="text-sm text-muted-foreground">Halcyon Sleep · Tonight</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Ten minutes to wind down</h1>
          <p className="mt-2 text-muted-foreground">The candle burns down as you go. Blow it out when you&apos;re ready for bed.</p>
          <ol className="mt-6 space-y-3">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border text-xs tabular-nums">{i + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
