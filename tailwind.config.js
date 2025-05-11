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
          280: "#282B30",
          300: "#32363C",
          500: "#535559",
          555: "#555555BF",
        },
        red: {
          500: "#EB6578",
        },
        grey: {
          500: "#C7C7C7",
        },
      },
      fontSize: {
        7: "7px",
        min: "10px",
        40: "40px",
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
        25: "100px",
        8.5: "34px",
        12.5: "50px",
        7.5: "30px",
        21:'84px'
      },
      borderRadius: {
        10: "10px",
        50: "50px",
      },
      width: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
