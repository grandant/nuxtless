import { describe, expect, it, vi } from "vitest";

function collectKeys(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (entry && typeof entry === "object") {
      return collectKeys(entry, path);
    }

    return [path];
  });
}

describe("locale messages", () => {
  it("keeps all locales message keys aligned", async () => {
    vi.stubGlobal("defineI18nLocale", <T>(loader: () => T) => loader);

    const locales = await Promise.all([
      import("./en-US"),
      import("./bg-BG"),
      import("./ru-RU"),
      import("./fa-IR"),
      import("./de-DE"),
      import("./es-ES"),
      import("./fr-FR"),
      import("./it-IT"),
      import("./pt-BR"),
    ]);

    const [reference, ...others] = locales.map((locale) =>
      collectKeys(Object.values(locale)[0] as object).sort(),
    );

    for (const keys of others) {
      expect(keys).toEqual(reference);
    }
  });
});
