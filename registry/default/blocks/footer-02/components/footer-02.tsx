const links = ["About", "Blog", "Careers", "Privacy", "Terms"]
const social = [
  { label: "Newsletter", href: "#" },
  { label: "Community", href: "#" },
  { label: "RSS", href: "#" },
]

/** A compact centered footer: brand, one row of links, secondary links and the copyright line. */
export function Footer02() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6">
        <a href="#" className="inline-flex items-center gap-2 font-semibold">
          <span aria-hidden="true" className="size-6 rounded-md bg-foreground" />
          Halcyon
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={link}>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul aria-label="Elsewhere" className="flex gap-4 text-sm">
          {social.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">© 2026 Halcyon Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
