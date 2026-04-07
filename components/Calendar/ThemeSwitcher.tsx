"use client";
import { Sun, Moon, Palette } from "lucide-react";
import { Theme } from "@/hooks/useTheme";

interface ThemeSwitcherProps {
  theme: Theme;
  onCycle: () => void;
}

const THEME_CONFIG: Record<Theme, { label: string; icon: React.ReactNode; next: Theme }> = {
  light: { label: "Light", icon: <Sun size={12} />, next: "dark" },
  dark: { label: "Dark", icon: <Moon size={12} />, next: "seasonal" },
  seasonal: { label: "Warm", icon: <Palette size={12} />, next: "light" },
};

export default function ThemeSwitcher({ theme, onCycle }: ThemeSwitcherProps) {
  const config = THEME_CONFIG[theme];
  return (
    <button className="theme-btn active" onClick={onCycle} aria-label={`Switch theme (current: ${theme})`}>
      {config.icon}
      {config.label}
    </button>
  );
}
