"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { BookCover, Bookshelf, type ShelfBook } from "@/registry/default/ui/bookshelf"

export const meta = {
  title: "Book club picks",
  description: "The bookshelf in a book club app: pull a book off the shelf to see when the group meets to talk about it.",
}

// The club, books and authors are made up.
const BOOKS: (ShelfBook & { month: string; pages: number })[] = [
  { id: "jan", title: "The Lighthouse Year", author: "Ana Okafor", color: "#1f3a5f", ink: "#f5e9d3", height: 0.94, thickness: 40, month: "January", pages: 312 },
  { id: "feb", title: "Salt & Cedar", author: "Jonah Reyes", color: "#7a2e2a", ink: "#f8e4c8", height: 0.86, thickness: 34, month: "February", pages: 248 },
  { id: "mar", title: "A Field Guide to Quiet", author: "Mei Tanaka", color: "#2f5d50", ink: "#e8f0e2", height: 1, thickness: 46, month: "March", pages: 384 },
  { id: "apr", title: "Midnight Ferry", author: "Lars Holm", color: "#2b2b3a", ink: "#e9d8a6", height: 0.82, thickness: 30, month: "April", pages: 220 },
  { id: "may", title: "The Orchard Letters", author: "Priya Shah", color: "#c58b3c", ink: "#2a1d0e", height: 0.9, thickness: 38, month: "May", pages: 296 },
]

export default function BookClub() {
  const [selected, setSelected] = React.useState(BOOKS[2])

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Paperkite Book Club · 2027</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">What we&apos;re reading</h1>
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-end gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
        <Bookshelf
          label="Book club picks for 2027"
          books={BOOKS}
          selected={selected.id}
          onSelect={(book) => setSelected(BOOKS.find((b) => b.id === book.id) ?? BOOKS[0])}
        />
        <div className="flex gap-5">
          <BookCover book={selected} className="w-32 shrink-0" />
          <div className="w-48">
            <p className="text-sm text-muted-foreground">{selected.month}</p>
            <p className="mt-1 font-semibold">{selected.title}</p>
            <p className="text-sm text-muted-foreground">
              {selected.author} · {selected.pages} pages
            </p>
            <p className="mt-3 text-sm">We meet on the last Thursday, 7pm, upstairs at Kiln Corner Café.</p>
            <Button size="sm" variant="outline" className="mt-4">
              I&apos;m coming
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
