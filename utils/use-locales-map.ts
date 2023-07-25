import { useRouter } from "next/router";

/**
 * @typedef {"ru"} DefaultLocale
 * @typedef {DefaultLocale | "uk" | "en"} Locale
 * @typedef {{locale?: Locale | undefined; locales?: Locale[] | undefined; defaultLocale?: DefaultLocale | undefined}} TypedRouter
 * @typedef {Omit<import('next/router').NextRouter, "locale" | "locales" | "defaultLocale"> & TypedRouter} NextRouter
 * @template T
 * @type {(localesMap: Record<Locale, T>) => T}
 */
export default function useLocalesMap(localesMap) {
  /** @type {NextRouter} */
  const router = useRouter();
  const { locale, defaultLocale } = router;
  if (!localesMap) {
    throw new Error("Pass a locales map as argument to useLocalesMap");
  }

  if (!isObject(localesMap)) {
    throw new Error("Locales map must be an object");
  }

  if (!localesMap.hasOwnProperty(defaultLocale)) {
    throw new Error(
      `Locales map must contain default locale "${defaultLocale}"`
    );
  }

  if (
    localesMap.hasOwnProperty(locale) &&
    typeof localesMap[locale] !== typeof localesMap[defaultLocale]
  ) {
    throw new Error(
      `Invalid locales map: Shape of "${locale}" must be the same as "${defaultLocale}"`
    );
  }

  if (["string", "number", "symbol"].includes(typeof localesMap[defaultLocale])) {
    return localesMap[locale] || localesMap[defaultLocale];
  }

  return JSON.parse(JSON.stringify(localesMap[defaultLocale]), (key, value) => {
    if (typeof value === "string") {
      return value.replace(/\\n/g, "\n");
    }
    return value;
  });
}

/**
 * Simple object check.
 * @param {any} item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
