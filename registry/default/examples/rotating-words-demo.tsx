import { RotatingWords } from "@/registry/default/ui/rotating-words"

export default function RotatingWordsDemo() {
  return (
    <p className="text-center text-3xl font-semibold tracking-tight">
      Made for <RotatingWords words={["founders", "designers", "engineers", "agencies"]} className="text-muted-foreground" />
    </p>
  )
}
