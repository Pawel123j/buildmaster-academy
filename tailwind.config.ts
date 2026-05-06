import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05050a",
        panel: "#10101c",
        violetline: "#7c3aed",
        plasma: "#c084fc",
        mint: "#70f0c8",
        warning: "#f9b45b"
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 58, 237, 0.28)",
        panel: "0 20px 80px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
