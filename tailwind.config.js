module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Fixed the path pattern
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      animation: {
        ping: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        ping: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '70%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      colors: {
        // Custom colors for dark mode
        darkbg: {
          900: '#121212', // Main dark background
          800: '#1e1e1e', // Slightly lighter dark background
          700: '#2d2d2d', // Card backgrounds
        },
        darktext: {
          100: '#e0e0e0', // Primary text in dark mode
          200: '#a0a0a0', // Secondary text in dark mode
        }
      },
    },
  },
  plugins: [],
}