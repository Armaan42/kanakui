"use client"

import * as React from "react"
import { Bookmark, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardFile, type FileCard } from "@/registry/default/ui/card-file"

// Sample photos. Swap in your own. The show and guests are made up.
const COVER = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=640&h=640&fit=crop&auto=format&q=80"

const episodes = [
  { number: 42, title: "The last lighthouse keeper", date: "Nov 12", length: "48 min", notes: "After forty years on the rock, Elias Brandt talks about solitude, storms and the day the lamp went automatic." },
  { number: 41, title: "Bread before sunrise", date: "Nov 5", length: "36 min", notes: "Why a village baker still starts at 3 am, and what a sourdough culture passed down since 1952 tastes like." },
  { number: 40, title: "Mapping the deep", date: "Oct 29", length: "54 min", notes: "Oceanographer Lena Okafor explains how little of the sea floor we have seen, and how that is changing." },
  { number: 39, title: "A piano in the desert", date: "Oct 22", length: "41 min", notes: "One tuner, one truck and four hundred kilometres of dirt road to keep a town's only piano in key." },
]

const guests: FileCard[] = [
  { name: "Amara Diallo", role: "Radio producer", note: "Episode 37" },
  { name: "Elias Brandt", role: "Lighthouse keeper", note: "Episode 42" },
  { name: "Hugo Martin", role: "Master baker", note: "Episode 41" },
  { name: "Lena Okafor", role: "Oceanographer", note: "Episode 40" },
  { name: "Noor Rahman", role: "Piano tuner", note: "Episode 39" },
  { name: "Sofia Lindgren", role: "Glacier guide", note: "Episode 38" },
]

/** A podcast page: show details, expandable episodes to save, and the guest file. */
export function Podcast01() {
  const [open, setOpen] = React.useState(42)
  const [saved, setSaved] = React.useState<number[]>([])

  return (
    <section aria-labelledby="podcast-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
        <div className="min-w-0">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <img src={COVER} alt="A studio microphone in a dark room" className="size-36 shrink-0 rounded-xl bg-muted object-cover" />
            <div>
              <p className="text-sm text-muted-foreground">A weekly podcast</p>
              <h2 id="podcast-01-title" className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                The Long Way Round
              </h2>
              <p className="mt-2 leading-7 text-muted-foreground">Unhurried conversations with people who do one thing, far from anywhere.</p>
              <Button asChild className="mt-4">
                <a href="#">Follow the show</a>
              </Button>
            </div>
          </div>

          <ul className="mt-10 border-t">
            {episodes.map((episode) => {
              const expanded = open === episode.number
              const isSaved = saved.includes(episode.number)
              return (
                <li key={episode.number} className="border-b">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`podcast-01-${episode.number}`}
                      onClick={() => setOpen(expanded ? 0 : episode.number)}
                      className="flex min-w-0 flex-1 items-center gap-3 rounded-md py-4 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">{episode.number}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{episode.title}</span>
                        <span className="block text-sm text-muted-foreground">
                          {episode.date} · {episode.length}
                        </span>
                      </span>
                      <ChevronDown aria-hidden="true" className={cn("size-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none", expanded && "rotate-180")} />
                    </button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-pressed={isSaved}
                      aria-label={`Save ${episode.title}`}
                      onClick={() => setSaved(isSaved ? saved.filter((n) => n !== episode.number) : [...saved, episode.number])}
                    >
                      <Bookmark aria-hidden="true" className={cn("size-4", isSaved && "fill-current")} />
                    </Button>
                  </div>
                  <p id={`podcast-01-${episode.number}`} hidden={!expanded} className="pr-10 pb-4 pl-7 text-sm leading-6 text-muted-foreground">
                    {episode.notes}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
        <aside aria-labelledby="podcast-01-guests">
          <h3 id="podcast-01-guests" className="mb-4 font-medium">
            Guest file
          </h3>
          <CardFile cards={guests} defaultIndex={1} />
        </aside>
      </div>
    </section>
  )
}
