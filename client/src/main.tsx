// src/main.tsx
//
// ─── APPLICATION ENTRY POINT ──────────────────────────────────────────────────
// This is the VERY FIRST file React runs.
// It mounts our entire React app onto the <div id="root"> in index.html.
//
// StrictMode: A development tool that:
//   • Detects accidental side effects
//   • Warns about deprecated APIs
//   • Makes components render TWICE in dev (intentional — don't be alarmed)
//   • Has NO effect in production builds
//
// The import of globals.css here ensures Tailwind styles are loaded globally.
// ─────────────────────────────────────────────────────────────────────────────

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore: CSS module declarations not available in this TS config
import "./styles/globals.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
