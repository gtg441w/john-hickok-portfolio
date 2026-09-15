/* Theme has THREE states and collapsing them is the documented way to get this
 * wrong. `null` means "follow the OS" and is the default experience for most
 * visitors; a stored 'dark' or 'light' is an explicit choice that outranks the OS.
 *
 * The split that keeps all three alive:
 *   - localStorage['theme']  holds the CHOICE   — 'dark' | 'light' | absent(null)
 *   - <html data-theme>      holds the RESOLVED mode — 'dark' | 'light', never absent
 *
 * The design system switches on the class `.dark` / `.light` (tokens/colors.css)
 * and ships no `prefers-color-scheme` query of its own, so resolving the OS
 * preference is our job and has to happen before first paint. The script below
 * sets both the class the tokens read and the attribute our own CSS and the
 * toggle read.
 */

export const THEME_STORAGE_KEY = 'theme'

export type ThemeChoice = 'dark' | 'light' | null
export type ResolvedTheme = 'dark' | 'light'

/* Runs blocking in <head>, before first paint. Kept tiny and dependency-free on
 * purpose — it is parsed and executed on the critical path of every navigation.
 * Wrapped in try/catch because localStorage throws outright in some privacy modes,
 * and a theme script is never a reason to white-screen the site. */
export const THEME_INIT_SCRIPT = `(function(){try{
var c=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var m=(c==='dark'||c==='light')?c:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
var r=document.documentElement;
r.dataset.theme=m;
r.classList.add(m);
r.style.colorScheme=m;
}catch(e){}})()`
