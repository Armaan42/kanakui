import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/registry/default/ui/progress-ring"

export const meta = {
  title: "Learning dashboard",
  description: "Progress rings showing how far a learner is through each course on a learning dashboard.",
}

// The school, courses and progress are made up.
const COURSES = [
  { title: "Spanish for travellers", lesson: "Lesson 14 · Ordering food", done: 14, total: 20 },
  { title: "Watercolour basics", lesson: "Lesson 3 · Wet on wet", done: 3, total: 12 },
  { title: "Personal finance", lesson: "Finished", done: 8, total: 8 },
]

export default function CourseProgress() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Kestrel Learning</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Your courses</h1>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {COURSES.map((course) => {
          const percent = Math.round((course.done / course.total) * 100)
          return (
            <li key={course.title} className="flex flex-col items-center rounded-xl border bg-card p-6 text-center">
              <ProgressRing value={course.done} max={course.total} label={`${course.title}: ${percent}% complete`}>
                <span className="text-lg font-semibold tabular-nums">{percent}%</span>
              </ProgressRing>
              <h2 className="mt-4 font-medium">{course.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{course.lesson}</p>
              <Button variant={percent === 100 ? "outline" : "default"} size="sm" className="mt-4">
                {percent === 100 ? "Get certificate" : "Continue"}
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
