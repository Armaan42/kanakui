import { Banner01 } from "@/registry/default/blocks/banner-01/components/banner-01"
import { Navbar02 } from "@/registry/default/blocks/navbar-02/components/navbar-02"
import { Hero09 } from "@/registry/default/blocks/hero-09/components/hero-09"
import { LogoCloud02 } from "@/registry/default/blocks/logo-cloud-02/components/logo-cloud-02"
import { Features06 } from "@/registry/default/blocks/features-06/components/features-06"
import { Bento01 } from "@/registry/default/blocks/bento-01/components/bento-01"
import { Testimonials02 } from "@/registry/default/blocks/testimonials-02/components/testimonials-02"
import { Pricing03 } from "@/registry/default/blocks/pricing-03/components/pricing-03"
import { Faq02 } from "@/registry/default/blocks/faq-02/components/faq-02"
import { Cta05 } from "@/registry/default/blocks/cta-05/components/cta-05"
import { Footer03 } from "@/registry/default/blocks/footer-03/components/footer-03"

/**
 * AI Startup template: a full page assembled from kanakui blocks.
 * Each section is its own file in your project, so reorder, remove or edit
 * them freely. Render it from a page, e.g. `app/page.tsx`.
 */
export function AiStartup() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Banner01 />
      <Navbar02 />
      <main className="flex-1">
        <Hero09 />
        <LogoCloud02 />
        <Features06 />
        <Bento01 />
        <Testimonials02 />
        <Pricing03 />
        <Faq02 />
        <Cta05 />
      </main>
      <Footer03 />
    </div>
  )
}
