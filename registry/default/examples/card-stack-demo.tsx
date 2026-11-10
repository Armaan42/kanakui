import { CardStack } from "@/registry/default/ui/card-stack"

const notes = ["Ship the beta", "Write the changelog", "Plan the launch", "Collect feedback"]

export default function CardStackDemo() {
  return (
    <CardStack
      label="Tasks"
      items={notes.map((note, i) => ({
        id: note,
        label: note,
        content: (
          <div className="flex h-full flex-col justify-between">
            <span className="font-mono text-xs text-muted-foreground">Task {i + 1}</span>
            <span className="text-xl font-semibold tracking-tight">{note}</span>
          </div>
        ),
      }))}
    />
  )
}
