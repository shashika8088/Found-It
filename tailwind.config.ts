import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'dark-background': 'var(--dark-background)',
        text: 'var(--text)',
        'dark-text': 'var(--dark-text)',
        'text-secondary': 'var(--text-secondary)',
        'dark-text-secondary': 'var(--dark-text-secondary)',
        'dark-surface': 'var(--dark-surface)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
