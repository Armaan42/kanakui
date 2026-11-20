import { RotatingWords } from "@/registry/default/ui/rotating-words"

export default function RotatingWordsDemo() {
  return (
    <p className="text-center text-3xl font-semibold tracking-tight">
      Weekend flights to <RotatingWords words={["Lisbon", "Reykjavík", "Kyoto", "Marrakesh"]} className="text-muted-foreground" />
    </p>
  )
}
