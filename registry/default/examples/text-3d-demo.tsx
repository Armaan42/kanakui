import { Text3d } from "@/registry/default/ui/text-3d"

// The arcade is made up.
export default function Text3dDemo() {
  return (
    <div className="text-center">
      <Text3d text="ARCADE" className="text-7xl" />
      <p className="mt-4 text-sm text-muted-foreground">Pinball, skee-ball and forty cabinets. Open late Friday to Sunday.</p>
    </div>
  )
}
