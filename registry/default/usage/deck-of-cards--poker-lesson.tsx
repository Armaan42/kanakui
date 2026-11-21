import { DeckOfCards } from "@/registry/default/ui/deck-of-cards"

export const meta = {
  title: "Learn poker hands",
  description: "The deck of cards in a beginner's card game course: deal five cards and check what your hand is called.",
}

// The course is made up.
const HANDS = [
  ["Straight flush", "Five in a row, all one suit"],
  ["Four of a kind", "Four cards of one rank"],
  ["Full house", "Three of a kind plus a pair"],
  ["Flush", "Any five of one suit"],
  ["Straight", "Five in a row, mixed suits"],
  ["Three of a kind", "Three cards of one rank"],
  ["Two pair", "Two different pairs"],
  ["One pair", "Two cards of one rank"],
]

export default function PokerLesson() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Halden Games Night · Beginners&apos; course · Lesson 1</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">What beats what</h1>
      <p className="mt-2 text-muted-foreground">Deal a few hands and see what you get. The list on the right goes from best to worst.</p>
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
        <DeckOfCards />
        <ol className="divide-y rounded-xl border text-sm">
          {HANDS.map(([name, rule], i) => (
            <li key={name} className="flex gap-3 px-4 py-2.5">
              <span className="w-4 shrink-0 text-muted-foreground tabular-nums">{i + 1}</span>
              <span>
                <span className="font-medium">{name}</span>
                <span className="block text-muted-foreground">{rule}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
