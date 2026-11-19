"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface CardDetails {
  number: string
  name: string
  expiry: string
  cvc: string
  brand: CardBrand
}

type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "card"
type Field = "number" | "name" | "expiry" | "cvc"

interface CreditCardFormProps extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  submitLabel?: string
  /** Shown after valid details are submitted. */
  successMessage?: string
  /** Receives the validated details. Pass them straight to your payment provider's SDK. */
  onComplete?: (details: CardDetails) => void
}

const BRANDS: Record<CardBrand, { label: string; surface: string; groups: number[]; cvc: number }> = {
  visa: { label: "Visa", surface: "from-indigo-900 via-blue-900 to-slate-900", groups: [4, 4, 4, 4], cvc: 3 },
  mastercard: { label: "Mastercard", surface: "from-stone-900 via-orange-950 to-red-950", groups: [4, 4, 4, 4], cvc: 3 },
  amex: { label: "Amex", surface: "from-teal-900 via-cyan-900 to-slate-900", groups: [4, 6, 5], cvc: 4 },
  discover: { label: "Discover", surface: "from-zinc-900 via-amber-950 to-orange-950", groups: [4, 4, 4, 4], cvc: 3 },
  card: { label: "Card", surface: "from-zinc-800 via-zinc-900 to-black", groups: [4, 4, 4, 4], cvc: 3 },
}

function detectBrand(digits: string): CardBrand {
  if (/^4/.test(digits)) return "visa"
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard"
  if (/^3[47]/.test(digits)) return "amex"
  if (/^6(011|5)/.test(digits)) return "discover"
  return "card"
}

function group(digits: string, groups: number[]) {
  const parts: string[] = []
  let start = 0
  for (const size of groups) {
    if (start >= digits.length) break
    parts.push(digits.slice(start, start + size))
    start += size
  }
  return parts.join(" ")
}

function passesLuhn(digits: string) {
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let digit = Number(digits[digits.length - 1 - i])
    if (i % 2 === 1) digit = digit * 2 > 9 ? digit * 2 - 9 : digit * 2
    sum += digit
  }
  return sum % 10 === 0
}

function validate(values: Record<Field, string>, now: Date): Partial<Record<Field, string>> {
  const digits = values.number.replace(/\D/g, "")
  const brand = BRANDS[detectBrand(digits)]
  const length = brand.groups.reduce((total, size) => total + size, 0)
  const errors: Partial<Record<Field, string>> = {}
  if (digits.length !== length || !passesLuhn(digits)) errors.number = "Enter a valid card number."
  if (values.name.trim().length < 2) errors.name = "Enter the name on the card."
  const [month, year] = values.expiry.split("/").map(Number)
  const expired = !year || year + 2000 < now.getFullYear() || (year + 2000 === now.getFullYear() && month < now.getMonth() + 1)
  if (!month || month > 12 || expired) errors.expiry = "Enter a future date as MM/YY."
  if (values.cvc.length !== brand.cvc) errors.cvc = `Enter the ${brand.cvc}-digit code.`
  return errors
}

/**
 * A card form with a live card that fills in as you type and turns over for
 * the security code. It formats and validates locally and never sends anything
 * itself: hand the result to your payment provider.
 */
