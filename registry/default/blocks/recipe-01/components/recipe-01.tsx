"use client"

import * as React from "react"
import { Clock, Flame, Minus, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Photo: Unsplash (free under the Unsplash License).
const PHOTO = "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=1000&h=1000&fit=crop&auto=format&q=80"
const BASE_SERVINGS = 4

const ingredients = [
  { amount: 1.2, unit: "kg", name: "butternut squash, cubed" },
  { amount: 2, unit: "tbsp", name: "olive oil" },
  { amount: 1, unit: "", name: "large onion, sliced" },
  { amount: 3, unit: "cloves", name: "garlic" },
  { amount: 1, unit: "litre", name: "vegetable stock" },
  { amount: 60, unit: "g", name: "butter" },
  { amount: 4, unit: "tbsp", name: "sour cream, to serve" },
  { amount: 3, unit: "tbsp", name: "pumpkin seeds, toasted" },
]
const steps = [
  { title: "Roast", text: "Toss the squash with the oil and salt. Roast at 200°C for 35 minutes, until the edges catch." },
  { title: "Soften", text: "Cook the onion in half the butter over a low heat for 10 minutes. Add the garlic for the last minute." },
  { title: "Simmer", text: "Add the squash and stock. Simmer for 10 minutes, then blend until completely smooth." },
  { title: "Finish", text: "Brown the remaining butter until it smells nutty. Serve the soup with sour cream, seeds and the butter." },
]
const facts = [
  { icon: Clock, text: "55 min" },
  { icon: Flame, text: "Easy" },
]

function formatAmount(value: number) {
  if (value >= 10) return String(Math.round(value))
  const rounded = Math.round(value * 4) / 4
  const whole = Math.floor(rounded)
  const fraction = { 0.25: "¼", 0.5: "½", 0.75: "¾" }[rounded - whole] ?? ""
  return `${whole || (fraction ? "" : "0")}${fraction}`
}

/** A recipe page: servings that rescale the ingredients, with tick-off lists for cooking. */
export function Recipe01() {
  const [servings, setServings] = React.useState(BASE_SERVINGS)
  const [got, setGot] = React.useState<string[]>([])
  const [done, setDone] = React.useState<string[]>([])
  const toggle = (list: string[], item: string) => (list.includes(item) ? list.filter((value) => value !== item) : [...list, item])

  return (
    <section aria-labelledby="recipe-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm text-muted-foreground">Autumn suppers</p>
            <h2 id="recipe-01-title" className="mt-2 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Roast squash soup with brown butter
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-8 text-muted-foreground">Sweet from the oven, nutty from the pan, and better the next day.</p>
            <ul className="mt-5 flex gap-5 text-sm text-muted-foreground">
              {facts.map((fact) => (
                <li key={fact.text} className="flex items-center gap-1.5">
                  <fact.icon aria-hidden="true" className="size-4" />
                  {fact.text}
                </li>
              ))}
            </ul>
          </div>
          <img src={PHOTO} alt="A bowl of orange soup topped with sour cream and seeds" className="aspect-[4/3] w-full rounded-2xl bg-muted object-cover" />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">Ingredients</h3>
              <div role="group" aria-label="Servings" className="flex items-center gap-1">
                <Button type="button" variant="outline" size="icon-sm" aria-label="Fewer servings" disabled={servings === 1} onClick={() => setServings(servings - 1)}>
                  <Minus aria-hidden="true" className="size-3.5" />
                </Button>
                <output aria-live="polite" className="flex w-12 items-center justify-center gap-1 text-sm tabular-nums">
                  <Users aria-hidden="true" className="size-3.5 text-muted-foreground" />
                  <span className="sr-only">Servings: </span>
                  {servings}
                </output>
                <Button type="button" variant="outline" size="icon-sm" aria-label="More servings" disabled={servings === 12} onClick={() => setServings(servings + 1)}>
                  <Plus aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            </div>
            <ul className="mt-4 divide-y border-y">
              {ingredients.map((item) => {
                const checked = got.includes(item.name)
                return (
                  <li key={item.name}>
                    <label className="flex cursor-pointer items-baseline gap-3 py-2.5 text-sm">
                      <input type="checkbox" checked={checked} onChange={() => setGot(toggle(got, item.name))} className="size-4 translate-y-0.5 accent-primary" />
                      <span className={cn(checked && "text-muted-foreground line-through")}>
                        <span className="font-medium tabular-nums">
                          {formatAmount((item.amount * servings) / BASE_SERVINGS)}
                          {item.unit ? ` ${item.unit}` : ""}
                        </span>{" "}
                        {item.name}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold">Method</h3>
              <p aria-live="polite" className="font-mono text-xs text-muted-foreground tabular-nums">
                {done.length}/{steps.length} done
              </p>
            </div>
            <ol className="mt-4 space-y-3">
              {steps.map((step, i) => {
                const checked = done.includes(step.title)
                return (
                  <li key={step.title}>
                    <label className={cn("flex cursor-pointer gap-4 rounded-xl border p-4 transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50", checked && "bg-muted/60")}>
                      <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => setDone(toggle(done, step.title))} />
                      <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border font-mono text-xs peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                        {i + 1}
                      </span>
                      <span>
                        <span className={cn("block font-medium", checked && "text-muted-foreground line-through")}>{step.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-muted-foreground">{step.text}</span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
