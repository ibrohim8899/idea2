/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        border: 'var(--color-border)',
        muted: 'var(--color-muted)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
      },
    },
  },
  plugins: [],
}