function CreditCardForm({ submitLabel = "Save card", successMessage = "Card details look valid.", onComplete, className, ...props }: CreditCardFormProps) {
  const [values, setValues] = React.useState<Record<Field, string>>({ number: "", name: "", expiry: "", cvc: "" })
  const [touched, setTouched] = React.useState<Partial<Record<Field, boolean>>>({})
  const [errors, setErrors] = React.useState<Partial<Record<Field, string>>>({})
  const [flipped, setFlipped] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const id = React.useId()
  const digits = values.number.replace(/\D/g, "")
  const brandKey = detectBrand(digits)
  const brand = BRANDS[brandKey]
  const maxDigits = brand.groups.reduce((total, size) => total + size, 0)
  const preview = group(digits.padEnd(maxDigits, "•"), brand.groups)

  const update = (field: Field, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    setDone(false)
    if (touched[field]) setErrors(validate(next, new Date()))
  }

  const blur = (field: Field) => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validate(values, new Date()))
  }

  const fieldProps = (field: Field) => ({
    id: `${id}-${field}`,
    value: values[field],
    required: true,
    "aria-invalid": Boolean(touched[field] && errors[field]),
    "aria-describedby": touched[field] && errors[field] ? `${id}-${field}-error` : undefined,
    onBlur: () => blur(field),
  })

  const message = (field: Field) =>
    touched[field] && errors[field] ? (
      <p id={`${id}-${field}-error`} className="text-xs text-destructive">
        {errors[field]}
      </p>
    ) : null

  return (
    <form
      data-slot="credit-card-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        const found = validate(values, new Date())
        setErrors(found)
        setTouched({ number: true, name: true, expiry: true, cvc: true })
        if (Object.keys(found).length) return
        setDone(true)
        onComplete?.({ number: digits, name: values.name.trim(), expiry: values.expiry, cvc: values.cvc, brand: brandKey })
      }}
      className={cn("w-full max-w-sm space-y-5", className)}
      {...props}
    >
      <div aria-hidden="true" className="mx-auto aspect-[1.586] w-full max-w-80 [perspective:1000px]">
        <div className={cn("relative size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none", flipped && "[transform:rotateY(180deg)]")}>
          <div className={cn("absolute inset-0 flex flex-col justify-between rounded-2xl bg-linear-135 p-5 text-white shadow-[0_18px_30px_-14px_rgb(0_0_0/0.6)] transition-colors [backface-visibility:hidden]", brand.surface)}>
            <div className="flex items-start justify-between">
              <span className="h-8 w-11 rounded-md bg-linear-135 from-amber-200 to-amber-500 shadow-[inset_0_0_0_1px_rgb(120_53_15/0.35)]" />
              <span className="text-sm font-semibold italic">{brand.label}</span>
            </div>
            <p className="font-mono text-[clamp(0.9rem,5vw,1.2rem)] tracking-wider whitespace-nowrap tabular-nums">{preview}</p>
            <div className="flex items-end justify-between gap-4 text-[10px] tracking-wider uppercase">
              <span className="min-w-0">
                <span className="block text-white/60">Card holder</span>
                <span className="block truncate text-xs">{values.name || "Your name"}</span>
              </span>
              <span className="shrink-0">
                <span className="block text-white/60">Expires</span>
                <span className="block font-mono text-xs">{values.expiry || "MM/YY"}</span>
              </span>
            </div>
          </div>
          <div className={cn("absolute inset-0 overflow-hidden rounded-2xl bg-linear-135 text-white shadow-[0_18px_30px_-14px_rgb(0_0_0/0.6)] [backface-visibility:hidden] [transform:rotateY(180deg)]", brand.surface)}>
            <div className="mt-6 h-10 bg-black/80" />
            <div className="mx-5 mt-5 flex h-9 items-center justify-end rounded-sm bg-white px-3 font-mono text-sm tracking-widest text-neutral-900">
              {values.cvc.replace(/./g, "•") || "•".repeat(brand.cvc)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${id}-number`} className="text-sm font-medium">Card number</label>
        <Input
          {...fieldProps("number")}
          value={group(digits, brand.groups)}
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          onChange={(event) => {
            const input = event.target
            const before = input.value.slice(0, input.selectionStart ?? 0).replace(/\D/g, "").length
            const atEnd = input.selectionStart === input.value.length
            const raw = input.value.replace(/\D/g, "")
            const nextBrand = BRANDS[detectBrand(raw)]
            const next = group(raw.slice(0, nextBrand.groups.reduce((total, size) => total + size, 0)), nextBrand.groups)
            update("number", next)
            if (atEnd) return
            requestAnimationFrame(() => {
              let position = 0
              for (let seen = 0; position < next.length && seen < before; position++) if (/\d/.test(next[position])) seen++
              input.setSelectionRange(position, position)
            })
          }}
        />
        {message("number")}
      </div>
      <div className="space-y-1.5">
        <label htmlFor={`${id}-name`} className="text-sm font-medium">Name on card</label>
        <Input {...fieldProps("name")} autoComplete="cc-name" placeholder="Priya Natarajan" onChange={(event) => update("name", event.target.value)} />
        {message("name")}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor={`${id}-expiry`} className="text-sm font-medium">Expiry</label>
          <Input
            {...fieldProps("expiry")}
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            onChange={(event) => {
              const raw = event.target.value.replace(/\D/g, "").slice(0, 4)
              update("expiry", raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw)
            }}
          />
          {message("expiry")}
        </div>
        <div className="space-y-1.5">
          <label htmlFor={`${id}-cvc`} className="text-sm font-medium">Security code</label>
          <Input
            {...fieldProps("cvc")}
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={"0".repeat(brand.cvc)}
            onFocus={() => setFlipped(true)}
            onBlur={() => {
              setFlipped(false)
              blur("cvc")
            }}
            onChange={(event) => update("cvc", event.target.value.replace(/\D/g, "").slice(0, brand.cvc))}
          />
          {message("cvc")}
        </div>
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
      <p role="status" className="flex min-h-5 items-center justify-center gap-1.5 text-sm text-muted-foreground">
        {done ? (
          <>
            <Check aria-hidden="true" className="size-4" />
            {successMessage}
          </>
        ) : null}
      </p>
    </form>
  )
}

export { CreditCardForm }
