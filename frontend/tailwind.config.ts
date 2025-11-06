import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1d3557',
          dark: '#14213d',
          light: '#2d4567',
        },
        accent: {
          DEFAULT: '#f9c41a',
          dark: '#e0b010',
          light: '#ffd54f',
        },
        background: {
          DEFAULT: '#ffffff',
          light: '#f0f2f9',
        },
        success: '#4caf50',
        error: '#f44336',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
