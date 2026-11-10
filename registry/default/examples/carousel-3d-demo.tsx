import { Carousel3d } from "@/registry/default/ui/carousel-3d"

const projects = ["Atlas", "Beacon", "Comet", "Delta", "Echo", "Flux"]

export default function Carousel3dDemo() {
  return (
    <Carousel3d
      label="Featured projects"
      items={projects.map((name, i) => ({
        id: name,
        label: name,
        content: (
          <div className="flex h-full flex-col justify-between p-5">
            <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            <span className="text-2xl font-semibold tracking-tight">{name}</span>
          </div>
        ),
      }))}
    />
  )
}
