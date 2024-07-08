const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(66, 114, 66, 1)",
        background: "#ECECEC",
        background_bl: "#252725",
        secondary: "#071407",

      },
    },
  },
  plugins: [],
});
