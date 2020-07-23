const ui = require("@tailwindcss/ui");
const defaultTheme = require("tailwindcss/defaultTheme");
const whitelist = [/markdown/, /rich-text/, /primary/, /secondary/];

const utilities = {
  ".visuallyhidden": {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    opacity: "0",
    overflow: "hidden",
    textIndent: "-9999px",
    zIndex: "0"
  }
};

module.exports = {
  purge: {
    options: {
      keyframes: true,
      whitelistPatterns: whitelist,
      whitelistPatternsChildren: whitelist
    },
    content: [
      "./src/components/**/*.j{s,sx}",
      "./src/pages/**/*.{mdx,js}",
      "./content/**/*.md"
    ]
  },

  theme: {
    typography: {
      default: {
        css: {
          a: {
            color: "rgb(0, 112, 243)",
            "&:hover": {
              color: "rgba(0, 112, 243, 0.8)"
            }
          }
        }
      }
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        key: "rgb(0, 112, 243)"
      }
    },
    container: { center: true, padding: "1rem" }
  },

  variants: {},

  plugins: [
    function({ addBase, addUtilities }) {
      addBase({
        ".markdown": {
          "img, pre": {
            marginLeft: "-1rem",
            marginRight: "-1rem",
            "@media (min-width: 640px)": {
              marginLeft: "0",
              marginRight: "0"
            }
          }
        }
      });
      addUtilities(utilities);
    },
    ui
  ]
};
