// src/components/layout/Footer.tsx
//
// ─── FOOTER ──────────────────────────────────────────────────────────────────
// Clean, minimal footer with:
//   • Logo / name (scrolls back to top on click)
//   • Quick navigation links
//   • Social links
//   • Copyright + "built with" credit
//   • Current year computed dynamically (no hardcoding!)
// ─────────────────────────────────────────────────────────────────────────────

import { profile } from "@/data/profile";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  // Always accurate — no hardcoded year that goes stale
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="transition-colors duration-300"
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--bg-soft)",
      }}
    >
      <div className="max-w-portfolio mx-auto px-6 py-12">
        {/* Top Row: Logo + Nav + Socials  */}
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Logo + Tagline */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-fit"
            >
              <img
                src="src/images/logo.png"
                alt="BN Logo"
                className="w-14 h-14 object-contain hover:scale-105 transition-transform duration-300"
              />
            </button>
            <p className="font-body text-sm text-text-muted leading-relaxed max-w-xs">
              {profile.tagline}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
              Connect
            </p>
            <ul className="flex flex-col gap-2">
              {profile.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-body text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/*  Divider  */}
        <div className="h-px bg-surface-border mb-6" />

        {/*  Bottom Row: Copyright  */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>

          <p className="font-mono text-xs text-text-muted flex items-center gap-1">
            Built with
            <span className="text-accent mx-1">React</span>·
            <span className="text-accent mx-1">TypeScript</span>·
            <span className="text-accent mx-1">Tailwind</span>
            <span className="ml-1">🇰🇪</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
