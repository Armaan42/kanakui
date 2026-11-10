/** Plan data for Pricing01. Edit names, prices and features here. */
export interface PricingPlan {
  id: string
  name: string
  description: string
  /** Price per month when billed monthly. */
  monthly: number
  /** Price per month when billed yearly. */
  yearly: number
  features: string[]
  cta: string
  highlighted?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "hobby",
    name: "Hobby",
    description: "For side projects and trying things out.",
    monthly: 0,
    yearly: 0,
    features: ["1 project", "Community support", "Basic analytics"],
    cta: "Get started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals shipping real products.",
    monthly: 24,
    yearly: 19,
    features: ["Unlimited projects", "Email support", "Advanced analytics", "Custom domains"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For teams that need to collaborate.",
    monthly: 79,
    yearly: 64,
    features: ["Everything in Pro", "Up to 10 members", "Roles and permissions", "Priority support"],
    cta: "Contact sales",
  },
]
