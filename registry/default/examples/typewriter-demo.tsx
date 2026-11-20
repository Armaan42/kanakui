import { Search } from "lucide-react"

import { Typewriter } from "@/registry/default/ui/typewriter"

export default function TypewriterDemo() {
  return (
    <div className="flex h-11 w-full max-w-md items-center gap-2.5 rounded-lg border bg-card px-3.5 text-sm shadow-xs">
      <Search aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      <span className="text-muted-foreground">
        Try{" "}
        <Typewriter words={["miso soup", "banana bread", "a quick dal", "cold brew"]} className="text-foreground" />
      </span>
    </div>
  )
}
