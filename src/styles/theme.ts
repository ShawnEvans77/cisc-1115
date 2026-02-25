// ─────────────────────────────────────────────────────────────────────────────
// src/styles/theme.ts
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  // Brand
  orange:       "#E07B00",
  orangeHover:  "#C96E00",
  orangeLight:  "#FFF3E0",

  // Accent fills — all include hover variant
  syrup:        "#C8813A",
  syrupHover:   "#B3722F",
  forest:       "#4A6741",
  forestHover:  "#3D5836",
  blue:         "#7EB8D4",
  blueHover:    "#62A3C2",

  // Surfaces
  white:        "#FFFFFF",
  offWhite:     "#FAFAF8",
  surface:      "#F5F4F0",
  cream:        "#FFF8EE",

  // Text
  ink:          "#1A1208",
  muted:        "#6B6355",
  subtle:       "#A89F94",
  subtleHover:  "#8C8479",

  // Borders
  border:       "#E8E3DC",
  borderStrong: "#C8BFAF",

  // Feedback
  copySuccess:  "#6B8E6B",

  // Pure white — never themes. Used for text on colored/dark solid backgrounds.
  pureWhite:    "#FFFFFF",
} as const;

// Warm dark — brown-blacks, cream whites, amber orange.
// NOT cold gray-blacks. Reference: portfolio dark aesthetic.
export const darkColors = {
  orange:       "#E8861A",
  orangeHover:  "#CF7410",
  orangeLight:  "rgba(232, 134, 26, 0.10)",

  syrup:        "#CF8040",
  syrupHover:   "#B36B2A",
  forest:       "#5F8A55",
  forestHover:  "#4A7040",

  white:        "#161210",
  offWhite:     "#0D0B09",
  surface:      "#131109",
  cream:        "#1C1814",

  ink:          "#EDE5D8",
  muted:        "#A09282",
  subtle:       "#6E6358",

  border:       "#2C261E",
  borderStrong: "#3D3529",

  copySuccess:  "#6B9E6B",

  // Dark-only surfaces (no light-mode equivalent)
  navbarBg:       "#0F0D0B",
  contentDeep:    "#111009",
  navbarMobileBg: "#1A1612",
} as const;

export const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'Lora', Georgia, serif",
  mono:    "'DM Mono', monospace",
} as const;