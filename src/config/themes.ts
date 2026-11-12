/**
 * Site themes: base colors (shadcn's official palettes, from
 * ui.shadcn.com/r/colors/<name>.json), accent colors and corner radius.
 *
 * One source of truth for three things:
 * - src/styles/themes.css, generated from this file by `node scripts/themes.mts`
 * - the theme picker (header and /themes), which sets data attributes on <html>
 * - "Copy CSS", which turns the chosen theme into a globals.css block
 */

export type ThemeVars = Record<string, string>

export const BASE_COLORS = {
  neutral: {
    label: "Neutral",
    light: {"background":"oklch(1 0 0)","foreground":"oklch(0.145 0 0)","card":"oklch(1 0 0)","card-foreground":"oklch(0.145 0 0)","popover":"oklch(1 0 0)","popover-foreground":"oklch(0.145 0 0)","primary":"oklch(0.205 0 0)","primary-foreground":"oklch(0.985 0 0)","secondary":"oklch(0.97 0 0)","secondary-foreground":"oklch(0.205 0 0)","muted":"oklch(0.97 0 0)","muted-foreground":"oklch(0.556 0 0)","accent":"oklch(0.97 0 0)","accent-foreground":"oklch(0.205 0 0)","destructive":"oklch(0.577 0.245 27.325)","border":"oklch(0.922 0 0)","input":"oklch(0.922 0 0)","ring":"oklch(0.708 0 0)","chart-1":"oklch(0.87 0 0)","chart-2":"oklch(0.556 0 0)","chart-3":"oklch(0.439 0 0)","chart-4":"oklch(0.371 0 0)","chart-5":"oklch(0.269 0 0)","sidebar":"oklch(0.985 0 0)","sidebar-foreground":"oklch(0.145 0 0)","sidebar-primary":"oklch(0.205 0 0)","sidebar-primary-foreground":"oklch(0.985 0 0)","sidebar-accent":"oklch(0.97 0 0)","sidebar-accent-foreground":"oklch(0.205 0 0)","sidebar-border":"oklch(0.922 0 0)","sidebar-ring":"oklch(0.708 0 0)"},
    dark: {"background":"oklch(0.145 0 0)","foreground":"oklch(0.985 0 0)","card":"oklch(0.205 0 0)","card-foreground":"oklch(0.985 0 0)","popover":"oklch(0.205 0 0)","popover-foreground":"oklch(0.985 0 0)","primary":"oklch(0.922 0 0)","primary-foreground":"oklch(0.205 0 0)","secondary":"oklch(0.269 0 0)","secondary-foreground":"oklch(0.985 0 0)","muted":"oklch(0.269 0 0)","muted-foreground":"oklch(0.708 0 0)","accent":"oklch(0.269 0 0)","accent-foreground":"oklch(0.985 0 0)","destructive":"oklch(0.704 0.191 22.216)","border":"oklch(1 0 0 / 10%)","input":"oklch(1 0 0 / 15%)","ring":"oklch(0.556 0 0)","chart-1":"oklch(0.87 0 0)","chart-2":"oklch(0.556 0 0)","chart-3":"oklch(0.439 0 0)","chart-4":"oklch(0.371 0 0)","chart-5":"oklch(0.269 0 0)","sidebar":"oklch(0.205 0 0)","sidebar-foreground":"oklch(0.985 0 0)","sidebar-primary":"oklch(0.488 0.243 264.376)","sidebar-primary-foreground":"oklch(0.985 0 0)","sidebar-accent":"oklch(0.269 0 0)","sidebar-accent-foreground":"oklch(0.985 0 0)","sidebar-border":"oklch(1 0 0 / 10%)","sidebar-ring":"oklch(0.556 0 0)"},
  },
  zinc: {
    label: "Zinc",
    light: {"background":"oklch(1 0 0)","foreground":"oklch(0.141 0.005 285.823)","card":"oklch(1 0 0)","card-foreground":"oklch(0.141 0.005 285.823)","popover":"oklch(1 0 0)","popover-foreground":"oklch(0.141 0.005 285.823)","primary":"oklch(0.21 0.006 285.885)","primary-foreground":"oklch(0.985 0 0)","secondary":"oklch(0.967 0.001 286.375)","secondary-foreground":"oklch(0.21 0.006 285.885)","muted":"oklch(0.967 0.001 286.375)","muted-foreground":"oklch(0.552 0.016 285.938)","accent":"oklch(0.967 0.001 286.375)","accent-foreground":"oklch(0.21 0.006 285.885)","destructive":"oklch(0.577 0.245 27.325)","border":"oklch(0.92 0.004 286.32)","input":"oklch(0.92 0.004 286.32)","ring":"oklch(0.705 0.015 286.067)","chart-1":"oklch(0.871 0.006 286.286)","chart-2":"oklch(0.552 0.016 285.938)","chart-3":"oklch(0.442 0.017 285.786)","chart-4":"oklch(0.37 0.013 285.805)","chart-5":"oklch(0.274 0.006 286.033)","sidebar":"oklch(0.985 0 0)","sidebar-foreground":"oklch(0.141 0.005 285.823)","sidebar-primary":"oklch(0.21 0.006 285.885)","sidebar-primary-foreground":"oklch(0.985 0 0)","sidebar-accent":"oklch(0.967 0.001 286.375)","sidebar-accent-foreground":"oklch(0.21 0.006 285.885)","sidebar-border":"oklch(0.92 0.004 286.32)","sidebar-ring":"oklch(0.705 0.015 286.067)"},
    dark: {"background":"oklch(0.141 0.005 285.823)","foreground":"oklch(0.985 0 0)","card":"oklch(0.21 0.006 285.885)","card-foreground":"oklch(0.985 0 0)","popover":"oklch(0.21 0.006 285.885)","popover-foreground":"oklch(0.985 0 0)","primary":"oklch(0.92 0.004 286.32)","primary-foreground":"oklch(0.21 0.006 285.885)","secondary":"oklch(0.274 0.006 286.033)","secondary-foreground":"oklch(0.985 0 0)","muted":"oklch(0.274 0.006 286.033)","muted-foreground":"oklch(0.705 0.015 286.067)","accent":"oklch(0.274 0.006 286.033)","accent-foreground":"oklch(0.985 0 0)","destructive":"oklch(0.704 0.191 22.216)","border":"oklch(1 0 0 / 10%)","input":"oklch(1 0 0 / 15%)","ring":"oklch(0.552 0.016 285.938)","chart-1":"oklch(0.871 0.006 286.286)","chart-2":"oklch(0.552 0.016 285.938)","chart-3":"oklch(0.442 0.017 285.786)","chart-4":"oklch(0.37 0.013 285.805)","chart-5":"oklch(0.274 0.006 286.033)","sidebar":"oklch(0.21 0.006 285.885)","sidebar-foreground":"oklch(0.985 0 0)","sidebar-primary":"oklch(0.488 0.243 264.376)","sidebar-primary-foreground":"oklch(0.985 0 0)","sidebar-accent":"oklch(0.274 0.006 286.033)","sidebar-accent-foreground":"oklch(0.985 0 0)","sidebar-border":"oklch(1 0 0 / 10%)","sidebar-ring":"oklch(0.552 0.016 285.938)"},
  },
  slate: {
    label: "Slate",
    light: {"background":"oklch(1 0 0)","foreground":"oklch(0.129 0.042 264.695)","card":"oklch(1 0 0)","card-foreground":"oklch(0.129 0.042 264.695)","popover":"oklch(1 0 0)","popover-foreground":"oklch(0.129 0.042 264.695)","primary":"oklch(0.208 0.042 265.755)","primary-foreground":"oklch(0.984 0.003 247.858)","secondary":"oklch(0.968 0.007 247.896)","secondary-foreground":"oklch(0.208 0.042 265.755)","muted":"oklch(0.968 0.007 247.896)","muted-foreground":"oklch(0.554 0.046 257.417)","accent":"oklch(0.968 0.007 247.896)","accent-foreground":"oklch(0.208 0.042 265.755)","destructive":"oklch(0.577 0.245 27.325)","border":"oklch(0.929 0.013 255.508)","input":"oklch(0.929 0.013 255.508)","ring":"oklch(0.704 0.04 256.788)","chart-1":"oklch(0.646 0.222 41.116)","chart-2":"oklch(0.6 0.118 184.704)","chart-3":"oklch(0.398 0.07 227.392)","chart-4":"oklch(0.828 0.189 84.429)","chart-5":"oklch(0.769 0.188 70.08)","sidebar":"oklch(0.984 0.003 247.858)","sidebar-foreground":"oklch(0.129 0.042 264.695)","sidebar-primary":"oklch(0.208 0.042 265.755)","sidebar-primary-foreground":"oklch(0.984 0.003 247.858)","sidebar-accent":"oklch(0.968 0.007 247.896)","sidebar-accent-foreground":"oklch(0.208 0.042 265.755)","sidebar-border":"oklch(0.929 0.013 255.508)","sidebar-ring":"oklch(0.704 0.04 256.788)"},
    dark: {"background":"oklch(0.129 0.042 264.695)","foreground":"oklch(0.984 0.003 247.858)","card":"oklch(0.208 0.042 265.755)","card-foreground":"oklch(0.984 0.003 247.858)","popover":"oklch(0.208 0.042 265.755)","popover-foreground":"oklch(0.984 0.003 247.858)","primary":"oklch(0.929 0.013 255.508)","primary-foreground":"oklch(0.208 0.042 265.755)","secondary":"oklch(0.279 0.041 260.031)","secondary-foreground":"oklch(0.984 0.003 247.858)","muted":"oklch(0.279 0.041 260.031)","muted-foreground":"oklch(0.704 0.04 256.788)","accent":"oklch(0.279 0.041 260.031)","accent-foreground":"oklch(0.984 0.003 247.858)","destructive":"oklch(0.704 0.191 22.216)","border":"oklch(1 0 0 / 10%)","input":"oklch(1 0 0 / 15%)","ring":"oklch(0.551 0.027 264.364)","chart-1":"oklch(0.488 0.243 264.376)","chart-2":"oklch(0.696 0.17 162.48)","chart-3":"oklch(0.769 0.188 70.08)","chart-4":"oklch(0.627 0.265 303.9)","chart-5":"oklch(0.645 0.246 16.439)","sidebar":"oklch(0.208 0.042 265.755)","sidebar-foreground":"oklch(0.984 0.003 247.858)","sidebar-primary":"oklch(0.488 0.243 264.376)","sidebar-primary-foreground":"oklch(0.984 0.003 247.858)","sidebar-accent":"oklch(0.279 0.041 260.031)","sidebar-accent-foreground":"oklch(0.984 0.003 247.858)","sidebar-border":"oklch(1 0 0 / 10%)","sidebar-ring":"oklch(0.551 0.027 264.364)"},
  },
  stone: {
    label: "Stone",
    light: {"background":"oklch(1 0 0)","foreground":"oklch(0.147 0.004 49.25)","card":"oklch(1 0 0)","card-foreground":"oklch(0.147 0.004 49.25)","popover":"oklch(1 0 0)","popover-foreground":"oklch(0.147 0.004 49.25)","primary":"oklch(0.216 0.006 56.043)","primary-foreground":"oklch(0.985 0.001 106.423)","secondary":"oklch(0.97 0.001 106.424)","secondary-foreground":"oklch(0.216 0.006 56.043)","muted":"oklch(0.97 0.001 106.424)","muted-foreground":"oklch(0.553 0.013 58.071)","accent":"oklch(0.97 0.001 106.424)","accent-foreground":"oklch(0.216 0.006 56.043)","destructive":"oklch(0.577 0.245 27.325)","border":"oklch(0.923 0.003 48.717)","input":"oklch(0.923 0.003 48.717)","ring":"oklch(0.709 0.01 56.259)","chart-1":"oklch(0.869 0.005 56.366)","chart-2":"oklch(0.553 0.013 58.071)","chart-3":"oklch(0.444 0.011 73.639)","chart-4":"oklch(0.374 0.01 67.558)","chart-5":"oklch(0.268 0.007 34.298)","sidebar":"oklch(0.985 0.001 106.423)","sidebar-foreground":"oklch(0.147 0.004 49.25)","sidebar-primary":"oklch(0.216 0.006 56.043)","sidebar-primary-foreground":"oklch(0.985 0.001 106.423)","sidebar-accent":"oklch(0.97 0.001 106.424)","sidebar-accent-foreground":"oklch(0.216 0.006 56.043)","sidebar-border":"oklch(0.923 0.003 48.717)","sidebar-ring":"oklch(0.709 0.01 56.259)"},
    dark: {"background":"oklch(0.147 0.004 49.25)","foreground":"oklch(0.985 0.001 106.423)","card":"oklch(0.216 0.006 56.043)","card-foreground":"oklch(0.985 0.001 106.423)","popover":"oklch(0.216 0.006 56.043)","popover-foreground":"oklch(0.985 0.001 106.423)","primary":"oklch(0.923 0.003 48.717)","primary-foreground":"oklch(0.216 0.006 56.043)","secondary":"oklch(0.268 0.007 34.298)","secondary-foreground":"oklch(0.985 0.001 106.423)","muted":"oklch(0.268 0.007 34.298)","muted-foreground":"oklch(0.709 0.01 56.259)","accent":"oklch(0.268 0.007 34.298)","accent-foreground":"oklch(0.985 0.001 106.423)","destructive":"oklch(0.704 0.191 22.216)","border":"oklch(1 0 0 / 10%)","input":"oklch(1 0 0 / 15%)","ring":"oklch(0.553 0.013 58.071)","chart-1":"oklch(0.869 0.005 56.366)","chart-2":"oklch(0.553 0.013 58.071)","chart-3":"oklch(0.444 0.011 73.639)","chart-4":"oklch(0.374 0.01 67.558)","chart-5":"oklch(0.268 0.007 34.298)","sidebar":"oklch(0.216 0.006 56.043)","sidebar-foreground":"oklch(0.985 0.001 106.423)","sidebar-primary":"oklch(0.488 0.243 264.376)","sidebar-primary-foreground":"oklch(0.985 0.001 106.423)","sidebar-accent":"oklch(0.268 0.007 34.298)","sidebar-accent-foreground":"oklch(0.985 0.001 106.423)","sidebar-border":"oklch(1 0 0 / 10%)","sidebar-ring":"oklch(0.553 0.013 58.071)"},
  },
  gray: {
    label: "Gray",
    light: {"background":"oklch(1 0 0)","foreground":"oklch(0.13 0.028 261.692)","card":"oklch(1 0 0)","card-foreground":"oklch(0.13 0.028 261.692)","popover":"oklch(1 0 0)","popover-foreground":"oklch(0.13 0.028 261.692)","primary":"oklch(0.21 0.034 264.665)","primary-foreground":"oklch(0.985 0.002 247.839)","secondary":"oklch(0.967 0.003 264.542)","secondary-foreground":"oklch(0.21 0.034 264.665)","muted":"oklch(0.967 0.003 264.542)","muted-foreground":"oklch(0.551 0.027 264.364)","accent":"oklch(0.967 0.003 264.542)","accent-foreground":"oklch(0.21 0.034 264.665)","destructive":"oklch(0.577 0.245 27.325)","border":"oklch(0.928 0.006 264.531)","input":"oklch(0.928 0.006 264.531)","ring":"oklch(0.707 0.022 261.325)","chart-1":"oklch(0.646 0.222 41.116)","chart-2":"oklch(0.6 0.118 184.704)","chart-3":"oklch(0.398 0.07 227.392)","chart-4":"oklch(0.828 0.189 84.429)","chart-5":"oklch(0.769 0.188 70.08)","sidebar":"oklch(0.985 0.002 247.839)","sidebar-foreground":"oklch(0.13 0.028 261.692)","sidebar-primary":"oklch(0.21 0.034 264.665)","sidebar-primary-foreground":"oklch(0.985 0.002 247.839)","sidebar-accent":"oklch(0.967 0.003 264.542)","sidebar-accent-foreground":"oklch(0.21 0.034 264.665)","sidebar-border":"oklch(0.928 0.006 264.531)","sidebar-ring":"oklch(0.707 0.022 261.325)"},
    dark: {"background":"oklch(0.13 0.028 261.692)","foreground":"oklch(0.985 0.002 247.839)","card":"oklch(0.21 0.034 264.665)","card-foreground":"oklch(0.985 0.002 247.839)","popover":"oklch(0.21 0.034 264.665)","popover-foreground":"oklch(0.985 0.002 247.839)","primary":"oklch(0.928 0.006 264.531)","primary-foreground":"oklch(0.21 0.034 264.665)","secondary":"oklch(0.278 0.033 256.848)","secondary-foreground":"oklch(0.985 0.002 247.839)","muted":"oklch(0.278 0.033 256.848)","muted-foreground":"oklch(0.707 0.022 261.325)","accent":"oklch(0.278 0.033 256.848)","accent-foreground":"oklch(0.985 0.002 247.839)","destructive":"oklch(0.704 0.191 22.216)","border":"oklch(1 0 0 / 10%)","input":"oklch(1 0 0 / 15%)","ring":"oklch(0.551 0.027 264.364)","chart-1":"oklch(0.488 0.243 264.376)","chart-2":"oklch(0.696 0.17 162.48)","chart-3":"oklch(0.769 0.188 70.08)","chart-4":"oklch(0.627 0.265 303.9)","chart-5":"oklch(0.645 0.246 16.439)","sidebar":"oklch(0.21 0.034 264.665)","sidebar-foreground":"oklch(0.985 0.002 247.839)","sidebar-primary":"oklch(0.488 0.243 264.376)","sidebar-primary-foreground":"oklch(0.985 0.002 247.839)","sidebar-accent":"oklch(0.278 0.033 256.848)","sidebar-accent-foreground":"oklch(0.985 0.002 247.839)","sidebar-border":"oklch(1 0 0 / 10%)","sidebar-ring":"oklch(0.551 0.027 264.364)"},
  },
} satisfies Record<string, { label: string; light: ThemeVars; dark: ThemeVars }>

