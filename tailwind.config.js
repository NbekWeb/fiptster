module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      screens: {},
      colors: {
        blue: {
          500: "#3599EA",
        },
        dark: {
          200: "#2C2F35",
          500:'#535559'
        },
        red: {
          500: "#EB6578",
        },
      },
      fontSize: {
        'min':'10px'
      },
      lineHeight: {
        "3xl": "32px",
      },
      spacing: {
        13: "52px",
        15: "60px",
        17: "68px",
        30: "120px",
        80: "320px",
        28: "112px",
      },
      width: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
