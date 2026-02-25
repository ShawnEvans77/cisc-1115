// ─────────────────────────────────────────────────────────────────────────────
// src/styles/theme.ts
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  orange:      "#E07B00",
  orangeHover: "#C96E00",
  orangeLight: "#FFF3E0",
  white:    "#FFFFFF",
  offWhite: "#FAFAF8",
  surface:  "#F5F4F0",
  ink:    "#1A1208",
  muted:  "#6B6355",
  subtle: "#A89F94",
  border:       "#E8E3DC",
  borderStrong: "#C8BFAF",
  syrup:  "#C8813A",
  cream:  "#FFF8EE",
  forest: "#4A6741",
} as const;

// Warm dark — brown-blacks, cream whites, amber orange
// NOT cold gray-blacks. Reference: portfolio dark aesthetic.
export const darkColors = {
  orange:      "#E8861A",   // warmer amber
  orangeHover: "#CF7410",
  orangeLight: "rgba(232, 134, 26, 0.10)",
  white:    "#1C1814",      // warm dark brown, not cold black
  offWhite: "#100E0B",      // deepest bg
  surface:  "#191511",      // slightly elevated surface
  ink:    "#EDE5D8",        // warm cream, not harsh white
  muted:  "#A09282",        // warm gray-brown
  subtle: "#6E6358",
  border:       "#2C261E",  // warm dark border
  borderStrong: "#3D3529",
  syrup:  "#CF8040",
  cream:  "#1C1814",
  forest: "#5F8A55",
} as const;

export const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'Lora', Georgia, serif",
  mono:    "'DM Mono', monospace",
} as const;