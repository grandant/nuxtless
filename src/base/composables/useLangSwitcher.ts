import type { DropdownMenuItem } from "@nuxt/ui";

export function useLangSwitcher(
  appLocales: string[] = ["bg", "ru", "de", "en", "es", "fr", "it", "pt"],
) {
  const { locales, locale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const localeItems = computed<DropdownMenuItem[]>(() =>
    locales.value
      .filter((l) => appLocales.includes(l.code))
      .map((l) => ({
        label: l.name,
        to: switchLocalePath(l.code),
      })),
  );

  const currentLocaleName = computed(
    () => locales.value.find((l) => l.code === locale.value)?.name,
  );

  return {
    localeItems,
    currentLocaleName,
  };
}
