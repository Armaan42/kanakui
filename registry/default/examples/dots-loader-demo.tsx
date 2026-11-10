import { DotsLoader } from "@/registry/default/ui/dots-loader"

export default function DotsLoaderDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <DotsLoader className="text-2xl" />
      <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
        Assistant is typing
        <DotsLoader label="Assistant is typing" />
      </div>
    </div>
  )
}
