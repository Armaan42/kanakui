import { Marquee } from "@/registry/default/ui/marquee"

const stack = ["Dark mode", "Keyboard friendly", "Screen reader tested", "Responsive", "Typed props", "Themeable", "Reduced motion", "Copy and own"]

export default function MarqueeDemo() {
  return (
    <div className="w-full max-w-xl space-y-3 [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
      <Marquee pauseOnHover duration="30s">
        {stack.map((item) => (
          <span key={item} className="rounded-md border bg-card px-3 py-1.5 text-sm whitespace-nowrap">
            {item}
          </span>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover duration="30s">
        {stack.map((item) => (
          <span key={item} className="rounded-md border bg-card px-3 py-1.5 text-sm whitespace-nowrap text-muted-foreground">
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
