"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/primitives/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
      onClick={toggleTheme}
      icon={isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    >
      {isDark ? "Clair" : "Sombre"}
    </Button>
  );
}
