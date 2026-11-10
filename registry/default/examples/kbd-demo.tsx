import { Kbd, KbdCombo } from "@/registry/default/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        Press <KbdCombo keys={["⌘", "K"]} /> to open search.
      </p>
      <p>
        Use <Kbd>↑</Kbd> <Kbd>↓</Kbd> to move and <Kbd>Enter</Kbd> to choose.
      </p>
    </div>
  )
}
