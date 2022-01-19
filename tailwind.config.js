module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif TC', 'serif'],
        sans: ['Noto Sans TC', 'sans'],
      },
      colors:{
        metalic: {
          50: 'hsl(50 100% 75%)',
          300: 'hsl(40 50% 60%)',
          600: 'hsl(40 40% 40%)',
          900: 'hsl(36 30% 25%)',
        },
        taiyaki: {
          300: 'hsl(50 100% 60%)',
          400: 'hsl(36 90% 70%)',
          500: 'hsl(36 100% 60%)',
          600: 'hsl(28 100% 60%)',
          700: 'hsl(20 80% 40%)',
        },
        sakura: {
          100: 'hsl(350 90% 95%)',
          200: 'hsl(350 100% 90%)',
          300: 'hsl(350 95% 80%)',
          400: 'hsl(350 85% 68%)',
          500: 'hsl(350 80% 35%)',
          900: 'hsl(350 30% 30%)',
        },
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
