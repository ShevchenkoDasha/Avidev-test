import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"], // заголовки
        sans: ["var(--font-sans)"], // body
        mono: ["var(--font-mono)"], // код / цифри
      },
      colors: {
        // Backgrounds
        "bg-primary": "var(--color-bg-primary)", // #09090b
        "bg-secondary": "var(--color-bg-secondary)", // #18181b
        surface: "var(--color-surface)", // #27272a

        // Text
        "text-primary": "var(--color-text-primary)", // #fafafa
        "text-secondary": "var(--color-text-secondary)", // #a1a1aa

        //Notification
        "red-secondary": "var(--color-red-secondary)", // #D32F2F
        "green-primary": "var(--color-primary)", // reuse primary

        // Brand / Accent
        primary: "var(--color-primary)", // #166534
        "primary-hover": "var(--color-primary-hover)", // #15803d
        accent: "var(--color-accent)", // #4ade80
        alert: "var(--color-alert)", // #f97316

        // Borders
        border: "var(--color-border)", // #3f3f46
      },
      boxShadow: {
        "focus-accent": "0 0 0 3px var(--color-focus-ring)",
      },
      // spacing: {
      //   header: "var(--header-height)",
      // },
    },
  },
};

export default config;
