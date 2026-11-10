import { ImageCompare } from "@/registry/default/ui/image-compare"

function Mock({ dark }: { dark?: boolean }) {
  return (
    <div className={dark ? "size-full bg-zinc-950 p-6 text-zinc-50" : "size-full bg-zinc-50 p-6 text-zinc-950"}>
      <div className="h-3 w-24 rounded bg-current opacity-80" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 rounded-md border border-current/15 bg-current/5" />
        ))}
      </div>
    </div>
  )
}

export default function ImageCompareDemo() {
  return (
    <ImageCompare
      className="max-w-xl"
      beforeLabel="Light"
      afterLabel="Dark"
      before={<Mock />}
      after={<Mock dark />}
    />
  )
}
