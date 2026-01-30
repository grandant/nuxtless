import type { DropdownMenuItem } from "@nuxt/ui";

export function useLangSwitcher(appLocales?: string[]) {
  const appConfig = useAppConfig();
  const listLocales = useState(
    "appLocales",
    () => appLocales ?? appConfig.appLocales,
  );
  const { locales, locale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const localeItems = computed<DropdownMenuItem[]>(() =>
    locales.value
      .filter((l) => listLocales.value.includes(l.code))
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
