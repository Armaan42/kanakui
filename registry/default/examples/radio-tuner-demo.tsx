import { RadioTuner } from "@/registry/default/ui/radio-tuner"

const stations = [
  { frequency: 89.7, name: "Night Owl", genre: "Late-night jazz" },
  { frequency: 94.2, name: "Coastline", genre: "Indie and folk" },
  { frequency: 99.5, name: "Signal", genre: "News and talk" },
  { frequency: 104.8, name: "Pulse", genre: "Electronic" },
]

export default function RadioTunerDemo() {
  return <RadioTuner stations={stations} />
}
