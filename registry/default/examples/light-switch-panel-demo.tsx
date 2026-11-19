import { LightSwitchPanel } from "@/registry/default/ui/light-switch-panel"

export default function LightSwitchPanelDemo() {
  return (
    <LightSwitchPanel
      switches={[
        { id: "kitchen", label: "Kitchen", defaultOn: true },
        { id: "hall", label: "Hall" },
        { id: "porch", label: "Porch", defaultOn: true },
      ]}
    />
  )
}
