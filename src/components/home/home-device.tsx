import { DeviceReveal } from "@/components/home/device-reveal"
import { getItem } from "@/lib/registry"

const BLOCK = "bento-01"

/** "Running, not pictured": a block running live inside a screen that straightens on scroll. */
export function HomeDevice() {
  const block = getItem("blocks", BLOCK)
  if (!block) return null

  return (
    <section aria-labelledby="live" className="overflow-hidden border-b">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28">
        <DeviceReveal name={block.name} title={block.title} href={`/blocks/${block.name}`}>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Running, not pictured</p>
          <h2 id="live" className="mt-4 text-4xl font-semibold tracking-tighter text-balance sm:text-6xl">
            Whole pages, alive the moment you paste them
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            This is the {block.title} block running for real: the number counts up, the logos scroll and the border
            glows. It&apos;s the actual block, not a picture, and the code is yours to change.
          </p>
        </DeviceReveal>
      </div>
    </section>
  )
}
