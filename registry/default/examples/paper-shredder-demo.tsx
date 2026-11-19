import { PaperShredder } from "@/registry/default/ui/paper-shredder"

export default function PaperShredderDemo() {
  return (
    <PaperShredder>
      <p className="font-semibold">Old drafts.docx</p>
      <p className="mt-2">Ideas we never shipped, a logo with a gradient and a tagline nobody liked.</p>
      <p className="mt-2">Notes from the meeting that could have been an email.</p>
    </PaperShredder>
  )
}
