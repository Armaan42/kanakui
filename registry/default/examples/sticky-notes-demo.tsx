import { StickyNotes } from "@/registry/default/ui/sticky-notes"

export default function StickyNotesDemo() {
  return (
    <StickyNotes
      notes={[
        { id: "1", text: "Ship the pricing page by Friday!", color: "yellow", x: 6, y: 10, rotate: -4 },
        { id: "2", text: "Ask Sofie for the new onboarding screens", color: "pink", x: 30, y: 30, rotate: 3 },
        { id: "3", text: "Coffee with Marcus at 3", color: "blue", x: 56, y: 8, rotate: -2 },
        { id: "4", text: "Retro ideas: fewer meetings, more demos", color: "green", x: 70, y: 46, rotate: 5 },
        { id: "5", text: "Book flights for the offsite", color: "yellow", x: 12, y: 56, rotate: 2 },
      ]}
    />
  )
}
