import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",   // your app folder
    "./src/components/**/*.{js,ts,jsx,tsx}",  // if you have components folder
    "./src/pages/**/*.{js,ts,jsx,tsx}",  // if you have any pages folder
    "./src/**/*.{js,ts,jsx,tsx}",  // optional, if you want to scan all TS files under src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
