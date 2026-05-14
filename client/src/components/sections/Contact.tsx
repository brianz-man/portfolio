// src/components/sections/Contact.tsx
//
// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
// The contact form collects: name, email, subject, message
// On submit → sends POST request to Express backend at /api/contact
//
// KEY CONCEPTS:
//   • Controlled form inputs — React manages every field via useState
//   • Form validation before submitting
//   • Async/await for API calls with axios
//   • Loading, success, and error states
//   • Preventing default form submission with e.preventDefault()
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import axios from "axios";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import type { ContactForm } from "@/types";
import { profile } from "@/data/profile";
import { Icon } from "@/components/ui/Icon";

// ── Form Field Component ──────────────────────────────────────────────────────
// Reusable input wrapper with label + error message
// Defined locally since it's only used here
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs text-text-muted tracking-wider uppercase">
        {label}
      </label>
      {children}
      {error && <span className="font-mono text-xs text-red-400">{error}</span>}
    </div>
  );
}

// Shared input/textarea styles — extracted as a constant to avoid repetition
const inputClass = `
  w-full bg-surface border border-surface-border rounded-lg px-4 py-3
  font-body text-sm text-text-primary placeholder:text-text-muted
  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
  transition-colors duration-200
`;

// ── Main Contact Component ────────────────────────────────────────────────────
export function Contact() {
  // ── Form state — one state object for all fields ──────────────────────────
  // This is the "controlled component" pattern:
  // every keystroke updates state → React re-renders with new value
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Validation errors — one per field
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  // Submission states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Generic change handler ────────────────────────────────────────────────
  // Works for ALL inputs — uses the input's "name" attribute to know
  // which field to update. This avoids writing 4 separate handlers.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true = no errors
  };

  // ── Submit Handler ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // STOP the browser from refreshing the page

    if (!validate()) return; // Stop if there are validation errors

    setLoading(true);
    setApiError("");

    try {
      // POST to our Express backend
      // Vite proxy forwards /api/* to http://localhost:4000
      await axios.post("/api/contact", form);

      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      // axios throws an error for non-2xx responses
      setApiError("Something went wrong. Please try again or email directly.");
    } finally {
      setLoading(false); // Always stop loading whether success or error
    }
  };

  return (
    <section id="contact" className="section-wrapper">
      {/* ── Section Header ───────────────────────────────────────── */}
      <SectionTitle
        label="05 — Contact"
        title="Let's Work Together"
        subtitle="Have a project in mind or just want to say hi? I'd love to connect with you."
        align="center"
      />

      {/* ── Two Column Layout ───────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* ── LEFT: Contact Info ───────────────────────────────── */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
              Start a Conversation
            </h3>
            <p className="font-body text-text-secondary leading-relaxed">
              Whether it's a freelance project, a full-time role, a
              collaboration or just a technical chat — my inbox is always open.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: "email",
                label: "Email",
                value: profile.email,
                href: `mailto:${profile.email}`,
              },
              {
                icon: "location_on",
                label: "Location",
                value: profile.location,
                href: null,
              },
              {
                icon: "schedule",
                label: "Response",
                value: "Within 24 hours",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 card"
              >
                <Icon name={item.icon} size="md" className="text-accent" />
                <div>
                  <p className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-body text-accent hover:underline text-sm"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-body text-text-primary text-sm">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
              Also find me on
            </p>
            <div className="flex gap-3">
              {profile.socials.map((social: { name: string; url: string }) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card px-4 py-2 font-mono text-xs text-text-secondary hover:text-accent transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Contact Form ──────────────────────────────── */}
        <div className="card p-8">
          {/* ── SUCCESS STATE ──────────────────────────────────── */}
          {success ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
              {/* Animated check icon circle */}
              <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center animate-fade-in">
                <Icon name="check_circle" size="lg" className="text-accent" />
              </div>

              <h3 className="font-display text-2xl font-bold text-accent">
                Message Sent!
              </h3>
              <p className="font-body text-text-secondary">
                Thanks for reaching out. Brian will get back to you within 24
                hours.
              </p>
              <Button variant="outline" onClick={() => setSuccess(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            // ── FORM STATE ──────────────────────────────────────
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              {/* Name + Email — side by side on larger screens */}
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your Name" error={errors.name}>
                  <input
                    type="text"
                    name="name" // Must match ContactForm key
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </Field>

                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Subject */}
              <Field label="Subject" error={errors.subject}>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project collaboration, job opportunity..."
                  className={inputClass}
                />
              </Field>

              {/* Message */}
              <Field label="Message" error={errors.message}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or what you have in mind..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* API Error */}
              {apiError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="font-mono text-xs text-red-400">{apiError}</p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                {loading ? "Sending..." : "Send Message →"}
              </Button>

              <p className="font-mono text-xs text-text-muted text-center">
                I typically respond within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
export default Contact;
