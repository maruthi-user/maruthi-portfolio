"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("theme"); } catch {}
    document.documentElement.classList.toggle("dark", saved === "dark" || (saved !== "light" && media.matches));
    callback();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === "theme" || event.key === null) sync();
  };
  media.addEventListener("change", sync);
  window.addEventListener("storage", onStorage);
  window.addEventListener("portfolio-theme", callback);
  return () => {
    media.removeEventListener("change", sync);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("portfolio-theme", callback);
  };
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => false);

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
    window.dispatchEvent(new Event("portfolio-theme"));
  }

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
      <span className="theme-icon" aria-hidden>
        <svg viewBox="0 0 24 24" className="dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        <svg viewBox="0 0 24 24" className="hidden dark:block" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      </span>
      <span className="dark:hidden">Dark</span><span className="hidden dark:inline">Light</span>
    </button>
  );
}
