import { TagInput } from "@/registry/default/ui/tag-input"

export default function TagInputDemo() {
  return <TagInput label="Skills" defaultValue={["React", "TypeScript"]} max={6} className="max-w-sm" />
}
