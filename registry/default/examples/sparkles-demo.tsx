import { Sparkles } from "@/registry/default/ui/sparkles"

// The shop and order are made up.
export default function SparklesDemo() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold tracking-tight">
        Your first <Sparkles className="text-amber-600 dark:text-amber-400">sale</Sparkles> just came in
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">Order #1001 · Linen tote bag · $48</p>
    </div>
  )
}
