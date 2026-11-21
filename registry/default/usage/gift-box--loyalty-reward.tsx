import { GiftBox } from "@/registry/default/ui/gift-box"

export const meta = {
  title: "Loyalty reward unlocked",
  description: "The gift box on a café loyalty app's reward screen, opening to reveal the code earned by the tenth stamp.",
}

// The café, stamps and code are made up.
export default function LoyaltyReward() {
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground">Kiln Corner Café · loyalty card</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Ten stamps. This one&apos;s on us.</h1>
      <ol className="mt-6 grid grid-cols-5 gap-2" aria-label="10 of 10 stamps collected">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} className="grid size-9 place-items-center rounded-full border-2 border-foreground/80 text-xs font-semibold">
            ✓
          </li>
        ))}
      </ol>
      <GiftBox className="mt-10" code="KILN-FREE-10" reward="Any drink, any size, free" />
      <p className="mt-6 text-sm text-muted-foreground">Show the code at the till. Valid for 30 days.</p>
    </div>
  )
}
