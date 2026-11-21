import { Microscope } from "@/registry/default/ui/microscope"

export const meta = {
  title: "Virtual biology lab",
  description: "The microscope in a school's virtual biology lab, with the worksheet questions beside the eyepiece view.",
}

// The school and worksheet are made up.
const QUESTIONS = [
  "Focus on the onion skin. What shape are the cells?",
  "Switch to the highest objective. Can you see a dark dot in each cell? What is it?",
  "Now try the pond water. Find one thing that moves on its own.",
]

export default function BiologyLab() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-start gap-10 px-6 py-12 lg:grid-cols-[auto_minmax(0,1fr)]">
      <Microscope className="mx-auto" defaultSpecimen="onion" />
      <div>
        <p className="text-sm text-muted-foreground">Ridgeway School · Biology · Lab 2</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Looking at cells</h1>
        <p className="mt-2 text-muted-foreground">Start on the lowest objective and focus slowly. Move the slide by dragging the view.</p>
        <ol className="mt-6 space-y-4">
          {QUESTIONS.map((question, i) => (
            <li key={question} className="flex gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-full border text-xs tabular-nums">{i + 1}</span>
              <span className="pt-0.5">{question}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
