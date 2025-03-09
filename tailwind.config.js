module.exports = {
  content: [
    "./src/*/.{js,jsx,ts,tsx}",
  ],
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
    },
  },
  plugins: [],
}