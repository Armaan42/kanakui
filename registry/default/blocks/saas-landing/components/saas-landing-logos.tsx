/** Customer logos. These brands are made up; put your customers' logos here (with their permission). */
const customers = [
  { name: "Northwind", mark: <path d="M4 20 12 4l8 16h-5l-3-6-3 6Z" /> },
  { name: "Brightloop", mark: <path d="M12 3a9 9 0 1 0 9 9h-4a5 5 0 1 1-5-5Z" /> },
  { name: "Kestrel", mark: <path d="M3 12 12 3l9 9-9 9Zm9-4-4 4 4 4 4-4Z" fillRule="evenodd" /> },
  { name: "Fernway", mark: <path d="M12 2c4 4 6 8 6 12a6 6 0 0 1-12 0c0-4 2-8 6-12Z" /> },
  { name: "Oakline", mark: <path d="M3 5h18v4H3Zm0 5h12v4H3Zm0 5h18v4H3Z" /> },
  { name: "Quanta", mark: <path d="M12 2 21 7v10l-9 5-9-5V7Zm0 5-4.5 2.5v5L12 17l4.5-2.5v-5Z" fillRule="evenodd" /> },
]

export function SaasLandingLogos() {
  return (
    <section aria-labelledby="saas-landing-logos" className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="saas-landing-logos" className="text-center text-sm text-muted-foreground">
          Trusted by product teams at fast-growing companies
        </h2>
        <ul className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {customers.map((customer) => (
            <li key={customer.name} className="flex items-center justify-center gap-2 text-foreground/55">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
                {customer.mark}
              </svg>
              <span className="text-lg font-semibold tracking-tight">{customer.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
