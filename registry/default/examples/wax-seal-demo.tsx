import { WaxSeal } from "@/registry/default/ui/wax-seal"

export default function WaxSealDemo() {
  return (
    <WaxSeal initials="IK">
      <p>Dear Maya,</p>
      <p className="mt-2">You’re invited to our wedding on the 14th of June, at the old boathouse by the river. Dinner and dancing after.</p>
      <p className="mt-2">With love, Ines and Kai</p>
    </WaxSeal>
  )
}
