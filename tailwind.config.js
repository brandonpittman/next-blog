const fancy = require("tailwindcss-plugin-fancy");
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const defaultTheme = require("tailwindcss/defaultTheme");

const whitelist = [/markdown/, /rich-text/, /primary/, /secondary/];

module.exports = {
  purge: {
    options: {
      keyframes: true,
      safelist: whitelist,
    },
    content: [
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./src/pages/**/*.{mdx,js,jsx,ts,tsx}",
      "./content/**/*.{md,mdx}",
    ],
  },

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
          },
        },
        lg: {
          css: {
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
          },
        },
      },
      // fontFamily: {
      //   sans: ["Inter", ...defaultTheme.fontFamily.sans],
      // },
    },
    container: { center: true, padding: "1rem" },
  },

  variants: {},

  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".float-label": {
          position: "relative",
          display: "flex",
          alignItems: "center",
          paddingTop: "2rem",
          "& span": {
            position: "absolute",
            transform: "translateX(.75rem)",
            transition: "transform 150ms ease-in-out, color 150ms ease-in-out",
            transformOrigin: "0%",
            fontWeight: 700,
          },
          "& input:not(:placeholder-shown) ~ span": {
            transform: "scale(.9) translateX(.75rem) translateY(-2.25rem)",
          },
          "&:focus-within span": {
            transform: "scale(.9) translateX(.75rem) translateY(-2.25rem)",
            color: theme("colors.key"),
          },
        },
      });
    },
    function ({ addBase }) {
      addBase({
        ".markdown": {
          "img, pre": {
            marginLeft: "-1rem",
            marginRight: "-1rem",
            "@media (min-width: 640px)": {
              marginLeft: "0",
              marginRight: "0",
            },
          },
        },
      });
    },
    fancy,
    typography,
    forms,
  ],
};
