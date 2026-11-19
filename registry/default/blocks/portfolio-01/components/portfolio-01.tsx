"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

// Photos: Unsplash (free under the Unsplash License). The studio and clients are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&h=700&fit=crop&auto=format&q=75`

const projects = [
  { title: "Meridian Tower", type: "Architecture", year: "2026", image: photo("1486406146926-c627a92ad1ab"), alt: "Dark glass towers seen from street level", wide: true },
  { title: "Tidal", type: "Identity", year: "2026", image: photo("1618005182384-a83a8bd57fbe"), alt: "Flowing waves of purple and blue colour", wide: false },
  { title: "Harbour Museum", type: "Architecture", year: "2025", image: photo("1487958449943-2429e8be8625"), alt: "An angular white building with glass walls", wide: false },
  { title: "Ink & Current", type: "Art direction", year: "2025", image: photo("1541701494587-cb58502866ab"), alt: "Clouds of blue and orange ink in water", wide: true },
  { title: "Quiet Floors", type: "Interiors", year: "2025", image: photo("1497366216548-37526070297c"), alt: "A long, calm office corridor with glass doors", wide: true },
  { title: "Paperwhite", type: "Identity", year: "2024", image: photo("1558591710-4b4a1ae0f04d"), alt: "Soft white folds of curved paper", wide: false },
]

const filters = ["All", ...new Set(projects.map((project) => project.type))]

/** A studio portfolio: a filterable, editorial grid of projects. */
export function Portfolio01() {
  const [filter, setFilter] = React.useState("All")
  const shown = projects.filter((project) => filter === "All" || project.type === filter)

  return (
    <section aria-labelledby="portfolio-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="portfolio-01-title" className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Selected work, 2024 to now
          </h2>
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
                className="rounded-sm py-1 text-muted-foreground underline-offset-4 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:text-foreground aria-pressed:underline"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-10 grid gap-x-5 gap-y-9 sm:grid-cols-6">
          {shown.map((project) => (
            <li key={project.title} className={cn("sm:col-span-3", filter === "All" && (project.wide ? "lg:col-span-4" : "lg:col-span-2"))}>
              <a href="#" className="group block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                <span className="block overflow-hidden rounded-lg bg-muted">
                  <img src={project.image} alt={project.alt} loading="lazy" className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none lg:h-80" />
                </span>
                <span className="mt-3 flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-medium">{project.title}</span>
                    <span className="block text-sm text-muted-foreground">
                      {project.type}, {project.year}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
