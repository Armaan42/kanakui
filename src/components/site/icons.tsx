import type * as React from "react"

/** Site mark: four tiles, one raised, i.e. a component lifted out of a grid. */
export function LogoMark(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <rect x="1" y="1" width="8" height="8" rx="2" className="fill-foreground" />
      <rect x="11" y="1" width="8" height="8" rx="2" className="fill-foreground/35" />
      <rect x="1" y="11" width="8" height="8" rx="2" className="fill-foreground/35" />
      <rect x="11" y="11" width="8" height="8" rx="2" className="fill-foreground/35" />
    </svg>
  )
}

/** Google's "G" mark in its four brand colors, as Google's sign-in branding guidelines ask for. */
export function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.73Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3a7.2 7.2 0 0 1-10.72-3.78H1.34v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.34 14.32a7.2 7.2 0 0 1 0-4.64v-3.1H1.34a12 12 0 0 0 0 10.84l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.34 6.58l4 3.1A7.15 7.15 0 0 1 12 4.77Z" />
    </svg>
  )
}
