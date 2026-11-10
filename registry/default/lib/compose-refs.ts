import type * as React from "react"

type PossibleRef<T> = React.Ref<T> | undefined

function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === "function") {
    return ref(value)
  }
  if (ref) {
    ref.current = value
  }
}

/**
 * Combines several refs (callback refs or ref objects) into one callback ref.
 * Supports React 19 callback-ref cleanup functions.
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node) => {
    const cleanups = refs.map((ref) => setRef(ref, node))

    return () => {
      cleanups.forEach((cleanup, index) => {
        if (typeof cleanup === "function") {
          cleanup()
        } else {
          setRef(refs[index], null)
        }
      })
    }
  }
}
