<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
``` -->

# Portfolio

A modern, dark-first developer portfolio built with React, TypeScript, TailwindCSS, and Express.js.

---

##  Project Structure

```
portfolio/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable atoms: Button, Badge, Card, etc.
│   │   │   ├── sections/    # Page sections: Hero, About, Skills, etc.
│   │   │   └── layout/      # Navbar, Footer
│   │   ├── context/         # ThemeContext (dark/light mode)
│   │   ├── data/            # All content data files
│   │   ├── hooks/           # Custom React hooks
│   │   ├── styles/          # globals.css (Tailwind base)
│   │   └── types/           # TypeScript interfaces
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── server/                  # Express.js backend
│   ├── index.ts             # Server entry point
│   └── package.json
│
├── .env.example             # Environment variable template
└── README.md
```

---

##  Getting Started

### Prerequisites

- Node.js v18+ installed
- npm or yarn

---

### 1. Clone / set up the project

```bash
# If using git
git init
git add .
git commit -m "initial scaffold"
```

---

### 2. Install frontend dependencies

```bash
cd client
npm install
```

---

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

---

### 4. Set up environment variables

```bash
# From the project root
cp .env.example server/.env
# Then edit server/.env with your email credentials
```

---

### 5. Run development servers

Open **two terminals**:

**Terminal 1 — Frontend:**

```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 — Backend:**

```bash
cd server
npm run dev
# Runs on http://localhost:4000
```

Open your browser at: **http://localhost:5173**

---

##  Customizing Content

All content is in `client/src/data/`:

| File            | What to edit                 |
| --------------- | ---------------------------- |
| `profile.ts`    | Name, bio, location, socials |
| `projects.ts`   | Your actual projects         |
| `skills.ts`     | Your tech skills + levels    |
| `experience.ts` | Work history                 |

---

## Changing the Color Scheme

Edit `client/tailwind.config.ts` → `theme.extend.colors`:

```ts
accent: {
  DEFAULT: '#00FFB2',  // Change this to your preferred accent color
  dim:     '#00CC8E',
  glow:    '#00FFB233',
},
```

---

## Building for Production

```bash
# Build frontend
cd client
npm run build
# Output goes to client/dist/

# Build backend
cd server
npm run build
# Output goes to server/dist/
```

---

## Deployment

| Service | What to deploy   |
| ------- | ---------------- |
| Vercel  | `client/` folder |
| Netlify | `client/dist/`   |
| Render  | `server/` folder |
| Railway | `server/` folder |

---

## Tech Stack

- **Frontend:** React 18, TypeScript, TailwindCSS, Vite, Framer Motion
- **Backend:** Express.js, TypeScript, Nodemailer
- **Fonts:** Syne (display), DM Sans (body), JetBrains Mono (code)
- **Icons:** React Icons

---

Built with ❤️ in Nairobi, Kenya 🇰🇪
