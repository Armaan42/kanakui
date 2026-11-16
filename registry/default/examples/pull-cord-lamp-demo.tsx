import { PullCordLamp } from "@/registry/default/ui/pull-cord-lamp"

export default function PullCordLampDemo() {
  return (
    <div className="flex min-h-[26rem] w-full flex-col items-center">
      <PullCordLamp controlsTheme label="Light (switches light and dark mode)" />
      <p className="mt-auto text-sm text-muted-foreground">Pull the cord to switch between light and dark.</p>
    </div>
  )
}
