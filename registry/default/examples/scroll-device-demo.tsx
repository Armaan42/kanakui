import { ScrollDevice } from "@/registry/default/ui/scroll-device"

export default function ScrollDeviceDemo() {
  return (
    <ScrollDevice className="w-full max-w-2xl">
      <div className="flex size-full items-center justify-center bg-linear-to-br from-violet-500/30 to-sky-400/30">
        <p className="text-xl font-semibold tracking-tight">Your product here</p>
      </div>
    </ScrollDevice>
  )
}
