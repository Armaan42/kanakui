import { Check } from "lucide-react"

import { KitchenTimer } from "@/registry/default/ui/kitchen-timer"

export const meta = {
  title: "Recipe cooking mode",
  description: "The kitchen timer beside one step of a recipe's cooking mode, preset to that step's time.",
}

// The recipe is made up.
const STEPS = [
  { text: "Peel the squash and cut it into 3 cm cubes.", done: true },
  { text: "Toss with olive oil, salt and chilli flakes.", done: true },
  { text: "Roast at 200° until the edges catch, about 25 minutes.", current: true },
  { text: "Blend with the stock until smooth, then season." },
]

export default function RecipeStep() {
  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-12 md:grid-cols-[1fr_auto]">
      <div>
        <p className="text-sm text-muted-foreground">Roast squash soup · step 3 of 4</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Roast until the edges catch</h1>
        <ol className="mt-6 space-y-3 text-sm">
          {STEPS.map((step, i) => (
            <li key={i} className={step.current ? "flex gap-3 rounded-lg border bg-card p-3 font-medium" : "flex gap-3 px-3"}>
              <span className="grid size-5 shrink-0 place-items-center rounded-full border text-xs">
                {step.done ? <Check aria-label="Done" className="size-3" /> : i + 1}
              </span>
              <span className={step.done ? "text-muted-foreground line-through" : undefined}>{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
      <KitchenTimer defaultMinutes={25} className="mx-auto" />
    </div>
  )
}
