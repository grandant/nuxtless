import type { DropdownMenuItem } from "@nuxt/ui";

export function useLangSwitcher() {
  const { locales, locale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const localeItems = computed<DropdownMenuItem[]>(() =>
    locales.value.map((localeItem) => ({
      label: localeItem.name,
      active: locale.value === localeItem.code,
      onSelect: () => {
        window.location.assign(switchLocalePath(localeItem.code));
      },
    })),
  );

  const currentLocaleName = computed(
    () =>
      locales.value.find((localeItem) => localeItem.code === locale.value)
        ?.name,
  );

  return {
    localeItems,
    currentLocaleName,
  };
}
