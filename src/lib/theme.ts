import { ACCENTS, BASE_COLORS, DEFAULT_THEME, RADII, THEME_CONFIG_STORAGE_KEY } from "@/config/themes"

export const THEME_STORAGE_KEY = "theme"

/**
 * The site was called kanakui until Nov 2026. Saved settings move to the new
 * keys once, in the head script below, so returning visitors keep them.
 */
const RENAMED_STORAGE_KEYS = [
  ["kanakui-theme", "venusui-theme"],
  ["kanakui-items-view", "venusui-items-view"],
] as const

/**
 * Runs in <head> before the first paint, so there's no flash of the wrong theme.
 *
 * Light/dark: the server always renders light (the default). Dark is applied when
 * - the URL has ?theme=dark (used by preview iframes to force a theme), or
 * - the visitor chose dark earlier (localStorage).
 * ?theme=light forces light regardless of the stored choice.
 *
 * Theme (base color, accent, radius): read from localStorage and set as
 * data-base, data-accent and data-radius on <html>; src/styles/themes.css
 * does the rest. Unknown values fall back to the defaults.
 * See Next.js "Preventing flash before hydration": Themes.
 */
export const themeScript = `(function(){try{var m=${JSON.stringify(RENAMED_STORAGE_KEYS)};for(var i=0;i<m.length;i++){var o=localStorage.getItem(m[i][0]);if(o!==null){if(localStorage.getItem(m[i][1])===null)localStorage.setItem(m[i][1],o);localStorage.removeItem(m[i][0])}}}catch(e){}try{var d=document.documentElement;var q=new URLSearchParams(location.search).get("theme");var t=q==="light"||q==="dark"?q:localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t==="dark")d.classList.add("dark");var c={};try{c=JSON.parse(localStorage.getItem(${JSON.stringify(
  THEME_CONFIG_STORAGE_KEY
)})||"{}")||{}}catch(e){}var ok=function(v,list,f){return list.indexOf(v)>-1?v:f};d.dataset.base=ok(c.base,${JSON.stringify(
  Object.keys(BASE_COLORS)
)},${JSON.stringify(DEFAULT_THEME.base)});d.dataset.accent=ok(c.accent,${JSON.stringify(Object.keys(ACCENTS))},${JSON.stringify(
  DEFAULT_THEME.accent
)});d.dataset.radius=ok(c.radius,${JSON.stringify(RADII)},${JSON.stringify(DEFAULT_THEME.radius)})}catch(e){}})()`
