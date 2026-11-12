import type { Metadata } from "next"
import Link from "next/link"

import { CodeViewer } from "@/components/site/code-viewer"
import { DocsArticle } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { themeVars } from "@/config/themes"
import { getSnippet } from "@/lib/source"

const HREF = "/docs/theming"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

const p = "text-sm leading-6 text-muted-foreground"

export default async function ThemingPage() {
  const violet = themeVars({ base: "zinc", accent: "violet", radius: "0.625" })
  const excerpt = await getSnippet(
    [
      ":root {",
      `  --primary: ${violet.light.primary};`,
      `  --primary-foreground: ${violet.light["primary-foreground"]};`,
      `  --radius: ${violet.light.radius};`,
      "  /* …the other variables */",
      "}",
      "",
      ".dark {",
      `  --primary: ${violet.dark.primary};`,
      `  --primary-foreground: ${violet.dark["primary-foreground"]};`,
      "  /* …the other variables */",
      "}",
    ].join("\n"),
    "css",
    "globals.css (excerpt)"
  )

  return (
    <DocsArticle href={HREF}>
      <DocsSection id="how-it-works" title="How theming works">
        <p className={p}>
          <InlineText text="kanakui components use the same CSS variables as shadcn/ui: `--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--radius` and the rest, defined in your `globals.css`. Change the variables and every component follows, in light and dark." />
        </p>
        <p className={p}>
          <InlineText text="Selected and active states (switches that are on, the current step, progress bars, the active tab) use `--primary`. With shadcn’s default palettes, primary is almost the same as the text color, so components look neutral until you pick an accent." />
        </p>
      </DocsSection>

      <DocsSection id="pick-a-theme" title="Pick a theme">
        <p className={p}>
          Open the <Link href="/themes" className="font-medium text-foreground underline underline-offset-4">theme page</Link>{" "}
          (or the palette button in the header), choose a base color, an accent and a radius, and watch every component
          and block on this site change. Then use <strong className="font-medium text-foreground">Copy CSS</strong>.
        </p>
        <p className={p}>
          <InlineText text="Replace the `:root` and `.dark` blocks in your `globals.css` with what you copied. For example, Zinc with a violet accent starts like this:" />
        </p>
        <CodeViewer files={[excerpt]} label="globals.css (excerpt)" />
      </DocsSection>

      <DocsSection id="dark-mode" title="Dark mode">
        <p className={p}>
          <InlineText text="Dark mode is the `.dark` class, as in shadcn’s default setup: put it on `<html>` and the dark variables apply. Some blocks wrap themselves in `.dark` so they stay dark in both themes, which also relies on the class-based setup." />
        </p>
      </DocsSection>

      <DocsSection id="3d" title="3D components">
        <p className={p}>
          <InlineText text="WebGL components such as Dotted Globe and Arc Globe draw in the CSS text color, read when they mount and again when the theme class on `<html>` changes. Tint them with a text class like `text-primary`. Colors passed as props go to three.js, which reads hex, `rgb()` and `hsl()` but not `oklch()`." />
        </p>
      </DocsSection>
    </DocsArticle>
  )
}
