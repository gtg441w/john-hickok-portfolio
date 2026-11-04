/* The behaviours the mark can opt into. Each name is a recipe in logo.css, keyed on
 * [data-motion~="name"]; the two lists have to agree, which is why this file is the one
 * place the names are written down.
 *
 *   draw     the strokes draw themselves in on a full page load
 *   resolve  the spine straightens while the trigger is hovered or focused
 *   press    the mark scales down a touch while the trigger is held
 *
 * To add one, follow the template at the bottom of logo.css, then add its name here. */
export const LOGO_MOTIONS = ['draw', 'resolve', 'press'] as const

export type LogoMotion = (typeof LOGO_MOTIONS)[number]
