// src/context/ThemeContext.tsx
//
// ─── WHAT IS CONTEXT? ────────────────────────────────────────────────────────
// React Context is a way to share data across components WITHOUT passing props
// through every level ("prop drilling").
//
// Here: the dark/light theme state lives here at the top level.
// ANY component can read or toggle the theme by calling useTheme().
//
// HOW DARK MODE WORKS:
// 1. We store 'dark' or 'light' in localStorage (persists across page reloads)
// 2. We add/remove the class "dark" on <html> element
// 3. Tailwind reads that class and applies dark: variants
// ─────────────────────────────────────────────────────────────────────────────

// import { createContext, useContext, useEffect, useState } from "react";

// // ── Types ─────────────────────────────────────────────────────────────────────
// type Theme = "dark" | "light";

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
//   isDark: boolean;
// }

// // ── Create the context ────────────────────────────────────────────────────────
// // We pass 'undefined' as the default — it forces us to always use the Provider
// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// // ── Provider Component ────────────────────────────────────────────────────────
// // Wrap your entire app with this so all children can access theme state
// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   // Initialize from localStorage, defaulting to 'dark' (dark-first design)
//   const [theme, setTheme] = useState<Theme>(() => {
//     const saved = localStorage.getItem("theme") as Theme | null;
//     return saved ?? "dark"; // Default: dark
//   });

//   // Sync the "dark" class on <html> every time theme changes
//   useEffect(() => {
//     const root = document.documentElement; // This is the <html> element

//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }

//     // Persist to localStorage
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   const value: ThemeContextType = {
//     theme,
//     toggleTheme,
//     isDark: theme === "dark",
//   };

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// }

// // ── Custom Hook ───────────────────────────────────────────────────────────────
// // Usage in any component:
// //   const { isDark, toggleTheme } = useTheme()
// export function useTheme(): ThemeContextType {
//   const context = useContext(ThemeContext);

//   // If someone uses useTheme() outside of ThemeProvider, throw a helpful error
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }

//   return context;
// }

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // On first load — read from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  // Every time theme changes — apply it
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === "dark" }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Extracted helper — directly manipulates the <html> class
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
