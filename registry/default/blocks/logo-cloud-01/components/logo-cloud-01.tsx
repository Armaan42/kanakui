import { Marquee } from "@/registry/default/ui/marquee"

// Placeholder wordmarks. Replace them with logos of customers who agreed to be
// listed, e.g. <img src="/logos/x.svg" alt="X" className="h-6 w-auto" />.
const logos = ["Northwind", "Contoso", "Fabrikam", "Tailspin", "Woodgrove", "Litware", "Adventure Works", "Proseware"]

/** A heading and a slowly scrolling row of customer logos with faded edges. */
export function LogoCloud01() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-sm text-muted-foreground">Trusted by teams at</h2>
        <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
          <Marquee duration="35s" gap="3rem">
            {logos.map((logo) => (
              <span key={logo} className="text-lg font-semibold tracking-tight whitespace-nowrap text-muted-foreground/70">
                {logo}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
