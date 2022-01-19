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
          50: 'hsl(51 100% 71%)',
          300: 'hsl(41 40% 60%)',
          600: 'hsl(41 30% 40%)',
          900: 'hsl(37 18% 28%)',
        },
        taiyaki: {
          300: 'hsl(52 100% 64%)',
          400: 'hsl(37 96% 68%)',
          500: 'hsl(36 95% 59%)',
          600: 'hsl(28 92% 57%)',
          700: 'hsl(20 67% 47%)',
        },
        sakura: {
          100: 'hsl(353 75% 95%)',
          200: 'hsl(351 100% 91%)',
          300: 'hsl(358 83% 82%)',
          400: 'hsl(353 65% 67%)',
          500: 'hsl(353 65% 33%)',
          900: 'hsl(9 22% 30%)',
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
