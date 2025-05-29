import { useState, useEffect } from "react";

/**
 * Custom hook for theme management
 * Handles light/dark theme switching with localStorage persistence
 */
const Theme = () => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  // Apply theme to document and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove("light", "dark");
    
    // Add current theme class
    root.classList.add(theme);
    
    // Set data-theme attribute for additional styling options
    root.setAttribute("data-theme", theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  // Set specific theme
  const setLightTheme = () => {
    setTheme("light");
  };

  const setDarkTheme = () => {
    setTheme("dark");
  };

  // Handle theme change from checkbox or toggle input
  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
  };

  // Check if current theme is dark
  const isDark = theme === "dark";

  // Check if current theme is light
  const isLight = theme === "light";

  return {
    theme,
    isDark,
    isLight,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    handleThemeChange,
    setTheme
  };
};

export default Theme;