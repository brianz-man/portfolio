// src/components/sections/Hero.tsx
//
// The first thing visitors see — the most important section.
// Goal: In under 5 seconds, answer:
//   1. WHO is this person?
//   2. WHAT do they do?
//   3. WHY should I care?
//   4. HOW do I reach them?
//
// Design: Full viewport height, centered content, animated entrance,
// floating code snippet as a visual element, social links.

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
interface Social {
  name: string;
  url: string;
}

export function Hero() {
  // Typewriter effect — cycles through roles
  const roles = [
    "Junior Software Engineer",
    "Full-Stack Developer",
    "System Architect",
    "Open Source Contributor",
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Every 3 seconds, fade out, switch role, fade in
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* ── Background Grid Pattern ───────────────────────────────────── */}
      {/* Creates a subtle dot grid — adds depth without distraction */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #00FFB244 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Glow Orb — Decorative background light ───────────────────── */}
      <div
        className="
        absolute top-1/4 right-1/4
        w-96 h-96 rounded-full
        bg-accent/5 blur-3xl
        animate-glow-pulse
      "
      />

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="relative max-w-portfolio mx-auto px-6 py-24 pt-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-6 animate-fade-up">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              Available for work
            </span>
          </div>

          {/* Greeting + Name */}
          <div>
            <p className="font-body text-text-secondary text-lg mb-2">
              Hello, I'm
            </p>
            <h1
              className="font-display text-5xl md:text-7xl font-black leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              {profile.name.split(" ")[0]}
              <br />
              <span style={{ color: "var(--accent)" }}>
                {profile.name.split(" ")[1]}
              </span>
              <span style={{ color: "var(--accent)" }}>.</span>
            </h1>
          </div>

          {/* Typewriter Role */}
          <div className="h-8 overflow-hidden">
            <p
              className={`
                font-mono text-text-secondary text-lg
                transition-opacity duration-400
                ${visible ? "opacity-100" : "opacity-0"}
              `}
            >
              <span className="text-accent">&gt;</span> {roles[currentRole]}
            </p>
          </div>

          {/* Tagline */}
          <p
            className="font-body text-lg leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            {profile.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Button variant="primary" size="lg" onClick={scrollToProjects}>
              View My Work
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToContact}>
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-2">
            <span className="font-mono text-xs text-text-muted">
              FIND ME ON
            </span>
            <div className="flex gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-text-secondary hover:text-accent
                    transition-colors duration-200
                    font-mono text-xs
                    border border-surface-border hover:border-accent
                    rounded px-2 py-1
                  "
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Code Snippet Visual — a floating "code card" */}
        <div className="hidden md:block animate-slide-left">
          <div
            className="
            relative bg-surface rounded-xl
            border border-surface-border
            shadow-2xl overflow-hidden
            font-mono text-sm
          "
          >
            {/* Window chrome (red/yellow/green dots) */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                backgroundColor: "var(--bg-hover)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-4 text-text-muted text-xs">brian.ts</span>
            </div>

            {/* Code content */}
            <pre className="p-6 text-sm leading-7 overflow-auto">
              <code>
                <span className="text-purple-400">const </span>
                <span className="text-accent">brian</span>
                <span className="text-text-primary"> = {"{"}</span>
                {"\n"}
                <span className="text-text-muted">
                  {" "}
                  // Junior Software Engineer
                </span>
                {"\n"}
                <span className="text-blue-400"> name</span>
                <span className="text-text-primary">: </span>
                <span className="text-green-400">'Brian Nyairo'</span>
                <span className="text-text-primary">,</span>
                {"\n"}
                <span className="text-blue-400"> location</span>
                <span className="text-text-primary">: </span>
                <span className="text-green-400">'Nairobi, Kenya 🇰🇪'</span>
                <span className="text-text-primary">,</span>
                {"\n"}
                <span className="text-blue-400"> experience</span>
                <span className="text-text-primary">: </span>
                <span className="text-orange-400">2</span>
                <span className="text-text-primary">,</span>
                {"\n"}
                <span className="text-blue-400"> stack</span>
                <span className="text-text-primary">: [</span>
                {"\n"}
                <span className="text-green-400">
                  {" "}
                  'MongoDB', 'Express.js',
                </span>
                {"\n"}
                <span className="text-green-400"> 'React', 'Node.js'</span>
                {"\n"}
                <span className="text-green-400"> 'Django', 'PostgreSQL'</span>
                {"\n"}
                <span className="text-text-primary"> ],</span>
                {"\n"}
                <span className="text-blue-400"> available</span>
                <span className="text-text-primary">: </span>
                <span className="text-accent">true</span>
                {"\n"}
                <span className="text-text-primary">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-text-muted">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-text-muted to-transparent animate-pulse" />
      </div>
    </section>
  );
}
