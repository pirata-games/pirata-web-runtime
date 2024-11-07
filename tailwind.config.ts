import { type Config } from 'tailwindcss';
import unimportant from 'tailwindcss/unimportant';

export default {
  content: [],
  plugins: [unimportant],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'sans-serif'],
        merriweather: ['Merriweather', 'sans-serif'],
        pirata: ['Pirata One', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        landscape: { raw: '(orientation: landscape)' },
      },
    },
  },
} satisfies Config;
