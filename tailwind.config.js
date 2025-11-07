/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(222, 89%, 55%)',
        'primary-hover': 'hsl(222, 89%, 60%)',
        background: 'hsl(210, 40%, 98%)',
        surface: 'hsl(0, 0%, 100%)',
        text: 'hsl(215, 28%, 17%)',
        'text-secondary': 'hsl(217, 19%, 35%)',
        'text-muted': 'hsl(215, 16%, 47%)',

        'dark-primary': 'hsl(217, 91%, 60%)',
        'dark-primary-hover': 'hsl(217, 91%, 65%)',
        'dark-background': 'hsl(222, 47%, 11%)',
        'dark-surface': 'hsl(220, 35%, 16%)',
        'dark-text': 'hsl(210, 40%, 98%)',
        'dark-text-secondary': 'hsl(215, 20%, 65%)',
        'dark-text-muted': 'hsl(217, 33%, 80%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
    },
  },
  plugins: [],
}
