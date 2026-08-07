# 🚀 Varshit Jha — Interactive Portfolio OS & Dashboard

A modern, high-performance, recruiter-friendly **Portfolio OS** engineered with **React, TypeScript, Tailwind CSS, and shadcn/ui**. Instead of a long scrolling page, this application features a personal command center dashboard layout with smooth panel transitions, a recruiter command palette (`Cmd/Ctrl+K`), live GitHub REST API feeds, interactive project case study drawers, and a 3-mode theme engine.

---

## 🌟 Key Features

- 🎛️ **Portfolio OS Dashboard Architecture**: Compact sidebar navigation bar switching smoothly across 6 dedicated interactive surfaces (Overview, About, Skills, Projects, GitHub, Contact).
- ⌨️ **Recruiter Command Palette (`Cmd/Ctrl+K`)**: Press `Cmd+K` (or `Ctrl+K`) to instantly search views, jump to specific project case studies, copy contact info, or download resume PDF.
- 🐙 **Live GitHub REST API Feed**: Real-time profile metrics (Public Repos, Followers, Total Stars, Forks) with 30-minute `localStorage` TTL caching and skeleton loading states.
- 🎨 **3-Mode Theme Engine**: Seamlessly switch between **Dark (Midnight Purple)**, **Light (Slate Indigo)**, and **Cyberpunk (Neon Cyan)** themes with `localStorage` memory.
- 🚀 **Data-Driven Projects Explorer**: Filterable project grid with tech stack badges, GitHub source links, live demo actions, and expandable Quick View case study modals.
- 🛠️ **Categorized Skills Taxonomy**: Grouped engineering skills (`Frontend`, `Languages`, `Tools & CS Fundamentals`) with clear proficiency indicators.
- 📬 **Dual Email Delivery System**: Validated contact form using EmailJS REST API with seamless native `mailto:` fallback dispatching.

---

## 🛠️ Tech Stack Matrix

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS |
| **UI Primitives** | [shadcn/ui](https://ui.shadcn.com/) (`cmdk`, `Button`, `Card`, `Badge`, `Dialog`) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Email API** | [@emailjs/browser](https://www.emailjs.com/) |

---

## 📁 Repository Folder Structure

```text
portfolio/
├── public/
│   └── favicon.svg            # Custom vector favicon
├── src/
│   ├── components/            # Dashboard feature components
│   │   ├── CommandPalette.tsx # Recruiter Cmd+K modal
│   │   ├── DashboardLayout.tsx# Main OS layout & command sidebar
│   │   ├── Navbar.tsx         # Responsive header
│   │   ├── Toast.tsx          # Notification toast provider
│   │   ├── ui/                # Atomic shadcn UI primitives
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── command.tsx
│   │   │   ├── davincho-hero-1.tsx
│   │   │   └── dialog.tsx
│   │   └── panels/            # Switchable OS surfaces
│   │       ├── AboutPanel.tsx
│   │       ├── ContactPanel.tsx
│   │       ├── GitHubPanel.tsx
│   │       ├── HeroStage.tsx
│   │       ├── ProjectsExplorer.tsx
│   │       └── SkillsMatrix.tsx
│   ├── config/                # Environment configurations
│   │   └── email.ts           # EmailJS configuration wrapper
│   ├── data/                  # Single source of truth typed data
│   │   ├── projects.ts        # Typed Project[] schema
│   │   └── skills.ts          # Typed SkillCategory[] schema
│   ├── hooks/                 # Custom React data hooks
│   │   └── useGithubStats.ts  # GitHub REST API hook with caching
│   ├── lib/                   # Shared utility helpers
│   │   └── utils.ts           # cn() helper (clsx + tailwind-merge)
│   ├── App.tsx                # Main app entry & panel router
│   ├── index.css              # Tailwind CSS directives & theme variables
│   └── main.tsx               # DOM root mount
├── .env.example               # Clean environment variables template
├── .gitignore                  # Security hardened ignore list
├── index.html                 # HTML entry template
├── package.json               # Dependencies & scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite bundler configuration
```

---

## 🔑 Environment Variables Setup

Create a `.env` file in the root directory (based on `.env.example`):

```bash
cp .env.example .env
```

Add your EmailJS credentials (get yours at [dashboard.emailjs.com](https://dashboard.emailjs.com/)):

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

---

## 💻 Local Development Commands

### 1. Clone the repository
```bash
git clone https://github.com/varshitjha/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

---

## 🚀 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. Set Environment Variables in Vercel settings (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
4. Click **Deploy**!

### Deploying to Netlify
1. Connect your repository in [Netlify](https://app.netlify.com/).
2. Set Build Command: `npm run build` and Publish Directory: `dist`.
3. Configure Environment Variables under Site Configuration.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).