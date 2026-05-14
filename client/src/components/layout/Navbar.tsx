// src/components/layout/Navbar.tsx
//
// The top navigation bar. Features:
//   • Transparent at top, blurred dark background on scroll
//   • Smooth scroll to each section on click
//   • Dark/Light toggle button
//   • Mobile hamburger menu
//   • Active section highlight (using scroll position)
//
// useEffect + useState track scroll position to change navbar appearance.

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/types";
import { Icon } from "@/components/ui/Icon";

// All nav links — each href is an anchor to a section id
const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  // Track if user has scrolled down — to change navbar background
  const [scrolled, setScrolled] = useState(false);

  // Track if mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup!
  }, []);

  // Smooth scroll handler
  const handleNavClick = (href: string) => {
    setMenuOpen(false); // Close mobile menu
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? "'bg-base/90 dark:bg-base/90 backdrop-blur-md border-b border-surface-border shadow-lg'"
            : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-portfolio mx-auto px-6 h-16 flex items-center justify-between">
        {/* ── Logo / Name ─────────────────────────────────────────── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl font-bold text-text-primary hover:text-accent transition-colors"
        >
          <img
            src="src/images/logo.png"
            alt="BN Logo"
            className="w-14 h-14 object-contain hover:scale-105 transition-transform duration-300"
          />
        </button>

        {/* ── Desktop Nav Links ────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ── Right Controls ──────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-surface-hover transition-all"
          >
            <Icon
              name={isDark ? "light_mode" : "dark_mode"}
              size="md"
              className="transition-all duration-300"
            />
          </button>

          {/* Resume CTA — hidden on mobile */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => window.open("/resume-brian-nyairo.pdf", "_blank")}
          >
            Resume
          </Button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-accent"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {/* Three lines or X depending on state */}
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Dropdown ─────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden backdrop-blur-md"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <ul className="max-w-portfolio mx-auto px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="font-body text-sm transition-colors duration-200 hover:text-accent"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <Button variant="outline" size="sm" fullWidth>
                Resume
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
