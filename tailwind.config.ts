import { type Config } from 'tailwindcss';
import unimportant from 'tailwindcss/unimportant';

export default {
  content: [],
  plugins: [unimportant],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pirata One', 'sans-serif'],
      },
      screens: {
        landscape: { raw: '(orientation: landscape)' },
      },
    },
  },
} satisfies Config;
