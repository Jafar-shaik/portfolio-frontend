// // tailwind.config.ts
// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
//         secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
//         destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
//         muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
//         accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
//         popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
//         card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
//         "hero-from": "hsl(var(--hero-gradient-from))",
//         "hero-to": "hsl(var(--hero-gradient-to))",
//         "skill-badge": "hsl(var(--skill-badge))",
//         "skill-badge-foreground": "hsl(var(--skill-badge-foreground))",
//         sidebar: {
//           DEFAULT: "hsl(var(--sidebar-background))",
//           foreground: "hsl(var(--sidebar-foreground))",
//           primary: "hsl(var(--sidebar-primary))",
//           "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
//           accent: "hsl(var(--sidebar-accent))",
//           "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
//           border: "hsl(var(--sidebar-border))",
//           ring: "hsl(var(--sidebar-ring))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
//         "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
//         "fade-up": { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
//         shake: { "0%, 100%": { transform: "translateX(0)" }, "20%": { transform: "translateX(-4px)" }, "40%": { transform: "translateX(4px)" }, "60%": { transform: "translateX(-4px)" }, "80%": { transform: "translateX(4px)" } },
//         "fly-plane": { "0%": { transform: "translate(0,0) rotate(0deg)" }, "25%": { transform: "translate(25%, -20%) rotate(10deg)" }, "50%": { transform: "translate(50%, 0) rotate(20deg)" }, "75%": { transform: "translate(75%, -10%) rotate(15deg)" }, "100%": { transform: "translate(95%, 0) rotate(25deg)" } },
//         "fly-plane-loop": {
//           "0%": { transform: "translate(0%,0%) rotate(0deg)" },
//           "25%": { transform: "translate(25%,-20%) rotate(10deg)" },
//           "50%": { transform: "translate(50%,0%) rotate(20deg)" },
//           "75%": { transform: "translate(75%,-10%) rotate(15deg)" },
//           "100%": { transform: "translate(95%,0%) rotate(25deg)" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//         "fade-up": "fade-up 0.8s ease-out forwards",
//         shake: "shake 0.5s ease-in-out",
//         "fly-plane": "fly-plane 5s ease-in-out forwards",
//         "fly-plane-loop": "fly-plane-loop 2s ease-in-out infinite",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };

// export default config;








import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        "hero-from": "hsl(var(--hero-gradient-from))",
        "hero-to": "hsl(var(--hero-gradient-to))",
        "skill-badge": "hsl(var(--skill-badge))",
        "skill-badge-foreground": "hsl(var(--skill-badge-foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shake: {
    "0%, 100%": { transform: "translateX(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-6px)" },
    "20%, 40%, 60%, 80%": { transform: "translateX(6px)" },
  },
  shine: {
    "0%": { "background-position": "200% 0" },
    "100%": { "background-position": "-200% 0" },
  },
},
animation: {
  shake: "shake 0.4s ease-in-out infinite",
  shine: "shine 1s linear infinite",
  "shake-shine": "shake 0.4s ease-in-out infinite, shine 1s linear infinite",
},
      backgroundSize: {
        "200%": "200% 100%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
