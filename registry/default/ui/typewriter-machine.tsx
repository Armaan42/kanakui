"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface TypewriterMachineProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  defaultValue?: string
  /** Characters per line before the bell rings. */
  columns?: number
  onValueChange?: (text: string) => void
}

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]
const CH = 9.6

/**
 * A typewriter. Type on your keyboard or press the round keys: the carriage
 * slides along under the strike point, the bell rings near the end of a line
 * and Return feeds a new one. The paper is a real text field underneath.
 */
function TypewriterMachine({ defaultValue = "Dear reader,\n", columns = 30, onValueChange, className, ...props }: TypewriterMachineProps) {
  const [text, setText] = React.useState(defaultValue)
  const [struck, setStruck] = React.useState<{ key: string; at: number } | null>(null)
  const field = React.useRef<HTMLTextAreaElement>(null)
  const lines = text.split("\n")
  const column = lines.at(-1)?.length ?? 0
  const bell = column >= columns - 3

  const update = (next: string) => {
    // Wrap long lines like a carriage return would.
    const wrapped = next
      .split("\n")
      .flatMap((line) => (line.length > columns ? (line.match(new RegExp(`.{1,${columns}}`, "g")) ?? [line]) : [line]))
      .join("\n")
    setText(wrapped)
    onValueChange?.(wrapped)
  }

  const press = (key: string) => {
    setStruck((last) => ({ key, at: (last?.at ?? 0) + 1 }))
    if (key === "RETURN") update(`${text}\n`)
    else if (key === "SPACE") update(`${text} `)
    else if (key === "DELETE") update(text.slice(0, -1))
    else update(text + key.toLowerCase())
    field.current?.focus()
  }

  return (
    <div data-slot="typewriter-machine" className={cn("w-full max-w-md", className)} {...props}>
      {/* Paper and carriage */}
      <div className="relative mx-auto h-44 cursor-text overflow-hidden" onClick={() => field.current?.focus()}>
        <div
          className="absolute bottom-0 left-1/2 w-[19rem] transition-transform duration-100 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${-column * CH}px)` }}
        >
          <div className="min-h-44 rounded-t-sm bg-[#fdfcf7] px-3 pt-3 pb-6 font-mono text-[16px] leading-6 whitespace-pre text-neutral-900 shadow-[0_-4px_14px_-6px_rgb(0_0_0/0.25)] ring-1 ring-black/5">
            {lines.slice(-6).map((line, i, shown) => (
              <div key={`${lines.length - shown.length + i}`}>
                {line}
                {i === shown.length - 1 ? <span aria-hidden="true" className="inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-neutral-900" /> : null}
              </div>
            ))}
          </div>
        </div>
        <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-red-500" />
      </div>
      <textarea
        ref={field}
        aria-label="Typewriter paper"
        value={text}
        onChange={(event) => update(event.target.value)}
        // A typewriter only types at the end of the page.
        onSelect={(event) => {
          const end = event.currentTarget.value.length
          if (event.currentTarget.selectionStart !== end) event.currentTarget.setSelectionRange(end, end)
        }}
        onKeyDown={(event) => {
          const key = event.key.length === 1 ? event.key.toUpperCase() : event.key === "Enter" ? "RETURN" : event.key === " " ? "SPACE" : ""
          setStruck((last) => ({ key, at: (last?.at ?? 0) + 1 }))
        }}
        className="sr-only"
      />

      {/* Body and keys */}
      <div className="relative -mt-1 rounded-b-3xl rounded-t-lg bg-linear-to-b from-neutral-800 to-neutral-950 px-4 pt-4 pb-5 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.7)]">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-serif text-xs tracking-[0.3em] text-neutral-400 uppercase">Correspondent</span>
          <span aria-live="polite" className={cn("font-mono text-[10px] tabular-nums transition-colors", bell ? "text-amber-300" : "text-neutral-500")}>
            {bell ? "ding" : `${column}/${columns}`}
          </span>
        </div>
        <div className="space-y-1.5">
          {ROWS.map((row, r) => (
            <div key={row} className="flex justify-center gap-1.5" style={{ paddingLeft: r * 10 }}>
              {[...row].map((key) => (
                <Key key={key} label={key} struck={struck?.key === key ? struck.at : 0} onPress={() => press(key)} />
              ))}
              {r === 2 ? <Key label="DELETE" wide struck={0} onPress={() => press("DELETE")} /> : null}
            </div>
          ))}
          <div className="flex justify-center gap-1.5 pt-1">
            <Key label="SPACE" wide={3} struck={struck?.key === "SPACE" ? struck.at : 0} onPress={() => press("SPACE")} />
            <Key label="RETURN" wide struck={struck?.key === "RETURN" ? struck.at : 0} onPress={() => press("RETURN")} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Key({ label, wide, struck, onPress }: { label: string; wide?: boolean | number; struck: number; onPress: () => void }) {
  return (
    <button
      key={struck}
      type="button"
      tabIndex={-1}
      onClick={onPress}
      aria-label={label === "SPACE" ? "Space" : label === "RETURN" ? "Return" : label === "DELETE" ? "Delete" : label}
      className={cn(
        "grid h-7 place-items-center rounded-full bg-linear-to-b from-neutral-100 to-neutral-300 font-mono text-[10px] font-semibold text-neutral-800 shadow-[0_3px_0_#404040,inset_0_0_0_2px_#a3a3a3] outline-none transition-transform active:translate-y-[2px] active:shadow-[0_1px_0_#404040,inset_0_0_0_2px_#a3a3a3] motion-reduce:transition-none",
        wide ? (wide === 3 ? "w-40 rounded-md" : "w-14 rounded-md text-[8px]") : "w-7",
        struck > 0 && "animate-typewriter-machine-strike motion-reduce:animate-none"
      )}
    >
      {label === "SPACE" ? "" : label}
    </button>
  )
}

export { TypewriterMachine }
