"use client"

import * as React from "react"
import { Check, FileDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/registry/default/ui/spinner"

export const meta = {
  title: "Saving and exporting",
  description: "The spinner in three places: inside a Save button, next to a syncing row, and over a panel while a report exports.",
}

// The workspace and integrations are made up.
const SOURCES = [
  { name: "Storefront orders", status: "synced", when: "2 min ago" },
  { name: "Warehouse stock", status: "syncing", when: "Now" },
  { name: "Ad spend", status: "synced", when: "1 h ago" },
] as const

export default function SavingStates() {
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [exporting, setExporting] = React.useState(false)

  const save = () => {
    setSaving(true)
    setSaved(false)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
    }, 1400)
  }
  const exportReport = () => {
    setExporting(true)
    setTimeout(() => setExporting(false), 2200)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 lg:grid-cols-2">
      <section aria-labelledby="store-settings" className="rounded-xl border bg-card p-6">
        <h2 id="store-settings" className="font-medium">
          Store details
        </h2>
        <form
          className="mt-4 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            save()
          }}
        >
          <label className="grid gap-1.5 text-sm font-medium">
            Store name
            <Input defaultValue="Halden Goods" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Support email
            <Input type="email" defaultValue="help@haldengoods.shop" />
          </label>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? <Spinner size="sm" label="Saving" /> : null}
              {saving ? "Saving…" : "Save changes"}
            </Button>
            {saved ? (
              <span role="status" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Check aria-hidden="true" className="size-4" />
                Saved
              </span>
            ) : null}
          </div>
        </form>
      </section>

      <section aria-labelledby="data-sources" className="relative overflow-hidden rounded-xl border bg-card">
        <div className="flex items-center justify-between gap-4 border-b px-6 py-4">
          <h2 id="data-sources" className="font-medium">
            Data sources
          </h2>
          <Button variant="outline" size="sm" onClick={exportReport} disabled={exporting}>
            <FileDown aria-hidden="true" />
            Export report
          </Button>
        </div>
        <ul className="divide-y">
          {SOURCES.map((source) => (
            <li key={source.name} className="flex items-center gap-3 px-6 py-3.5 text-sm">
              {source.status === "syncing" ? (
                <Spinner size="sm" label={`Syncing ${source.name}`} />
              ) : (
                <Check aria-label="Synced" className="size-4 text-muted-foreground" />
              )}
              <span className="flex-1">{source.name}</span>
              <span className="text-muted-foreground">{source.when}</span>
            </li>
          ))}
        </ul>
        {exporting ? (
          <div className="absolute inset-0 grid place-items-center bg-background/80 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3 text-sm">
              <Spinner size="lg" label="Exporting report" />
              <p>Building your report…</p>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
