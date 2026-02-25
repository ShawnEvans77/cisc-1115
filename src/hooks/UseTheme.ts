// src/hooks/useTheme.ts
// ─────────────────────────────────────────────────────────────────────────────
// Manages light/dark theme.
// Priority: localStorage → system prefers-color-scheme → light
// Applies [data-theme="light"|"dark"] to <html> so CSS variables cascade site-wide.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "maple-theme";

function getInitialTheme(): Theme {
  // 1. Stored preference
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {}

  // 2. System preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });

  // Keep <html data-theme> in sync whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  // Also listen for system preference changes (e.g. user changes OS setting
  // while the tab is open) — only applies if user has no stored preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      try { if (!localStorage.getItem(STORAGE_KEY)) setTheme(e.matches ? "dark" : "light"); }
      catch { setTheme(e.matches ? "dark" : "light"); }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");

  return { theme, toggle };
}