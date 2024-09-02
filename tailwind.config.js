// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        neutral: "var(--neutral-color)",
        error: "var(--error-color)",
        card: "var(--card-color)",
        cardHover: "var(--card-color-hover)",
      },
      fontFamily: {
        base: "var(--font-family)",
      },
      fontSize: {
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        sm: "var(--font-size-sm)",
        xl: "var(--font-size-xl)",
      },
      lineHeight: {
        base: "var(--line-height-base)",
      },
      fontWeight: {
        normal: "var(--font-weight-normal)",
        bold: "var(--font-weight-bold)",
      },
      spacing: {
        small: "var(--padding-small)",
        base: "var(--padding-base)",
        lg: "var(--padding-lg)",
        xl: "var(--padding-xl)",
        marginSmall: "var(--margin-small)",
        margin: "var(--margin-base)",
        marginLg: "var(--margin-lg)",
        marginXl: "var(--margin-xl)",
        marginXxl: "var(--margin-xxl)",
        marginAvoidHeader: "var(--margin-avoid-header)",
        gap: "var(--gap-base)",
      },
      borderRadius: {
        small: "var(--border-radius-small)",
        base: "var(--border-radius-base)",
      },
      borderWidth: {
        base: "var(--border-width-base)",
      },
      borderColor: {
        base: "var(--border-color-base)",
        hover: "var(--border-color-hover)",
      },
      boxShadow: {
        base: "var(--box-shadow-base)",
      },
      transitionDuration: {
        base: "var(--transition-base)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
        sidebarSlide: "var(--sidebar-slide-width)",
        miniSidebarMarginLeft: "var(--mini-sidebar-margin-left)",
      },
    },
  },
  plugins: [],
};

/* Example usage of custom style variables in Tailwind:
  <div class="bg-primary text-secondary">
    This is a div with primary background and secondary text color.
  </div>
*/
