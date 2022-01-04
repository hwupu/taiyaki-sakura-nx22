module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif TC', 'serif'],
        sans: ['Noto Sans TC', 'sans'],
      },
      screens: {
        hd: '1921px',
      },
      maxWidth: {
        hd: '1920px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
