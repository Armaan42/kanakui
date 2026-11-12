import { SaasLandingCta } from "./saas-landing-cta"
import { SaasLandingCustomers } from "./saas-landing-customers"
import { SaasLandingFaq } from "./saas-landing-faq"
import { SaasLandingFeatures } from "./saas-landing-features"
import { SaasLandingFooter } from "./saas-landing-footer"
import { SaasLandingHero } from "./saas-landing-hero"
import { SaasLandingLogos } from "./saas-landing-logos"
import { SaasLandingNavbar } from "./saas-landing-navbar"
import { SaasLandingPricing } from "./saas-landing-pricing"

/**
 * SaaS Landing: the full marketing site for Pulsewise, a made-up product
 * analytics company. Every section is its own file, so reorder or remove
 * them here and edit the copy in each file. Render it from `app/page.tsx`.
 */
export function SaasLanding() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <SaasLandingNavbar />
      <main className="flex-1">
        <SaasLandingHero />
        <SaasLandingLogos />
        <SaasLandingFeatures />
        <SaasLandingCustomers />
        <SaasLandingPricing />
        <SaasLandingFaq />
        <SaasLandingCta />
      </main>
      <SaasLandingFooter />
    </div>
  )
}
