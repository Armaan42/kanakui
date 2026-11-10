import { defineItem } from "../define.ts"

export default defineItem({
  name: "use-scene-state",
  type: "registry:hook",
  title: "useSceneState",
  description: "Theme color, on-screen state and reduced-motion preference for 3D scenes.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["hooks", "3d"],
  files: [{ path: "registry/default/hooks/use-scene-state.ts", type: "registry:hook" }],
})
