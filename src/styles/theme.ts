// ─────────────────────────────────────────────────────────────────────────────
// src/styles/theme.ts
// Single source of truth for design tokens.
// JS constants → used for inline/dynamic values (e.g. per-instance CSS vars)
// CSS variables → defined in components.css :root, consumed by classnames
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  // core
  orange:      "#E07B00",
  orangeHover: "#C96E00",
  orangeLight: "#FFF3E0",

  // backgrounds
  white:    "#FFFFFF",
  offWhite: "#FAFAF8",
  surface:  "#F5F4F0",

  // text
  ink:    "#1A1208",
  muted:  "#6B6355",
  subtle: "#A89F94",

  // borders
  border:       "#E8E3DC",
  borderStrong: "#C8BFAF",

  // accents
  syrup:  "#C8813A",
  cream:  "#FFF8EE",
  forest: "#4A6741",
} as const;

export const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'Lora', Georgia, serif",
  mono:    "'DM Mono', monospace",
} as const;