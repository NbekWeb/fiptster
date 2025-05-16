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
          220: "#2A2D32",
          280: "#282B30",
          300: "#32363C",
          350: "#353535",
          500: "#535559",
          555: "#555555BF",
        },
        red: {
          500: "#EB6578",
          600: "#FF3131",
        },
        grey: {
          500: "#C7C7C7",
          600:'#6C6C6C'
        },
      },
      fontSize: {
        7: "7px",
        15: "15px",
        min: "10px",
        40: "40px",
      },
      lineHeight: {
        "3xl": "32px",
      },
      spacing: {
        3.75: "15px",
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
        21: "84px",
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
