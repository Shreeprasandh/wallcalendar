"use client";
import { useState, useEffect } from "react";

export type Theme = "light" | "dark" | "seasonal";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("calendar-theme") as Theme | null;
      if (stored) setTheme(stored);
    } catch {}
  }, []);

  const cycleTheme = () => {
    setTheme(prev => {
      const next: Theme = prev === "light" ? "dark" : prev === "dark" ? "seasonal" : "light";
      try { localStorage.setItem("calendar-theme", next); } catch {}
      return next;
    });
  };

  return { theme, cycleTheme, setTheme };
}
