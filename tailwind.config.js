/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zone-based theming via CSS variables
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      animation: {
        'card-hover': 'cardHover 0.2s ease-in-out',
        'progress-fill': 'progressFill 0.5s ease-out',
      },
      keyframes: {
        cardHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-4px) scale(1.02)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--fill-width)' },
        },
      },
    },
  },
  plugins: [],
}