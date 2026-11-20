"use client"

import * as React from "react"
import { Check, FileText } from "lucide-react"

import { SignaturePad } from "@/registry/default/ui/signature-pad"

export const meta = {
  title: "Signing a lease",
  description: "The signature pad at the end of a rental agreement; saving the signature completes the document.",
}

// The landlord, tenant and property are made up.
export default function LeaseSigning() {
  const [signed, setSigned] = React.useState<string | null>(null)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText aria-hidden="true" className="size-4" />
        Tenancy agreement · 3 pages
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Rua das Flores 28, flat 2</h1>

      <section aria-labelledby="terms" className="mt-6 rounded-xl border bg-card p-6 text-sm leading-6">
        <h2 id="terms" className="font-medium">
          Key terms
        </h2>
        <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {[
            ["Tenant", "Ana Ribeiro"],
            ["Landlord", "Oakline Properties"],
            ["Start date", "1 January 2027"],
            ["Term", "12 months"],
            ["Rent", "€1,150 per month"],
            ["Deposit", "€2,300"],
          ].map(([term, value]) => (
            <div key={term} className="flex justify-between gap-4 border-b py-1.5">
              <dt className="text-muted-foreground">{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-muted-foreground">
          By signing you confirm you have read all three pages, including the house rules and the inventory list.
        </p>
      </section>

      <section aria-labelledby="sign" className="mt-6">
        <h2 id="sign" className="font-medium">
          Your signature
        </h2>
        {signed ? (
          <div role="status" className="mt-3 flex items-center gap-4 rounded-xl border p-4">
            <img src={signed} alt="Your signature" className="h-16 w-auto rounded bg-white" />
            <p className="flex items-center gap-2 text-sm">
              <Check aria-hidden="true" className="size-4" />
              Signed today. A copy is on its way to you and the landlord.
            </p>
          </div>
        ) : (
          <SignaturePad className="mt-3" onSave={setSigned} />
        )}
      </section>
    </div>
  )
}
