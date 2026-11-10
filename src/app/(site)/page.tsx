import { HomeAgents } from "@/components/home/home-agents"
import { HomeBlocks } from "@/components/home/home-blocks"
import { HomeCategories } from "@/components/home/home-categories"
import { HomeCta } from "@/components/home/home-cta"
import { HomeDevice } from "@/components/home/home-device"
import { HomeFaq } from "@/components/home/home-faq"
import { HomeHero } from "@/components/home/home-hero"
import { HomeHowItWorks } from "@/components/home/home-how-it-works"
import { HomePlayground } from "@/components/home/home-playground"
import { HomeShowcase } from "@/components/home/home-showcase"
import { getItems, getItemsByCategory } from "@/lib/registry"

export default function HomePage() {
  const components = getItems("components").length
  const blocks = getItems("blocks").length
  const threeD = getItemsByCategory("components", "3d").length

  return (
    <>
      <HomeHero components={components} blocks={blocks} threeD={threeD} />
      <HomeDevice />
      <HomeAgents />
      <HomeBlocks />
      <HomeShowcase />
      <HomePlayground />
      <HomeCategories />
      <HomeHowItWorks />
      <HomeFaq />
      <HomeCta />
    </>
  )
}
