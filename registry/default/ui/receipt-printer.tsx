"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ReceiptItem {
  name: string
  quantity: number
  /** Unit price. */
  price: number
}

interface ReceiptPrinterProps extends React.ComponentProps<"div"> {
  store: string
  /** Address or a short line under the store name. */
  address?: string
  items: ReceiptItem[]
  /** e.g. 0.2 for 20% tax, added on top of the subtotal. */
  taxRate?: number
  /** Intl currency code. */
  currency?: string
  locale?: string
  /** e.g. "Visa •• 4821". */
  paidWith?: string
  orderId?: string
  /** e.g. "16 Nov 2026, 09:41". */
  date?: string
}

const ZIGZAG = "linear-gradient(-45deg, transparent 6px, #000 0) bottom left / 12px 12px repeat-x, linear-gradient(45deg, transparent 6px, #000 0) bottom left / 12px 12px repeat-x, linear-gradient(#000, #000) top / 100% calc(100% - 6px) no-repeat"

/**
 * A receipt that prints out of a slot, a line at a time, when it scrolls into
 * view; "Print again" replays it. Totals are calculated from the items. With
 * reduced motion it appears already printed.
 */
function ReceiptPrinter({
  store,
  address,
  items,
  taxRate = 0,
  currency = "USD",
  locale = "en-US",
  paidWith,
  orderId,
  date,
  className,
  ...props
}: ReceiptPrinterProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [printed, setPrinted] = React.useState(false)
  const [run, setRun] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        observer.disconnect()
        setTimeout(() => setPrinted(true), 250)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [run])

  const money = (n: number) => new Intl.NumberFormat(locale, { style: "currency", currency }).format(n)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * taxRate
  const lines = items.length + 10

  return (
    <div ref={ref} data-slot="receipt-printer" className={cn("flex w-full max-w-xs flex-col items-center", className)} {...props}>
      {/* Printer */}
      <div aria-hidden="true" className="relative z-10 h-12 w-full rounded-2xl bg-linear-to-b from-neutral-700 to-neutral-900 shadow-lg">
        <span className="absolute inset-x-6 bottom-3 h-1.5 rounded-full bg-black/80 shadow-[inset_0_1px_2px_rgb(0_0_0)]" />
        <span className={cn("absolute top-3 right-4 size-1.5 rounded-full", printed ? "bg-emerald-400 shadow-[0_0_6px_rgb(52_211_153)]" : "bg-amber-400")} />
      </div>

      {/* Paper, fed out of the slot in steps like a thermal printer. */}
      <div className="-mt-3 w-[88%] overflow-hidden pt-3">
        <div
          key={run}
          className={cn(
            "bg-[#fdfcf8] px-5 pt-5 pb-8 font-mono text-[12px] leading-relaxed text-neutral-800 shadow-[0_10px_20px_-10px_rgb(0_0_0/0.35)] motion-reduce:translate-y-0 motion-reduce:transition-none",
            printed ? "translate-y-0" : "-translate-y-full"
          )}
          style={{ mask: ZIGZAG, WebkitMask: ZIGZAG, transition: `translate ${lines * 0.12}s steps(${lines})` }}
        >
          <p className="text-center text-sm font-bold tracking-widest uppercase">{store}</p>
          {address ? <p className="text-center text-[11px] text-neutral-500">{address}</p> : null}
          <p className="mt-2 flex justify-between text-[11px] text-neutral-500">
            <span>{date}</span>
            <span>{orderId}</span>
          </p>
          <p aria-hidden="true" className="my-2 overflow-hidden whitespace-nowrap text-neutral-400">
            {"- ".repeat(40)}
          </p>
          <table className="w-full">
            <caption className="sr-only">Items</caption>
            <tbody>
              {items.map((item) => (
                <tr key={item.name}>
                  <td className="py-0.5 pr-2 align-top">
                    {item.quantity > 1 ? `${item.quantity} × ` : ""}
                    {item.name}
                  </td>
                  <td className="py-0.5 text-right align-top tabular-nums">{money(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p aria-hidden="true" className="my-2 overflow-hidden whitespace-nowrap text-neutral-400">
            {"- ".repeat(40)}
          </p>
          <dl className="space-y-0.5">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{money(subtotal)}</dd>
            </div>
            {taxRate > 0 ? (
              <div className="flex justify-between">
                <dt>Tax ({Math.round(taxRate * 100)}%)</dt>
                <dd className="tabular-nums">{money(tax)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between pt-1 text-sm font-bold">
              <dt>Total</dt>
              <dd className="tabular-nums">{money(subtotal + tax)}</dd>
            </div>
          </dl>
          {paidWith ? <p className="mt-2 text-[11px] text-neutral-500">Paid · {paidWith}</p> : null}
          <div aria-hidden="true" className="mt-4 flex h-9 justify-center gap-px">
            {Array.from({ length: 44 }, (_, i) => (
              <span key={i} className="bg-neutral-800" style={{ width: [1, 2, 1, 3, 1, 1, 2][i % 7] }} />
            ))}
          </div>
          <p className="mt-3 text-center">Thank you! ♥</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setPrinted(false)
          setRun((n) => n + 1)
        }}
        className="mt-4 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <RotateCcw aria-hidden="true" className="size-3" /> Print again
      </button>
    </div>
  )
}

export { ReceiptPrinter }
