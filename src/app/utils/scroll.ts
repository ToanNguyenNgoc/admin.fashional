export const scrollTop = (behavior?: "smooth" | "auto") => window.scrollTo({ top: 0, behavior: behavior ?? 'auto' })