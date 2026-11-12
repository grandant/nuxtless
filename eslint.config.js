import withNuxt from "./.playground/.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default withNuxt(eslintConfigPrettier, {
  rules: {
    "vue/no-multiple-template-root": "off",
    "nuxt/nuxt-config-keys-order": "error",
    // "vue/max-attributes-per-line": ["error", { singleline: 3 }],
  },
});
