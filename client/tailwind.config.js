/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        awelier: ['Awelier'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['coffee'],
  },
};
