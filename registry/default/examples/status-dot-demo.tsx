import { StatusDot } from "@/registry/default/ui/status-dot"

export default function StatusDotDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <StatusDot status="online" pulse />
      <StatusDot status="away" />
      <StatusDot status="busy" />
      <StatusDot status="offline" />
    </div>
  )
}
