// Placeholder wordmarks. Replace with logos of customers who agreed to be listed,
// e.g. <img src="/logos/x.svg" alt="X" className="h-7 w-auto" />.
const logos = ["Northwind", "Contoso", "Fabrikam", "Tailspin", "Woodgrove", "Litware", "Proseware", "Wingtip"]

/** A static grid of customer logos with hairline dividers: two columns on phones, four on desktops. */
export function LogoCloud02() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-sm text-muted-foreground">Powering teams of every size</h2>
        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-4">
          {logos.map((logo) => (
            <li key={logo} className="flex h-24 items-center justify-center bg-background">
              <span className="text-lg font-semibold tracking-tight text-muted-foreground/80">{logo}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
