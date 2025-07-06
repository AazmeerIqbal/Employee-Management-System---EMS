"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "./button";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`h-5 w-5 transition-all duration-300 ${
            theme === "light"
              ? "rotate-0 scale-100 text-yellow-500"
              : "rotate-90 scale-0 text-muted-foreground"
          }`}
        />

        {/* Moon Icon */}
        <Moon
          className={`absolute h-5 w-5 transition-all duration-300 ${
            theme === "dark"
              ? "rotate-0 scale-100 text-blue-400"
              : "-rotate-90 scale-0 text-muted-foreground"
          }`}
        />
      </div>

      {/* Background gradient effect */}
      <div
        className={`absolute inset-0 rounded-md transition-all duration-300 ${
          theme === "light"
            ? "bg-gradient-to-r from-yellow-100 to-orange-100 opacity-0"
            : "bg-gradient-to-r from-blue-900 to-purple-900 opacity-0"
        }`}
      />
    </Button>
  );
};

export default ThemeToggle;
