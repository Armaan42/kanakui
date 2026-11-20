"use client"

import * as React from "react"
import { Check, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Envelope } from "@/registry/default/ui/envelope"

// Sample photos. Swap in your own. The couple and venue are made up.
const VENUE = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000&h=560&fit=crop&auto=format&q=75"

const schedule = [
  { time: "16:00", title: "Ceremony", place: "On the jetty" },
  { time: "17:30", title: "Drinks & lawn games", place: "Boathouse garden" },
  { time: "19:00", title: "Dinner", place: "The long table" },
  { time: "21:00", title: "Dancing", place: "Until late" },
]

/** A wedding or event invitation: the envelope, the day's details and an RSVP form. */
export function Invitation01() {
  const [attending, setAttending] = React.useState<"yes" | "no">("yes")
  const [sent, setSent] = React.useState<string | null>(null)
  const id = React.useId()

  return (
    <section aria-labelledby={`${id}-title`} className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-sm tracking-[0.25em] text-rose-700 uppercase dark:text-rose-300">Save the date</p>
          <h2 id={`${id}-title`} className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            Maya &amp; Theo
          </h2>
          <p className="mt-3 text-muted-foreground">Saturday 12 September 2026 · The Old Boathouse, Lake Linden</p>
        </div>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-2">
          <div className="flex justify-center lg:pt-8">
            <Envelope defaultOpen label="Invitation from Maya and Theo" to="For you" className="w-[min(24rem,calc(100vw-3rem))]">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-rose-700 uppercase">You’re invited</p>
              <p className="mt-2 font-serif text-xl leading-tight">Come celebrate with us by the lake</p>
              <p className="mt-2 text-xs leading-5 text-neutral-600">
                Ceremony at 4 pm, then dinner and dancing until late. Dress code: garden party.
              </p>
            </Envelope>
          </div>

          <div className="space-y-8">
            <figure className="overflow-hidden rounded-2xl border bg-card">
              <img src={VENUE} alt="Rowing boats on a turquoise lake below mountains" className="aspect-[16/9] w-full object-cover" />
              <figcaption className="flex items-start gap-2 p-4 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                The Old Boathouse, Lake Linden. Free parking on site; a shuttle runs from the station from 14:30.
              </figcaption>
            </figure>

            <ol className="grid gap-3 sm:grid-cols-2">
              {schedule.map((item) => (
                <li key={item.title} className="rounded-xl border bg-card p-4">
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">{item.time}</p>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.place}</p>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-serif text-2xl">RSVP</h3>
              {sent ? (
                <p role="status" className="mt-4 flex items-start gap-3 text-sm">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Check aria-hidden="true" className="size-4" />
                  </span>
                  {attending === "yes"
                    ? `Thank you, ${sent}! We can’t wait to celebrate with you. Details are on their way to your inbox.`
                    : `Thank you for letting us know, ${sent}. You’ll be missed!`}
                </p>
              ) : (
                <form
                  className="mt-4 grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault()
                    const name = new FormData(event.currentTarget).get("name")
                    setSent(String(name).split(" ")[0] || "friend")
                  }}
                >
                  <p className="-mt-2 text-sm text-muted-foreground">Kindly reply by 1 August.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-sm font-medium">
                      Full name
                      <Input name="name" required autoComplete="name" />
                    </label>
                    <label className="grid gap-1.5 text-sm font-medium">
                      Email
                      <Input name="email" type="email" required autoComplete="email" />
                    </label>
                  </div>
                  <fieldset className="grid gap-2">
                    <legend className="text-sm font-medium">Will you be there?</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {(
                        [
                          ["yes", "Joyfully accepts"],
                          ["no", "Regretfully declines"],
                        ] as const
                      ).map(([value, text]) => (
                        <label
                          key={value}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm has-checked:border-foreground/40 has-checked:bg-muted has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
                        >
                          <input type="radio" name="attending" value={value} checked={attending === value} onChange={() => setAttending(value)} className="accent-foreground" />
                          {text}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {attending === "yes" ? (
                    <div className="grid gap-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
                      <label className="grid gap-1.5 text-sm font-medium">
                        Guests
                        <select
                          name="guests"
                          defaultValue="1"
                          className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                        >
                          {[1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium">
                        Dietary needs <span className="sr-only">(optional)</span>
                        <Input name="diet" placeholder="Optional, e.g. vegetarian" />
                      </label>
                    </div>
                  ) : null}
                  <Button type="submit" className="justify-self-start">
                    Send RSVP
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
