const columns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Licenses"] },
]

/** A footer with link columns and a huge brand wordmark that fills the bottom edge. */
export function Footer03() {
  return (
    <footer className="overflow-hidden border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_repeat(3,1fr)]">
          <p className="max-w-xs text-sm text-muted-foreground">
            Short line about your company. Built for people who care about craft.
          </p>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="space-y-3">
              <h2 className="text-sm font-medium">{column.title}</h2>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted-foreground">© 2026 Acme Inc.</p>
      </div>
      <p
        aria-hidden="true"
        className="-mb-[0.18em] text-center text-[22vw] leading-none font-semibold tracking-tighter text-foreground/[0.06] select-none lg:text-[16rem]"
      >
        acme
      </p>
    </footer>
  )
}
