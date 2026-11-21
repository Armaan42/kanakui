import { Kbd, KbdCombo } from "@/registry/default/ui/kbd"

export const meta = {
  title: "Keyboard shortcuts sheet",
  description: "Keys and key combos in an app's keyboard shortcuts sheet, grouped by what they do.",
}

// The app is made up.
const GROUPS = [
  {
    title: "General",
    rows: [
      { keys: ["Ctrl", "K"], label: "Open the command menu" },
      { keys: ["Ctrl", "/"], label: "Show this sheet" },
      { keys: ["Esc"], label: "Close any panel" },
    ],
  },
  {
    title: "Tasks",
    rows: [
      { keys: ["C"], label: "Create a task" },
      { keys: ["E"], label: "Edit the selected task" },
      { keys: ["Shift", "D"], label: "Set a due date" },
      { keys: ["Ctrl", "Enter"], label: "Save and close" },
    ],
  },
  {
    title: "Moving around",
    rows: [
      { keys: ["G", "I"], label: "Go to inbox", sequence: true },
      { keys: ["G", "P"], label: "Go to projects", sequence: true },
      { keys: ["J"], label: "Next task" },
      { keys: ["K"], label: "Previous task" },
    ],
  },
]

export default function ShortcutsHelp() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 p-6">
      <section aria-labelledby="shortcuts" className="w-full max-w-2xl rounded-2xl border bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 id="shortcuts" className="text-lg font-semibold">
            Keyboard shortcuts
          </h1>
          <span className="text-sm text-muted-foreground">
            Press <Kbd>Esc</Kbd> to close
          </span>
        </div>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-medium text-muted-foreground">{group.title}</h2>
              <dl className="mt-2 divide-y">
                {group.rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-2 text-sm">
                    <dt>{row.label}</dt>
                    <dd className="flex shrink-0 items-center gap-1">
                      {row.sequence ? (
                        <>
                          <Kbd>{row.keys[0]}</Kbd>
                          <span className="text-xs text-muted-foreground">then</span>
                          <Kbd>{row.keys[1]}</Kbd>
                        </>
                      ) : (
                        <KbdCombo keys={row.keys} />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
