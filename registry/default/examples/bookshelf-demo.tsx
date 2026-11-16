"use client"

import * as React from "react"

import { BookCover, Bookshelf, type ShelfBook } from "@/registry/default/ui/bookshelf"

// The books and authors are made up.
const BOOKS: ShelfBook[] = [
  { id: "1", title: "The Lighthouse Year", author: "Ana Okafor", color: "#1f3a5f", ink: "#f5e9d3", height: 0.94, thickness: 40 },
  { id: "2", title: "Salt & Cedar", author: "Jonah Reyes", color: "#7a2e2a", ink: "#f8e4c8", height: 0.86, thickness: 34 },
  { id: "3", title: "A Field Guide to Quiet", author: "Mei Tanaka", color: "#2f5d50", ink: "#e8f0e2", height: 1, thickness: 46 },
  { id: "4", title: "Midnight Ferry", author: "Lars Holm", color: "#2b2b3a", ink: "#e9d8a6", height: 0.82, thickness: 30 },
  { id: "5", title: "The Orchard Letters", author: "Priya Shah", color: "#c58b3c", ink: "#2a1d0e", height: 0.9, thickness: 38 },
  { id: "6", title: "Northern Static", author: "Elin Berg", color: "#4a4e8c", ink: "#eef0ff", height: 0.97, thickness: 42 },
  { id: "7", title: "Paper Boats", author: "Sam Idris", color: "#d9cfc1", ink: "#3a2f25", height: 0.78, thickness: 32 },
  { id: "8", title: "What the River Knows", author: "Tomás Vidal", color: "#375e7a", ink: "#f2efe6", height: 0.92, thickness: 44 },
]

export default function BookshelfDemo() {
  const [selected, setSelected] = React.useState(BOOKS[2])

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-10 sm:flex-row sm:items-end sm:justify-center">
      <Bookshelf label="Staff picks" books={BOOKS} selected={selected.id} onSelect={setSelected} />
      <div className="w-40 shrink-0">
        <BookCover book={selected} />
        <p className="mt-3 text-center text-sm font-medium">{selected.title}</p>
        <p className="text-center text-xs text-muted-foreground">{selected.author}</p>
      </div>
    </div>
  )
}
