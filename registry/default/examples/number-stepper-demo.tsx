import { NumberStepper } from "@/registry/default/ui/number-stepper"

export default function NumberStepperDemo() {
  return <NumberStepper label="Seats" defaultValue={3} min={1} max={20} />
}
