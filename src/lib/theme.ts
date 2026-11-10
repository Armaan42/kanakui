export const THEME_STORAGE_KEY = "theme"

/**
 * Runs in <head> before the first paint. The server always renders the dark
 * theme (the default). This switches to light only if the visitor chose it.
 * See Next.js "Preventing flash before hydration": Themes.
 */
export const themeScript = `(function(){try{if(localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)})==="light")document.documentElement.classList.remove("dark")}catch(e){}})()`