export type BaseColor = keyof typeof BASE_COLORS

/** Accent colors override the primary color and focus ring. Light mode uses a deeper shade with white text; dark mode a lighter shade with dark text. */
export const ACCENTS = {
  default: { label: "Default", light: {}, dark: {} },
  violet: {
    label: "Violet",
    light: { primary: "oklch(0.541 0.281 293.009)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.702 0.183 293.541)" },
    dark: { primary: "oklch(0.702 0.183 293.541)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.541 0.281 293.009)" },
  },
  blue: {
    label: "Blue",
    light: { primary: "oklch(0.546 0.245 262.881)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.707 0.165 254.624)" },
    dark: { primary: "oklch(0.707 0.165 254.624)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.546 0.245 262.881)" },
  },
  teal: {
    label: "Teal",
    light: { primary: "oklch(0.511 0.096 186.391)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.777 0.152 181.912)" },
    dark: { primary: "oklch(0.777 0.152 181.912)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.511 0.096 186.391)" },
  },
  green: {
    label: "Green",
    light: { primary: "oklch(0.527 0.154 150.069)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.792 0.209 151.711)" },
    dark: { primary: "oklch(0.792 0.209 151.711)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.527 0.154 150.069)" },
  },
  amber: {
    label: "Amber",
    light: { primary: "oklch(0.555 0.163 48.998)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.828 0.189 84.429)" },
    dark: { primary: "oklch(0.828 0.189 84.429)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.555 0.163 48.998)" },
  },
  orange: {
    label: "Orange",
    light: { primary: "oklch(0.553 0.195 38.402)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.75 0.183 55.934)" },
    dark: { primary: "oklch(0.75 0.183 55.934)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.553 0.195 38.402)" },
  },
  rose: {
    label: "Rose",
    light: { primary: "oklch(0.586 0.253 17.585)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.712 0.194 13.428)" },
    dark: { primary: "oklch(0.712 0.194 13.428)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.586 0.253 17.585)" },
  },
} satisfies Record<string, { label: string; light: ThemeVars; dark: ThemeVars }>

