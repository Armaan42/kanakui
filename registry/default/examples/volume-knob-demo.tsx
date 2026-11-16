import { VolumeKnob } from "@/registry/default/ui/volume-knob"

export default function VolumeKnobDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10">
      <VolumeKnob label="Volume" defaultValue={62} />
      <VolumeKnob label="Bass" defaultValue={0} min={-12} max={12} step={1} format={(v) => `${v > 0 ? "+" : ""}${v} dB`} />
    </div>
  )
}
