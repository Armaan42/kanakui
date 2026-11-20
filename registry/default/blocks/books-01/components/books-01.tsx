"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BookCover, Bookshelf, type ShelfBook } from "@/registry/default/ui/bookshelf"

// Sample photos. Swap in your own. The books, authors and reviewers are made up.
const face = (id: string) => `https://images.unsplash.com/photo-${id}?w=80&h=80&fit=crop&crop=faces&auto=format&q=80`

type Book = ShelfBook & { price: number; rating: number; blurb: string; review: { name: string; photo: string; text: string } }

const BOOKS: Book[] = [
  { id: "1", title: "The Lighthouse Year", author: "Ana Okafor", color: "#1f3a5f", ink: "#f5e9d3", height: 0.94, thickness: 40, price: 18, rating: 4.6, blurb: "A keeper’s daughter spends one year alone on a northern island, and learns to read the sea, the gulls and herself.", review: { name: "Sofie L.", photo: "1438761681033-6461ffad8d80", text: "Quiet, salty and completely absorbing." } },
  { id: "2", title: "Salt & Cedar", author: "Jonah Reyes", color: "#7a2e2a", ink: "#f8e4c8", height: 0.86, thickness: 34, price: 16, rating: 4.3, blurb: "Two brothers inherit a failing smokehouse on the coast and one summer to save it.", review: { name: "Marcus R.", photo: "1507003211169-0a1dd7228f2d", text: "Made me hungry and homesick in equal measure." } },
  { id: "3", title: "A Field Guide to Quiet", author: "Mei Tanaka", color: "#2f5d50", ink: "#e8f0e2", height: 1, thickness: 46, price: 22, rating: 4.8, blurb: "Short essays on finding stillness in loud cities: train platforms, laundromats, the minute before rain.", review: { name: "Priya N.", photo: "1494790108377-be9c29b29330", text: "I read one essay every morning. My favourite book this year." } },
  { id: "4", title: "Midnight Ferry", author: "Lars Holm", color: "#2b2b3a", ink: "#e9d8a6", height: 0.82, thickness: 30, price: 14, rating: 4.1, blurb: "A detective, a missing violinist and the last crossing of the night.", review: { name: "Tomás A.", photo: "1506794778202-cad84cf45f1d", text: "Twisty and atmospheric. Read it in one sitting." } },
  { id: "5", title: "The Orchard Letters", author: "Priya Shah", color: "#c58b3c", ink: "#2a1d0e", height: 0.9, thickness: 38, price: 19, rating: 4.7, blurb: "Fifty years of letters between two friends, written from an apple orchard and a city flat.", review: { name: "Amara O.", photo: "1580489944761-15a19d654956", text: "I cried twice and called my oldest friend." } },
  { id: "6", title: "Northern Static", author: "Elin Berg", color: "#4a4e8c", ink: "#eef0ff", height: 0.97, thickness: 42, price: 17, rating: 4.4, blurb: "A radio host in the far north picks up a broadcast from a station that closed in 1962.", review: { name: "David B.", photo: "1472099645785-5658abf4ff4e", text: "Eerie in the best way." } },
  { id: "7", title: "Paper Boats", author: "Sam Idris", color: "#d9cfc1", ink: "#3a2f25", height: 0.78, thickness: 32, price: 12, rating: 4.5, blurb: "A picture book about a girl who sends a paper boat down the river and gets a letter back.", review: { name: "Elena M.", photo: "1573496359142-b8d87734a5a2", text: "My kids ask for it every night." } },
]

/** A bookstore section: a shelf of staff picks and the selected book's details and review. */
export function Books01() {
  const [selected, setSelected] = React.useState(BOOKS[2])

  return (
    <section aria-labelledby="books-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="books-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Staff picks
        </h2>
        <p className="mt-2 text-muted-foreground">Pull a book off the shelf to read about it.</p>

        <Bookshelf className="mx-auto mt-6"label="Staff picks" books={BOOKS} selected={selected.id} onSelect={(b) => setSelected(b as Book)} />

        <article aria-live="polite" className="mt-12 grid items-start gap-8 rounded-3xl border bg-card p-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:p-8">
          <BookCover book={selected} className="mx-auto w-40" />
          <div>
            <h3 className="font-serif text-2xl">{selected.title}</h3>
            <p className="text-muted-foreground">{selected.author}</p>
            <p className="mt-2 flex items-center gap-1 text-sm">
              <span className="flex text-amber-500" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={i < Math.round(selected.rating) ? "size-4 fill-current" : "size-4"} />
                ))}
              </span>
              <span className="ml-1 font-medium">{selected.rating}</span>
              <span className="sr-only">out of 5</span>
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">{selected.blurb}</p>
            <figure className="mt-5 flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
              <img src={face(selected.review.photo)} alt="" className="size-9 rounded-full object-cover" />
              <div className="text-sm">
                <blockquote>“{selected.review.text}”</blockquote>
                <figcaption className="mt-1 text-muted-foreground">{selected.review.name}</figcaption>
              </div>
            </figure>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-semibold tabular-nums">${selected.price}</span>
              <Button>Add to basket</Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
