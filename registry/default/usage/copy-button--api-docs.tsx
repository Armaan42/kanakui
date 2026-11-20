import { CopyButton } from "@/registry/default/ui/copy-button"

export const meta = {
  title: "API documentation",
  description: "Copy buttons on an API reference page: one for the endpoint, one for the request example and one for a test key.",
}

// The API, endpoint and key are made up.
const ENDPOINT = "https://api.ridgeway.example/v1/shipments"
const REQUEST = `curl ${ENDPOINT} \\
  -H "Authorization: Bearer $RIDGEWAY_KEY" \\
  -d to_country=PT \\
  -d weight_grams=850 \\
  -d service=standard`
const TEST_KEY = "rw_test_4f8a21c9d07e5b36"

export default function ApiDocs() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Shipments</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Create a shipment</h1>
      <p className="mt-3 text-muted-foreground">
        Books a carrier for one parcel and returns a label and a tracking number. Weights are in grams.
      </p>

      <div className="mt-8 flex items-center gap-3 rounded-lg border bg-muted/40 py-2 pr-2 pl-3 font-mono text-sm">
        <span className="rounded bg-foreground px-1.5 py-0.5 text-xs font-semibold text-background">POST</span>
        <span className="min-w-0 flex-1 truncate">{ENDPOINT}</span>
        <CopyButton value={ENDPOINT} aria-label="Copy endpoint URL" />
      </div>

      <h2 className="mt-10 font-semibold">Example request</h2>
      <div className="mt-3 overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2 text-sm">
          <span className="text-muted-foreground">Shell</span>
          <CopyButton value={REQUEST}>Copy</CopyButton>
        </div>
        {/* Focusable so keyboard users can scroll it on narrow screens. */}
        <pre tabIndex={0} aria-label="Example request" className="overflow-x-auto p-4 text-sm leading-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">

          <code>{REQUEST}</code>
        </pre>
      </div>

      <h2 className="mt-10 font-semibold">Test key</h2>
      <p className="mt-2 text-sm text-muted-foreground">Works in test mode only. Nothing is shipped and nothing is charged.</p>
      <div className="mt-3 flex max-w-md items-center gap-2 rounded-lg border py-1.5 pr-1.5 pl-3">
        <code className="min-w-0 flex-1 truncate text-sm">{TEST_KEY}</code>
        <CopyButton value={TEST_KEY}>Copy key</CopyButton>
      </div>
    </article>
  )
}
