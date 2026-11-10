const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "Support", "Status"],
  },
]

const legal = ["Privacy", "Terms", "Cookies"]

/**
 * Footer with a brand column, three link columns and a bottom bar.
 * Replace the brand, links and legal text with your own.
 */
export function Footer01() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            <a href="#" className="inline-flex items-center gap-2 font-semibold">
              <span aria-hidden="true" className="size-6 rounded-md bg-foreground" />
              Acme
            </a>
            <p className="max-w-xs text-sm text-muted-foreground">
              One sentence about your company. Keep it short and specific.
            </p>
          </div>

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

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Acme Inc. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link}>
                <a href="#" className="transition-colors hover:text-foreground">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
