import { useState, useEffect } from "react";
import { readStorage, writeStorage } from "../utils/storage";

type Theme = "light" | "dark";

// Both values are duplicated in the inline script in index.html, which sets the
// theme before React mounts. Keep the two in sync.
const STORAGE_KEY = "maple-theme";
const THEME_COLORS: Record<Theme, string> = {
  light: "#FAFAF8",
  dark:  "#16161E",
};

const THEME_TRANSITION_MS = 300;

function getStoredTheme(): Theme | null {
  const stored = readStorage(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

function getInitialTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme, { animate }: { animate: boolean }) {
  if (animate) {
    // base.css only transitions colors while this class is present.
    document.body.classList.add("theme-switching");
    setTimeout(() => document.body.classList.remove("theme-switching"), THEME_TRANSITION_MS);
  }

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;

  // Mobile browser chrome color + Android nav bar icons
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
    applyTheme(initial, { animate: false });
    return initial;
  });

  useEffect(() => {
    applyTheme(theme, { animate: true });
    writeStorage(STORAGE_KEY, theme);
  }, [theme]);

  // Sync with OS-level changes when no stored preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");

  return { theme, toggle };
}
