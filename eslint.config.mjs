// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default withNuxt(
  // Your custom configs here
  eslintConfigPrettier,

  {
    files: [
      "src/app/pages/**/*.vue",
      "src/app/layouts/**/*.vue",
      "src/base/pages/**/*.vue",
      "src/base/layouts/**/*.vue",
    ],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
);
