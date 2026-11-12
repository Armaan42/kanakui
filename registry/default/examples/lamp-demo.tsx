import { Lamp } from "@/registry/default/ui/lamp"

export default function LampDemo() {
  return (
    <div className="dark w-full overflow-hidden rounded-xl border bg-background text-foreground">
      <Lamp className="px-6 pt-36 pb-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built in the spotlight</h2>
        <p className="mt-3 text-sm text-muted-foreground">A lamp lights whatever you put under it.</p>
      </Lamp>
    </div>
  )
}
