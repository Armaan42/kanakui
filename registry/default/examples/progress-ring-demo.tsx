import { ProgressRing } from "@/registry/default/ui/progress-ring"

export default function ProgressRingDemo() {
  return (
    <div className="flex items-center gap-8">
      <ProgressRing value={72} label="Upload progress" />
      <ProgressRing value={3} max={5} size={72} strokeWidth={6} label="Onboarding steps completed">
        3/5
      </ProgressRing>
    </div>
  )
}
