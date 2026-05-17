/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#fbf9f5',
        'surface-low': '#f5f3ef',
        'surface-card': '#ffffff',
        primary: '#755b00',
        saffron: '#f4c430',
        secondary: '#904d00',
        ink: '#1b1c1a',
        muted: '#4e4634',
        outline: '#d1c5ad',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1100px',
      },
      boxShadow: {
        warm: '0 22px 70px rgba(62,39,35,.12)',
        soft: '0 10px 34px rgba(62,39,35,.08)',
      },
    },
  },
  plugins: [],
};
