"use client"

import * as React from "react"
import { Shuffle } from "lucide-react"

import { cn } from "@/lib/utils"

interface SlidingPuzzleProps extends React.ComponentProps<"div"> {
  /** Tiles per side: 3 for an easy puzzle, 4 for the classic fifteen. */
  size?: number
  /** A square image to cut into tiles. Leave it out for the painted default. */
  src?: string
  alt?: string
  onSolve?: (moves: number) => void
}

/** Slides tiles from random legal moves, so the puzzle can always be solved. */
function scramble(size: number, random: () => number, steps = 160) {
  const tiles = Array.from({ length: size * size }, (_, i) => (i + 1) % (size * size))
  let blank = tiles.length - 1
  let previous = -1
  for (let i = 0; i < steps; i++) {
    const row = Math.floor(blank / size)
    const col = blank % size
    const options = [blank - size, blank + size, col > 0 ? blank - 1 : -1, col < size - 1 ? blank + 1 : -1].filter(
      (spot) => spot >= 0 && spot < tiles.length && spot !== previous && (spot !== blank - size || row > 0)
    )
    const spot = options[Math.floor(random() * options.length)]
    ;[tiles[blank], tiles[spot]] = [tiles[spot], tiles[blank]]
    previous = blank
    blank = spot
  }
  return tiles
}

const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return seed / 2147483647
}

const ART =
  "radial-gradient(circle at 30% 28%, #f3e2b8 0 9%, transparent 9.5%), radial-gradient(circle at 70% 120%, #4f6b55 0 38%, transparent 38.5%), radial-gradient(circle at 20% 115%, #34493b 0 32%, transparent 32.5%), linear-gradient(180deg, #e9c79a 0%, #c98a62 45%, #6f5a6e 100%)"

/**
 * A sliding tile puzzle. Click a tile in the blank's row or column to slide
 * it (and any tiles between) into the gap, or use the arrow keys. Put the
 * picture back together in as few moves as you can.
 */
function SlidingPuzzle({ size = 4, src, alt = "", onSolve, className, ...props }: SlidingPuzzleProps) {
  const [tiles, setTiles] = React.useState(() => scramble(size, seeded(42)))
  const [moves, setMoves] = React.useState(0)
  const solved = tiles.every((tile, i) => tile === (i + 1) % (size * size))
  const blank = tiles.indexOf(0)

  const slide = (from: number) => {
    if (solved) return
    const br = Math.floor(blank / size)
    const bc = blank % size
    const fr = Math.floor(from / size)
    const fc = from % size
    if (from === blank || (br !== fr && bc !== fc)) return
    const step = br === fr ? Math.sign(fc - bc) : Math.sign(fr - br) * size
    const next = [...tiles]
    let gap = blank
    // Slide every tile between the gap and the clicked one, one place each.
    while (gap !== from) {
      next[gap] = next[gap + step]
      gap += step
    }
    next[from] = 0
    const count = moves + Math.abs(br === fr ? fc - bc : fr - br)
    setTiles(next)
    setMoves(count)
    if (next.every((tile, i) => tile === (i + 1) % (size * size))) onSolve?.(count)
  }

  const picture = src ? `url("${src}")` : ART

  return (
    <div data-slot="sliding-puzzle" className={cn("flex w-80 max-w-full flex-col gap-4", className)} {...props}>
      <div
        role="group"
        aria-label={`Sliding puzzle${alt ? ` of ${alt}` : ""}. Arrow keys slide a tile into the gap.`}
        onKeyDown={(event) => {
          // An arrow moves the tile on the far side of the gap in that direction.
          const offsets: Record<string, number> = { ArrowUp: size, ArrowDown: -size, ArrowLeft: 1, ArrowRight: -1 }
          const offset = offsets[event.key]
          if (offset === undefined) return
          event.preventDefault()
          const from = blank + offset
          const sameRow = Math.abs(offset) === 1 ? Math.floor(from / size) === Math.floor(blank / size) : true
          if (from >= 0 && from < tiles.length && sameRow) slide(from)
        }}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900 p-1.5 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.7)]"
      >
        <div className="relative size-full">
          {tiles.map((tile, spot) => {
            if (tile === 0) return null
            const home = tile - 1
            return (
              <button
                key={tile}
                type="button"
                onClick={() => slide(spot)}
                aria-label={`Tile ${tile}`}
                className="absolute p-0.5 outline-none transition-[left,top] duration-150 ease-out motion-reduce:transition-none [&:focus-visible>span]:ring-3 [&:focus-visible>span]:ring-white"
                style={{ width: `${100 / size}%`, height: `${100 / size}%`, left: `${((spot % size) * 100) / size}%`, top: `${(Math.floor(spot / size) * 100) / size}%` }}
              >
                <span
                  className="relative block size-full rounded-md shadow-[inset_0_1px_0_rgb(255_255_255/0.35),inset_0_-2px_0_rgb(0_0_0/0.25)]"
                  style={{
                    backgroundImage: picture,
                    backgroundSize: `${size * 100}% ${size * 100}%`,
                    backgroundPosition: `${((home % size) / (size - 1)) * 100}% ${(Math.floor(home / size) / (size - 1)) * 100}%`,
                  }}
                >
                  <span aria-hidden="true" className={cn("absolute top-1 left-1.5 text-xs font-bold text-white drop-shadow-[0_1px_1px_rgb(0_0_0/0.8)]", solved && "opacity-0")}>
                    {tile}
                  </span>
                </span>
              </button>
            )
          })}
          {solved ? (
            <span
              aria-hidden="true"
              className="absolute animate-sliding-puzzle-done p-0.5 motion-reduce:animate-none"
              style={{ width: `${100 / size}%`, height: `${100 / size}%`, right: 0, bottom: 0 }}
            >
              <span
                className="block size-full rounded-md"
                style={{ backgroundImage: picture, backgroundSize: `${size * 100}% ${size * 100}%`, backgroundPosition: "100% 100%" }}
              />
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p role="status" className="text-sm">
          {solved ? (moves ? `Solved in ${moves} moves!` : "Solved. Shuffle to play.") : `${moves} ${moves === 1 ? "move" : "moves"}`}
        </p>
        <button
          type="button"
          onClick={() => {
            setTiles(scramble(size, Math.random))
            setMoves(0)
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Shuffle aria-hidden="true" className="size-3.5" />
          Shuffle
        </button>
      </div>
    </div>
  )
}

export { SlidingPuzzle }
