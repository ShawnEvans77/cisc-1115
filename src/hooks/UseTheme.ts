// src/hooks/useTheme.ts
import { useState, useEffect } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "maple-theme";
const THEME_COLORS = {
  light: "#E07B00",  // orange navbar
  dark:  "#0F0D0B",  // deep warm black
};

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;

  // Mobile browser chrome color (address bar, bottom bar on iOS/Android)
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = THEME_COLORS[theme];
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  // Sync with OS-level changes when no stored preference
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