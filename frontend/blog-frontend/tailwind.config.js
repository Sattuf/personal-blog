/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // A vibrant blue-purple
        secondary: "#8B5CF6", // A complementary purple
        accent: "#EC4899", // A bright pink for accents
        background: "#F9FAFB", // Light background
        foreground: "#1F2937", // Dark foreground text
        muted: "#6B7280", // Muted text
        "muted-foreground": "#9CA3AF", // Lighter muted text
      },
    },
  },
  plugins: [],
}
