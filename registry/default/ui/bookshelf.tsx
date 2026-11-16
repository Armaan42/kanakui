"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ShelfBook {
  id: string
  title: string
  author: string
  /** Cover and spine color: any CSS color. */
  color: string
  /** Text color on the spine and cover. */
  ink?: string
  /** Height relative to the tallest book, 0.7–1. */
  height?: number
  /** Spine thickness in px. */
  thickness?: number
}

interface BookshelfProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  books: ShelfBook[]
  /** Id of the selected book (pulled out of the shelf). */
  selected?: string
  onSelect?: (book: ShelfBook) => void
  /** Accessible name for the shelf, e.g. "Staff picks". */
  label?: string
}

/** The front cover of a book, for showing the one picked from the shelf. */
function BookCover({ book, className }: { book: ShelfBook; className?: string }) {
  return (
    <div
      className={cn("@container relative aspect-[2/3] w-full overflow-hidden rounded-r-md rounded-l-sm p-[12%] shadow-[0_20px_30px_-12px_rgb(0_0_0/0.45)]", className)}
      style={{ background: book.color, color: book.ink ?? "#fff" }}
    >
      {/* Spine fold and cloth texture */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[7%] bg-linear-to-r from-black/30 via-black/5 to-white/10" />
      <span aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(255_255_255/0.04)_0_1px,transparent_1px_3px)]" />
      <div className="relative flex h-full flex-col">
        <span aria-hidden="true" className="h-px w-1/3 bg-current opacity-60" />
        <p className="mt-[10%] font-serif text-[clamp(1.1rem,9cqw,1.9rem)] leading-tight text-balance">{book.title}</p>
        <p className="mt-auto text-[clamp(0.65rem,4.5cqw,0.85rem)] tracking-[0.2em] uppercase opacity-80">{book.author}</p>
      </div>
    </div>
  )
}

/**
 * Books standing on a wooden shelf. Hovering or focusing a spine lifts it;
 * selecting one (click, Enter or Space) pulls it out and calls `onSelect`.
 * Each spine is a button with `aria-pressed`, named by title and author.
 */
function Bookshelf({ books, selected, onSelect, label = "Bookshelf", className, ...props }: BookshelfProps) {
  return (
    <div data-slot="bookshelf" role="group" aria-label={label} className={cn("w-fit max-w-full", className)} {...props}>
      <div className="flex h-72 items-end gap-[3px] overflow-x-auto px-8 pt-10">
        {books.map((book) => {
          const isSelected = book.id === selected
          return (
            <button
              key={book.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${book.title} by ${book.author}`}
              onClick={() => onSelect?.(book)}
              className={cn(
                "group/book relative flex shrink-0 flex-col items-center justify-between overflow-hidden rounded-t-[3px] py-3 outline-none",
                "shadow-[inset_-3px_0_6px_rgb(0_0_0/0.25),inset_3px_0_4px_rgb(255_255_255/0.12)] transition-transform duration-300 ease-out motion-reduce:transition-none",
                "hover:-translate-y-3 focus-visible:-translate-y-3 focus-visible:ring-3 focus-visible:ring-ring/60",
                isSelected && "-translate-y-8 hover:-translate-y-8 focus-visible:-translate-y-8"
              )}
              style={{
                width: book.thickness ?? 36,
                height: `${(book.height ?? 1) * 100}%`,
                background: book.color,
                color: book.ink ?? "#fff",
              }}
            >
              <span aria-hidden="true" className="h-[3px] w-full bg-current opacity-40" />
              <span className="min-h-0 flex-1 overflow-hidden py-2 font-serif text-[13px] leading-none text-ellipsis whitespace-nowrap [writing-mode:vertical-rl]">
                {book.title}
              </span>
              <span className="mt-2 text-[8px] tracking-wider uppercase opacity-75 [writing-mode:vertical-rl]">{book.author.split(" ").pop()}</span>
              <span aria-hidden="true" className="mt-1 h-[3px] w-full bg-current opacity-40" />
            </button>
          )
        })}
      </div>
      {/* Shelf plank */}
      <div aria-hidden="true" className="relative h-5 rounded-sm bg-linear-to-b from-amber-700 via-amber-800 to-amber-950 shadow-[0_14px_20px_-10px_rgb(0_0_0/0.55)]">
        <span className="absolute inset-x-0 top-0 h-px bg-amber-500/60" />
        <span className="absolute inset-x-0 top-1.5 h-px bg-[repeating-linear-gradient(90deg,rgb(0_0_0/0.18)_0_40px,transparent_40px_90px)]" />
      </div>
    </div>
  )
}

export { Bookshelf, BookCover }
