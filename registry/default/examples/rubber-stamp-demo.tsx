import { RubberStamp } from "@/registry/default/ui/rubber-stamp"

export default function RubberStampDemo() {
  return (
    <RubberStamp>
      <p className="font-serif text-lg font-semibold">Invoice #2047</p>
      <p className="mt-1 text-xs text-neutral-500">Northlight Studio · 14 May 2026</p>
      <div className="mt-6 space-y-2 text-sm">
        <p className="flex justify-between"><span>Brand refresh</span><span>$4,200</span></p>
        <p className="flex justify-between"><span>Website build</span><span>$7,800</span></p>
        <p className="flex justify-between border-t pt-2 font-semibold"><span>Total</span><span>$12,000</span></p>
      </div>
    </RubberStamp>
  )
}
