import { ToggleSwitch } from "@/registry/default/ui/toggle-switch"

export default function ToggleSwitchDemo() {
  return (
    <div className="space-y-3">
      <ToggleSwitch label="Email notifications" defaultChecked />
      <ToggleSwitch label="Weekly summary" size="sm" />
    </div>
  )
}
