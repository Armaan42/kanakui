import { Lamp } from "@/registry/default/ui/lamp"

// The product is made up.
export default function LampDemo() {
  return (
    <div className="dark w-full overflow-hidden rounded-xl border bg-background text-foreground">
      <Lamp className="px-6 pt-36 pb-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Halden Desk Lamp, second edition</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">A warmer bulb, a heavier brass base and a dimmer you can feel click.</p>
      </Lamp>
    </div>
  )
}
