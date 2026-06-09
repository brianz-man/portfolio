// src/components/sections/Hero.tsx
//
// CARD FLIP ANIMATION:
// The code card and profile photo are two "faces" of one card.
// On hover → CSS 3D rotateY(180deg) flips to show the photo.
// Uses perspective + transform-style: preserve-3d for real 3D depth.
// The back face has rotateY(180deg) so it appears correct when flipped.

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { profile } from '@/data/profile'

export function Hero() {
  const roles = [
    'Full-Stack Developer',
    'System Architect',
    'Open Source Contributor',
    'Software Engineer',
  ]
  const [currentRole, setCurrentRole] = useState(0)
  const [visible, setVisible]         = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () =>
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >

      {/* ── Background dot grid ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Glow orb ─────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div
        className="relative w-full mx-auto px-6 py-24 pt-32 grid md:grid-cols-2 gap-12 items-center"
        style={{ maxWidth: '900px' }}
      >

        {/* ── LEFT: Text ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Available badge */}
          <div className="inline-flex items-center gap-2 w-fit">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--accent)' }}
            >
              Available for work
            </span>
          </div>

          {/* Name */}
          <div>
            <p
              className="font-body text-lg mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hello, I'm
            </p>
            <h1
              className="font-display text-5xl md:text-7xl font-black leading-none"
              style={{ color: 'var(--text-primary)' }}
            >
              {profile.name.split(' ')[0]}
              <br />
              <span style={{ color: 'var(--accent)' }}>
                {profile.name.split(' ')[1]}
              </span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
          </div>

          {/* Typewriter role */}
          <div className="h-8 overflow-hidden">
            <p
              className="font-mono text-lg transition-opacity duration-300"
              style={{
                color: 'var(--text-secondary)',
                opacity: visible ? 1 : 0,
              }}
            >
              <span style={{ color: 'var(--accent)' }}>&gt;</span>{' '}
              {roles[currentRole]}
            </p>
          </div>

          {/* Tagline */}
          <p
            className="font-body text-lg leading-relaxed max-w-md"
            style={{ color: 'var(--text-secondary)' }}
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

          {/* Social links */}
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              FIND ME ON
            </span>
            <div className="flex gap-3 flex-wrap">
              {profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs rounded px-2 py-1 transition-all duration-200"
                  style={{
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color         = 'var(--accent)'
                    e.currentTarget.style.borderColor   = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color         = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor   = 'var(--border)'
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Flip Card ─────────────────────────────────────────── */}
        {/*
          HOW THE FLIP WORKS:
          1. .flip-card-container  — sets the 3D perspective
          2. .flip-card-inner      — the element that actually rotates
          3. .flip-card-front      — the code card (visible by default)
          4. .flip-card-back       — the photo (hidden behind, pre-rotated 180deg)

          On hover → inner rotates 180deg → front disappears, back appears.
          "backface-visibility: hidden" hides the back of each face so they
          don't show through each other during the rotation.
        */}
        <div className="hidden md:flex justify-center items-center">

          {/* Perspective wrapper — must have fixed dimensions */}
          <div
            className="relative w-full cursor-pointer"
            style={{
              height: '360px',
              perspective: '1000px',      // Depth of 3D space
            }}
            // Also flip on click for mobile friendliness
          >
            {/*
              Inner — this is what rotates.
              transition controls the flip speed (0.7s).
            */}
            <div
              className="flip-card-inner absolute inset-0 w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'rotateY(180deg)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'rotateY(0deg)'
              }}
            >

              {/* ── FRONT FACE: Code Card ───────────────────────────── */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',   // Hide when flipped away
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Window chrome dots */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{
                    backgroundColor: 'var(--bg-hover)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                  <span
                    className="ml-4 font-mono text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    brian.ts
                  </span>
                  {/* Hover hint */}
                  <span
                    className="ml-auto font-mono text-xs animate-pulse"
                    style={{ color: 'var(--accent)' }}
                  >
                    hover me ↗
                  </span>
                </div>

                {/* Code content */}
                <pre
                  className="p-6 text-sm leading-7 overflow-auto h-full"
                  style={{ backgroundColor: '#0D1117' }}
                >
                  <code>
                    <span className="text-purple-400">const </span>
                    <span style={{ color: 'var(--accent)' }}>brian</span>
                    <span className="text-gray-300"> = {'{'}</span>{'\n'}
                    <span className="text-gray-500">  // Full-Stack Developer</span>{'\n'}
                    <span className="text-blue-400">  name</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-green-400">'Brian Nyairo'</span>
                    <span className="text-gray-300">,</span>{'\n'}
                    <span className="text-blue-400">  location</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-green-400">'Nairobi, Kenya 🇰🇪'</span>
                    <span className="text-gray-300">,</span>{'\n'}
                    <span className="text-blue-400">  stack</span>
                    <span className="text-gray-300">: [</span>{'\n'}
                    <span className="text-green-400">    'React', 'TypeScript',</span>{'\n'}
                    <span className="text-green-400">    'Node.js', 'PostgreSQL'</span>{'\n'}
                    <span className="text-gray-300">  ],</span>{'\n'}
                    <span className="text-blue-400">  available</span>
                    <span className="text-gray-300">: </span>
                    <span style={{ color: 'var(--accent)' }}>true</span>{'\n'}
                    <span className="text-gray-300">{'}'}</span>
                  </code>
                </pre>
              </div>

              {/* ── BACK FACE: Profile Photo ─────────────────────────── */}
              {/*
                rotateY(180deg) pre-rotates this face so it's hidden initially.
                When the inner rotates 180deg on hover, this face becomes visible
                and appears the correct way around.
              */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center gap-4"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',   // Pre-rotated — hidden until flip
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--accent)',
                }}
              >
                {/* Profile photo */}
                <div
                  className="w-36 h-36 rounded-full overflow-hidden border-4"
                  style={{ borderColor: 'var(--accent)' }}
                >
                  <img
                    src="/images/photo.jpeg"
                    alt="Brian Nyairo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback initials if no photo yet
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  {/* Fallback initials avatar */}
                  <div
                    className="w-full h-full flex items-center justify-center font-display text-4xl font-black"
                    style={{
                      backgroundColor: 'var(--accent-glow)',
                      color: 'var(--accent)',
                    }}
                  >
                    BN
                  </div>
                </div>

                {/* Name + title on back */}
                <div className="text-center px-6">
                  <h3
                    className="font-display text-2xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {profile.name}
                  </h3>
                  <p
                    className="font-mono text-sm mt-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    {profile.title}
                  </p>
                  <p
                    className="font-body text-sm mt-3 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {profile.location}
                  </p>
                </div>

                {/* Accent line */}
                <div
                  className="w-12 h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </div>

            </div>{/* end flip-card-inner */}
          </div>{/* end perspective wrapper */}
        </div>

      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="font-mono text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          scroll
        </span>
        <div
          className="w-px h-12 animate-pulse"
          style={{
            background: `linear-gradient(to bottom, var(--text-muted), transparent)`,
          }}
        />
      </div>
    </section>
  )
}

export default Hero