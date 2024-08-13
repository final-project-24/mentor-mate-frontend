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
        base: "var(--padding-base)",
        margin: "var(--margin-base)",
        gap: "var(--gap-base)",
      },
      borderRadius: {
        base: "var(--border-radius-base)",
      },
      borderWidth: {
        base: "var(--border-width-base)",
      },
      borderColor: {
        base: "var(--border-color-base)",
      },
      boxShadow: {
        base: "var(--box-shadow-base)",
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
