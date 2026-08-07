/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-bg-surface)',
        card: 'var(--color-bg-card)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          glow: 'var(--color-accent-glow)',
        },
        primary: {
          DEFAULT: 'var(--color-text-primary)',
          muted: 'var(--color-text-muted)',
          secondary: 'var(--color-text-secondary)',
        },
        border: 'var(--color-border)',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
