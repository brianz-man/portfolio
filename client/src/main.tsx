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
