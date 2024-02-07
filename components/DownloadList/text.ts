/**
 * @typedef {"ru"} DefaultLocale
 * @typedef {DefaultLocale | "en" | "uk"} Locale
 */

export const version = {
  en: "Build",
  uk: "Збірка",
  ru: "Сборка",
};

/** @type {Readonly<Record<Locale, string>>} */
export const setup = {
  en: "Installation wizard",
  uk: "Майстер встановлення",
  ru: "Мастер установки",
};

/** @type {Readonly<Record<Locale, string>>} */
export const unpacked = {
  en: "ZIP Archive",
  uk: "ZIP-Архів",
  ru: "ZIP-Архив",
};

/** @type {Readonly<Record<Locale, string>>} */
export const ver = {
  en: "Build",
  uk: "Build",
  ru: "Build",
};
