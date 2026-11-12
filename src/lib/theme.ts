import { ACCENTS, BASE_COLORS, DEFAULT_THEME, RADII, THEME_CONFIG_STORAGE_KEY } from "@/config/themes"

export const THEME_STORAGE_KEY = "theme"

/**
 * Runs in <head> before the first paint, so there's no flash of the wrong theme.
 *
 * Light/dark: the server always renders dark (the default). Light is applied when
 * - the URL has ?theme=light (used by preview iframes to force a theme), or
 * - the visitor chose light earlier (localStorage).
 * ?theme=dark forces dark regardless of the stored choice.
 *
 * Theme (base color, accent, radius): read from localStorage and set as
 * data-base, data-accent and data-radius on <html>; src/styles/themes.css
 * does the rest. Unknown values fall back to the defaults.
 * See Next.js "Preventing flash before hydration": Themes.
 */
export const themeScript = `(function(){try{var d=document.documentElement;var q=new URLSearchParams(location.search).get("theme");var t=q==="light"||q==="dark"?q:localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t==="light")d.classList.remove("dark");var c={};try{c=JSON.parse(localStorage.getItem(${JSON.stringify(
  THEME_CONFIG_STORAGE_KEY
)})||"{}")||{}}catch(e){}var ok=function(v,list,f){return list.indexOf(v)>-1?v:f};d.dataset.base=ok(c.base,${JSON.stringify(
  Object.keys(BASE_COLORS)
)},${JSON.stringify(DEFAULT_THEME.base)});d.dataset.accent=ok(c.accent,${JSON.stringify(Object.keys(ACCENTS))},${JSON.stringify(
  DEFAULT_THEME.accent
)});d.dataset.radius=ok(c.radius,${JSON.stringify(RADII)},${JSON.stringify(DEFAULT_THEME.radius)})}catch(e){}})()`
