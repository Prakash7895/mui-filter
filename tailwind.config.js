import { tagsColor } from './src/utils';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  safelist: Object.keys(tagsColor).map(
    (el) => `${tagsColor[el].dot} ${tagsColor[el].badge.split(' ').join(' !')}`
  ),
};
