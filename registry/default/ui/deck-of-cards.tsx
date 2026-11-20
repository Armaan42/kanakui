"use client"

import * as React from "react"
import { Shuffle } from "lucide-react"

import { cn } from "@/lib/utils"

const SUITS = [
  { symbol: "♠", name: "spades", red: false },
  { symbol: "♥", name: "hearts", red: true },
  { symbol: "♦", name: "diamonds", red: true },
  { symbol: "♣", name: "clubs", red: false },
]
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const RANK_NAMES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]
const PLURAL = ["2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "jacks", "queens", "kings", "aces"]

/** A card is a number 0–51: rank is card % 13, suit is card / 13. */
const rankOf = (card: number) => card % 13
const suitOf = (card: number) => SUITS[Math.floor(card / 13)]
const nameOf = (card: number) => `${RANK_NAMES[rankOf(card)]} of ${suitOf(card).name}`

/** Names the best poker hand in five cards. */
function handName(cards: number[]) {
  const ranks = cards.map(rankOf).sort((a, b) => b - a)
  const counts = new Map<number, number>()
  ranks.forEach((rank) => counts.set(rank, (counts.get(rank) ?? 0) + 1))
  const groups = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])
  const flush = cards.every((card) => Math.floor(card / 13) === Math.floor(cards[0] / 13))
  const unique = [...new Set(ranks)]
  const wheel = unique.join() === "12,3,2,1,0"
  const straight = unique.length === 5 && (ranks[0] - ranks[4] === 4 || wheel)
  if (straight && flush) return ranks[0] === 12 && !wheel ? "Royal flush" : "Straight flush"
  if (groups[0][1] === 4) return `Four ${PLURAL[groups[0][0]]}`
  if (groups[0][1] === 3 && groups[1][1] === 2) return `Full house, ${PLURAL[groups[0][0]]} over ${PLURAL[groups[1][0]]}`
  if (flush) return "Flush"
  if (straight) return "Straight"
  if (groups[0][1] === 3) return `Three ${PLURAL[groups[0][0]]}`
  if (groups[0][1] === 2 && groups[1][1] === 2) return `Two pair, ${PLURAL[groups[0][0]]} and ${PLURAL[groups[1][0]]}`
  if (groups[0][1] === 2) return `Pair of ${PLURAL[groups[0][0]]}`
  return `${RANK_NAMES[ranks[0]][0].toUpperCase()}${RANK_NAMES[ranks[0]].slice(1)} high`
}

function Card({ card, className, style }: { card: number; className?: string; style?: React.CSSProperties }) {
  const suit = suitOf(card)
  const rank = RANKS[rankOf(card)]
  return (
    <span
      className={cn("relative flex h-28 w-20 flex-col rounded-lg border border-neutral-300 bg-white p-1.5 font-semibold shadow-[0_4px_10px_-4px_rgb(0_0_0/0.4)] sm:h-32 sm:w-[5.5rem]", suit.red ? "text-red-600" : "text-neutral-900", className)}
      style={style}
    >
      <span className="text-sm leading-none">{rank}</span>
      <span className="text-sm leading-none">{suit.symbol}</span>
      <span className="absolute inset-0 grid place-items-center text-4xl">{rankOf(card) >= 9 && rankOf(card) <= 11 ? rank : suit.symbol}</span>
      <span className="absolute right-1.5 bottom-1.5 flex rotate-180 flex-col text-sm leading-none">
        <span>{rank}</span>
        <span>{suit.symbol}</span>
      </span>
    </span>
  )
}

const FRESH = Array.from({ length: 52 }, (_, i) => i)

/**
 * A deck of cards. Shuffle it with a riffle, deal a five-card hand and see
 * what poker hand you got; return the cards to deal again.
 */
function DeckOfCards({ className, ...props }: React.ComponentProps<"div">) {
  const [deck, setDeck] = React.useState(FRESH)
  const [hand, setHand] = React.useState<number[]>([])
  const [riffles, setRiffles] = React.useState(0)
  const [deals, setDeals] = React.useState(0)

  const shuffle = () => {
    const next = [...deck, ...hand]
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
    }
    setDeck(next)
    setHand([])
    setRiffles((count) => count + 1)
  }

  const deal = () => {
    const pile = hand.length ? [...deck, ...hand] : deck
    setHand(pile.slice(0, 5))
    setDeck(pile.slice(5))
    setDeals((count) => count + 1)
  }

  return (
    <div data-slot="deck-of-cards" className={cn("flex w-full max-w-xl flex-col gap-6", className)} {...props}>
      <div className="flex min-h-40 flex-col items-center gap-10 rounded-2xl bg-[radial-gradient(ellipse_at_center,#166534,#052e16)] p-5 pb-8 shadow-[inset_0_2px_12px_rgb(0_0_0/0.5)] sm:flex-row sm:gap-10 sm:pb-5">
        {/* The deck. */}
        <div aria-hidden="true" key={riffles} className={cn("relative h-28 w-20 shrink-0 sm:h-32 sm:w-[5.5rem]", riffles > 0 && "animate-deck-of-cards-riffle motion-reduce:animate-none")}>
          {[3, 2, 1, 0].map((layer) => (
            <span
              key={layer}
              className="absolute inset-0 rounded-lg border border-white/70 bg-blue-800 bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.14)_0_4px,transparent_4px_9px)] shadow-md"
              style={{ transform: `translate(${-layer * 1.5}px, ${-layer * 1.5}px)`, opacity: deck.length > layer * 12 ? 1 : 0 }}
            />
          ))}
          <span className="absolute -bottom-6 left-0 w-full text-center text-xs text-green-100">{deck.length} cards</span>
        </div>
        {/* The hand. */}
        <ul aria-label="Your hand" className="flex flex-1 justify-center">
          {hand.map((card, i) => (
            <li key={`${deals}-${card}`} aria-label={nameOf(card)} className="-ml-8 first:ml-0 sm:-ml-6">
              <Card
                card={card}
                className="animate-deck-of-cards-deal motion-reduce:animate-none"
                style={{ rotate: `${(i - 2) * 5}deg`, translate: `0 ${Math.abs(i - 2) * 4}px`, animationDelay: `${i * 90}ms` }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={shuffle}
          className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Shuffle aria-hidden="true" className="size-4" />
          Shuffle
        </button>
        <button
          type="button"
          onClick={deal}
          className="h-10 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {hand.length ? "Deal again" : "Deal five"}
        </button>
      </div>
      <p role="status" className="text-sm">
        {hand.length ? `${handName(hand)}: ${hand.map(nameOf).join(", ")}.` : riffles ? "Shuffled. Deal a hand." : "A fresh deck, in order. Shuffle first for a fair hand."}
      </p>
    </div>
  )
}

export { DeckOfCards }
