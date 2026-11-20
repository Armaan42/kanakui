import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TagInput } from "@/registry/default/ui/tag-input"

export const meta = {
  title: "Job posting form",
  description: "The tag input for skills in a job posting form, alongside ordinary fields and a cap of eight tags.",
}

// The company and role are made up.
export default function JobPost() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Copperleaf · Careers</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Post a job</h1>
      <form className="mt-8 grid gap-5" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-1.5 text-sm font-medium">
          Job title
          <Input defaultValue="Senior frontend engineer" />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium">
            Location
            <Input defaultValue="Lisbon or remote (EU)" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Salary range
            <Input defaultValue="€70,000 – €90,000" />
          </label>
        </div>
        <TagInput label="Skills" max={8} defaultValue={["React", "TypeScript", "Accessibility", "Design systems"]} placeholder="Add a skill and press Enter" />
        <label className="grid gap-1.5 text-sm font-medium">
          About the role
          <textarea
            rows={4}
            defaultValue="You'll own the checkout and account pages used by 40,000 shops, working with two designers and a product manager."
            className="rounded-md border bg-transparent px-3 py-2 text-sm font-normal outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost">
            Save draft
          </Button>
          <Button type="submit">Publish job</Button>
        </div>
      </form>
    </div>
  )
}
