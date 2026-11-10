export const THEME_STORAGE_KEY = "theme"

/**
 * Runs in <head> before the first paint. The server always renders the dark
 * theme (the default). Light is applied when:
 * - the URL has ?theme=light (used by preview iframes to force a theme), or
 * - the visitor chose light earlier (localStorage).
 * ?theme=dark forces dark regardless of the stored choice.
 * See Next.js "Preventing flash before hydration": Themes.
 */
export const themeScript = `(function(){try{var q=new URLSearchParams(location.search).get("theme");var t=q==="light"||q==="dark"?q:localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t==="light")document.documentElement.classList.remove("dark")}catch(e){}})()`
