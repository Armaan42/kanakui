import { PullCordLamp } from "@/registry/default/ui/pull-cord-lamp"

export default function PullCordLampDemo() {
  return (
    <div className="flex min-h-[26rem] w-full flex-col items-center">
      <PullCordLamp controlsTheme label="Light (switches light and dark mode)" />
    </div>
  )
}
