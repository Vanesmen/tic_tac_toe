// Копирует файл postcss.config.mjs, так как без него не работает Tailwind CSS IntelliSense
const config = {
  theme: {
    extend: {
      lineHeight: {
        tight: "1.2"
      }
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
