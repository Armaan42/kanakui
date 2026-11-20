import { CardStack } from "@/registry/default/ui/card-stack"

const notes = [
  { title: "Send the venue deposit", due: "Due today" },
  { title: "Confirm catering numbers", due: "Due Thursday" },
  { title: "Print name badges", due: "Due Friday" },
  { title: "Book the photographer", due: "Next week" },
]

export default function CardStackDemo() {
  return (
    <CardStack
      label="Tasks"
      items={notes.map((note) => ({
        id: note.title,
        label: note.title,
        content: (
          <div className="flex h-full flex-col justify-between">
            <span className="text-sm text-muted-foreground">{note.due}</span>
            <span className="text-xl font-semibold tracking-tight">{note.title}</span>
          </div>
        ),
      }))}
    />
  )
}
