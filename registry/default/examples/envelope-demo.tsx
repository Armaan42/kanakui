import { Envelope } from "@/registry/default/ui/envelope"

export default function EnvelopeDemo() {
  return (
    <Envelope label="Invitation from Maya and Theo" to="For Priya" className="w-[min(22rem,calc(100vw-3rem))]">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-rose-700 uppercase">You’re invited</p>
      <p className="mt-2 font-serif text-xl leading-tight">Maya &amp; Theo are getting married</p>
      <p className="mt-2 text-xs leading-5 text-neutral-600">
        Saturday 12 September, 4 pm, at the old boathouse by the lake. Dinner and dancing after.
      </p>
      <a href="#" className="mt-3 inline-block text-xs font-semibold text-rose-700 underline underline-offset-4">
        RSVP by 1 August
      </a>
    </Envelope>
  )
}
