import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

// ── Lazy load sections below the fold ────────────────────────────────────────
// These sections are not visible on initial load, so we can defer loading them.
// React.lazy() + Suspense = code splitting automatically by Vite.
const About = lazy(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About })),
);
const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({
    default: m.Projects,
  })),
);
const Experience = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({
    default: m.Experience,
  })),
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() =>
  import("@/components/layout/Footer").then((m) => ({ default: m.Footer })),
);

// ── Loading fallback ─────────────────────────────────────────────────────────
// Shown while a lazy section is loading — a subtle fade-in bar
function SectionLoader() {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <div className="h-0.5 w-24 bg-accent/40 rounded-full animate-pulse" />
    </div>
  );
}

// ── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      {/*
        The outer div sets the page background and default text color.
        "dark:" variants are applied via Tailwind's darkMode: 'class' strategy.
        Since we default to dark, these colors are always "dark mode" until toggled.
      */}
      <div
        className="min-h-screen font-body transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg-base)",
          color: "var(--text-primary)",
        }}
      >
        {/* Fixed top navbar */}
        <Navbar />

        {/* Main page content — one section per scroll stop */}
        <main>
          {/* Hero loads immediately — it's the first thing the user sees */}
          <Hero />

          {/* All other sections load lazily — wrapped in Suspense */}
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}
