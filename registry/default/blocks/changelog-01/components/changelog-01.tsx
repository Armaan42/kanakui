import { Timeline } from "@/registry/default/ui/timeline"

// Placeholder entries. Replace with your real releases.
const releases = [
  { id: "3-0", date: "Nov 10, 2026", dateTime: "2026-11-10", title: "3.0: 3D and a new docs site", description: "WebGL components, CSS 3D effects and a sidebar with every component.", current: true },
  { id: "2-4", date: "Oct 2, 2026", dateTime: "2026-10-02", title: "2.4: Forms", description: "OTP input, password strength and floating labels." },
  { id: "2-0", date: "Aug 18, 2026", dateTime: "2026-08-18", title: "2.0: Blocks", description: "Ready-made heroes, pricing tables and footers." },
  { id: "1-0", date: "May 5, 2026", dateTime: "2026-05-05", title: "1.0: First release", description: "The first public set of components." },
]

/** A changelog section: heading on the left, a timeline of releases on the right. */
export function Changelog01() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Changelog</h2>
          <p className="mt-3 text-pretty text-muted-foreground">New features, improvements and fixes.</p>
        </div>
        <Timeline entries={releases} />
      </div>
    </section>
  )
}
