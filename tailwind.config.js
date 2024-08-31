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
        card: "var(--card-color)", // added
        cardHover: "var(--card-color-hover)", // added
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
        small: "var(--padding-small)", // added
        base: "var(--padding-base)",
        lg: "var(--padding-lg)", // added
        xl: "var(--padding-xl)", // added
        marginSmall: "var(--margin-small)",
        marginBase: "var(--margin-base)",
        marginLg: "var(--margin-lg)", // added
        marginXl: "var(--margin-xl)", // added
        marginXxl: "var(--margin-xxl)", // added
        marginAvoidHeader: "var(--margin-avoid-header)", // added
        gap: "var(--gap-base)",
      },
      borderRadius: {
        small: "var(--border-radius-small)", // added
        base: "var(--border-radius-base)",
      },
      borderWidth: {
        base: "var(--border-width-base)",
      },
      borderColor: {
        base: "var(--border-color-base)",
        hover: "var(--border-color-hover)", // added
      },
      boxShadow: {
        base: "var(--box-shadow-base)",
      },
      transitionDuration: {
        base: "var(--transition-base)", // added
      },
      width: {
        sidebar: "var(--sidebar-width)", // added
        sidebarSlide: "var(--sidebar-slide-width)", // added
        miniSidebarMarginLeft: "var(--mini-sidebar-margin-left)", // added
      },
      screens: {
        xxs: "var(--breakpoint-xxs)", // added
        xs: "var(--breakpoint-xs)", // added
        sm: "var(--breakpoint-sm)",
        md: "var(--breakpoint-md)",
        lg: "var(--breakpoint-lg)",
        xl: "var(--breakpoint-xl)",
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
