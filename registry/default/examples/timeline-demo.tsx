import { Timeline } from "@/registry/default/ui/timeline"

export default function TimelineDemo() {
  return (
    <Timeline
      className="max-w-md"
      entries={[
        { id: "v3", date: "Nov 2026", dateTime: "2026-11", title: "Version 3.0", description: "3D components and a new docs layout.", current: true },
        { id: "v2", date: "Aug 2026", dateTime: "2026-08", title: "Version 2.0", description: "Blocks for heroes, pricing and footers." },
        { id: "v1", date: "May 2026", dateTime: "2026-05", title: "Version 1.0", description: "First public release." },
      ]}
    />
  )
}
