import { Cloud, Database, GitBranch, Mail, Shield, Zap } from "lucide-react"

import { OrbitingCircles } from "@/registry/default/ui/orbiting-circles"

const node = "flex size-9 items-center justify-center rounded-full border bg-card"

export default function OrbitingCirclesDemo() {
  return (
    <div className="relative flex size-72 items-center justify-center">
      <span className="z-10 rounded-xl border bg-foreground px-3 py-2 text-sm font-semibold text-background">Core</span>
      <OrbitingCircles radius={64} duration={18}>
        <span className={node}><Database className="size-4" /></span>
        <span className={node}><Shield className="size-4" /></span>
      </OrbitingCircles>
      <OrbitingCircles radius={120} duration={28} reverse>
        <span className={node}><Cloud className="size-4" /></span>
        <span className={node}><GitBranch className="size-4" /></span>
        <span className={node}><Mail className="size-4" /></span>
        <span className={node}><Zap className="size-4" /></span>
      </OrbitingCircles>
    </div>
  )
}
