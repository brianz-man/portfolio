// server/index.ts
//
// ─── THE EXPRESS BACKEND ──────────────────────────────────────────────────────
// This is a minimal Express.js server with ONE job:
// Handle contact form submissions from the portfolio frontend.
//
// WHY DO WE NEED A BACKEND?
// You cannot send emails from the browser (security risk).
// The frontend POSTs form data to this server → this server sends the email.
//
// STRUCTURE:
//   POST /api/contact → Receives form data, validates it, sends email
//   GET  /api/health  → Health check (useful for deployment monitoring)
//
// TECH USED:
//   express     → Web framework
//   cors        → Allows our frontend (port 5173) to talk to this server (port 4000)
//   nodemailer  → Sends emails
//   dotenv      → Loads .env variables (email credentials, etc.)
// ─────────────────────────────────────────────────────────────────────────────

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load .env file into process.env
dotenv.config()

const app  = express()
const PORT = process.env.PORT ?? 4000

// ── Middleware ────────────────────────────────────────────────────────────────
// Middleware runs on EVERY request before it reaches a route handler.

// CORS: Allow only our frontend origin to make requests
app.use(cors({
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))

// Parse incoming JSON request bodies
// Without this, req.body would be undefined
app.use(express.json())

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check — call GET /api/health to confirm server is running
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Contact form handler
// Called when the frontend POSTs to /api/contact
app.post('/api/contact', async (req: Request, res: Response) => {
  // 1. Extract data from request body
  const { name, email, subject, message } = req.body

  // 2. Basic validation — check all required fields exist
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required.',
    })
  }

  // 3. Validate email format with a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email address.',
    })
  }

  try {
    // 4. Here you would add Nodemailer to send the email.
    //    For now we log to console and return success.
    //    To add email: npm install nodemailer @types/nodemailer
    //    Then use nodemailer.createTransport() with your SMTP credentials.
    console.log('New contact form submission:')
    console.log({ name, email, subject, message })

    // TODO: Replace this console.log with actual email sending:
    // await transporter.sendMail({
    //   from: `"${name}" <${email}>`,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `[Portfolio] ${subject}`,
    //   text: message,
    // })

    // 5. Return success response to frontend
    res.status(200).json({
      success: true,
      message: 'Message received! Brian will get back to you soon.',
    })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again.',
    })
  }
})

// ── Global Error Handler ──────────────────────────────────────────────────────
// Catches any errors thrown inside route handlers
// The 4-parameter signature (err, req, res, next) is how Express knows
// this is an error handler — do NOT remove the `next` parameter.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ success: false, error: 'Internal server error' })
})

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`)
  console.log(` Health check: http://localhost:${PORT}/api/health\n`)
})

