import { Typewriter } from "@/registry/default/ui/typewriter"

export default function TypewriterDemo() {
  return (
    <p className="text-center text-3xl font-semibold tracking-tight">
      Build{" "}
      <Typewriter words={["landing pages", "dashboards", "design systems"]} className="text-muted-foreground" />
    </p>
  )
}
