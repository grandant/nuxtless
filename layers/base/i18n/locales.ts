import type { AppLocale } from "~~/types/general";

export const availableLocales: AppLocale[] = [
  { code: "en", language: "en-US", file: "en-US.ts", name: "English 🇺🇸" },
  { code: "bg", language: "bg-BG", file: "bg-BG.ts", name: "Български 🇧🇬" },
  { code: "ru", language: "ru-RU", file: "ru-RU.ts", name: "Русский 🇷🇺" },
  {
    code: "fa",
    language: "fa-IR",
    file: "fa-IR.ts",
    name: "فارسی 🇮🇷",
    dir: "rtl",
  },
  { code: "de", language: "de-DE", file: "de-DE.ts", name: "Deutsch 🇩🇪" },
  { code: "es", language: "es-ES", file: "es-ES.ts", name: "Español 🇪🇸" },
  { code: "fr", language: "fr-FR", file: "fr-FR.ts", name: "Français 🇫🇷" },
  { code: "it", language: "it-IT", file: "it-IT.ts", name: "Italiano 🇮🇹" },
  { code: "pt", language: "pt-BR", file: "pt-BR.ts", name: "Português 🇧🇷" },
];

function getEnabledLocales(): string[] | null {
  const value = process.env.APP_LOCALES?.trim();
  if (!value) return null;

  return value
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);
}

export const appLocales: AppLocale[] = (() => {
  const enabledLocales = getEnabledLocales();
  if (!enabledLocales) return availableLocales;

  return availableLocales.filter((locale) =>
    enabledLocales.includes(String(locale.code)),
  );
})();