export type Accent = keyof typeof ACCENTS

export const RADII = ["0", "0.3", "0.5", "0.625", "1"] as const
export type Radius = (typeof RADII)[number]

export interface ThemeConfig {
  base: BaseColor
  accent: Accent
  radius: Radius
}

export const DEFAULT_THEME: ThemeConfig = { base: "neutral", accent: "default", radius: "0.625" }

/** localStorage key for the chosen theme (JSON). The light/dark mode has its own key in lib/theme. */
export const THEME_CONFIG_STORAGE_KEY = "kanakui-theme"

/** Keeps only known values, falling back to the defaults. */
export function parseThemeConfig(value: unknown): ThemeConfig {
  const v = (value && typeof value === "object" ? value : {}) as Partial<Record<keyof ThemeConfig, unknown>>
  return {
    base: typeof v.base === "string" && v.base in BASE_COLORS ? (v.base as BaseColor) : DEFAULT_THEME.base,
    accent: typeof v.accent === "string" && v.accent in ACCENTS ? (v.accent as Accent) : DEFAULT_THEME.accent,
    radius: RADII.includes(v.radius as Radius) ? (v.radius as Radius) : DEFAULT_THEME.radius,
  }
}

/** The CSS variables for a theme, light and dark. */
export function themeVars(config: ThemeConfig): { light: ThemeVars; dark: ThemeVars } {
  const base = BASE_COLORS[config.base]
  const accent = ACCENTS[config.accent]
  const light: ThemeVars = { ...base.light, ...accent.light, radius: `${config.radius}rem` }
  const dark: ThemeVars = { ...base.dark, ...accent.dark }
  if (config.accent !== "default") {
    for (const [mode, vars] of [["light", light], ["dark", dark]] as const) {
      vars["sidebar-primary"] = ACCENTS[config.accent][mode].primary
      vars["sidebar-primary-foreground"] = ACCENTS[config.accent][mode]["primary-foreground"]
      vars["sidebar-ring"] = ACCENTS[config.accent][mode].ring
    }
  }
  return { light, dark }
}

/** The theme as a block to paste into globals.css (replacing :root and .dark). */
export function themeCss(config: ThemeConfig): string {
  const { light, dark } = themeVars(config)
  const block = (selector: string, vars: ThemeVars) =>
    `${selector} {\n${Object.entries(vars)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n")}\n}`
  return `${block(":root", light)}\n\n${block(".dark", dark)}\n`
}
