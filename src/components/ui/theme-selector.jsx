"use client";

import React, { useState } from "react";
import { ChevronDown, Monitor, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const themes = [
  {
    name: "light",
    label: "Light",
    icon: Sun,
    description: "Light theme for daytime use",
  },
  {
    name: "dark",
    label: "Dark",
    icon: Moon,
    description: "Dark theme for nighttime use",
  },
  {
    name: "system",
    label: "System",
    icon: Monitor,
    description: "Follow system preference",
  },
];

const ThemeSelector = ({ className = "" }) => {
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeName) => {
    if (themeName === "light") {
      setLightTheme();
    } else if (themeName === "dark") {
      setDarkTheme();
    } else if (themeName === "system") {
      // System theme logic
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      if (systemTheme === "light") {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }
    setIsOpen(false);
  };

  const getCurrentTheme = () => {
    return themes.find((t) => t.name === theme) || themes[0];
  };

  const currentTheme = getCurrentTheme();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${className}`}
        >
          <currentTheme.icon className="h-4 w-4" />
          <span className="hidden sm:inline">{currentTheme.label}</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Choose Theme
          </div>
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <DropdownMenuItem
                key={themeOption.name}
                onClick={() => handleThemeChange(themeOption.name)}
                className={`flex items-center gap-3 p-3 cursor-pointer rounded-md transition-all duration-200 hover:bg-accent ${
                  theme === themeOption.name
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{themeOption.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {themeOption.description}
                    </span>
                  </div>
                </div>
                {theme === themeOption.name && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
