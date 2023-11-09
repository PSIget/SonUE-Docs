import { NextRouter, useRouter } from "next/router";

type DefaultLocale = "ru";
type Locale = DefaultLocale | "uk" | "en";

interface ILocaleMap<T> {
  [key: string]: T;
}

interface ITypedRouter
  extends Omit<NextRouter, "locale" | "locales" | "defaultLocale"> {
  locale?: Locale;
  locales?: Locale[];
  defaultLocale?: DefaultLocale;
}

const isObject = (item: any): item is ILocaleMap<any> => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export default function useLocalesMap<T>(localesMap: ILocaleMap<T> | T[]): T {
  const router = useRouter() as ITypedRouter;
  const { locale = "", defaultLocale = "" } = router;

  if (!localesMap || (!isObject(localesMap) && !Array.isArray(localesMap))) {
    throw new TypeError("Locales map must be an object or an array");
  }

  if (Array.isArray(localesMap)) {
    return localesMap as T;
  }

  if (
    defaultLocale &&
    isObject(localesMap) &&
    !localesMap.hasOwnProperty(defaultLocale)
  ) {
    throw new Error(
      `Locales map must contain default locale "${defaultLocale}"`
    );
  }

  if (
    locale &&
    isObject(localesMap) &&
    localesMap.hasOwnProperty(locale) &&
    typeof localesMap[locale] !== typeof localesMap[defaultLocale]
  ) {
    throw new Error(
      `Invalid locales map: Shape of "${locale}" must be the same as "${defaultLocale}"`
    );
  }

  if (
    isObject(localesMap) &&
    ["string", "number", "symbol"].includes(typeof localesMap[defaultLocale])
  ) {
    return localesMap[locale] || localesMap[defaultLocale];
  }

  return JSON.parse(
    JSON.stringify(localesMap[defaultLocale]),
    (_key, value) => {
      if (typeof value === "string") {
        return value.replace(/\\n/g, "\n");
      }
      return value;
    }
  );
}
