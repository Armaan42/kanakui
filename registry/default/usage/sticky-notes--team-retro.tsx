import { StickyNotes } from "@/registry/default/ui/sticky-notes"

export const meta = {
  title: "Team retrospective board",
  description: "Sticky notes on a sprint retrospective board, under the columns the team sorts them into.",
}

// The team and notes are made up.
export default function TeamRetro() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="text-sm text-muted-foreground">Oakline · Sprint 42 retro · Thursday</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">What went well, what didn&apos;t, what to try</h1>
      <p className="mt-1 text-sm text-muted-foreground">Drag notes around to group them. Votes close at 15:30.</p>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center text-sm font-medium">
        <span className="rounded-md bg-muted py-2">Went well</span>
        <span className="rounded-md bg-muted py-2">Didn&apos;t</span>
        <span className="rounded-md bg-muted py-2">Try next</span>
      </div>
      <StickyNotes
        className="mt-2 h-[26rem]"
        notes={[
          { id: "1", text: "Checkout shipped a day early", color: "green", x: 3, y: 6, rotate: -3 },
          { id: "2", text: "Pairing on the billing bug saved us", color: "green", x: 12, y: 50, rotate: 2 },
          { id: "3", text: "Too many meetings on Tuesday", color: "pink", x: 37, y: 8, rotate: 3 },
          { id: "4", text: "Staging was down for half a day", color: "pink", x: 44, y: 52, rotate: -2 },
          { id: "5", text: "Demo every Friday, even if small", color: "blue", x: 70, y: 6, rotate: -4 },
          { id: "6", text: "No-meeting Wednesday mornings", color: "yellow", x: 76, y: 50, rotate: 3 },
        ]}
      />
    </div>
  )
}
