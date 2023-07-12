/**
 * @typedef {"ru"} DefaultLocale
 * @typedef {DefaultLocale | "en" | "uk"} Locale
 */

/** @type {Readonly<Record<Locale, string>>} */
export const languageMap = {
  "en": "English",
  "uk": "Українська",
  "ru": "Русский",
};

/** @type {Readonly<Record<Locale, string>>} */
export const titleMap = {
  "en": "Port of the original STALKER game trilogy to UE5",
  "uk": "Порт оригінальної трилогії ігор STALKER на UE5",
  "ru": "Порт оригинальной трилогии игр STALKER на UE5",
};

/** @type {Readonly<Record<Locale, string>>} */
export const headDescriptionMap = {
  "en": "This is a project to port the original S.T.A.L.K.E.R. game series to the Unreal Engine 5. It aims to recreate the post-apocalyptic atmosphere and gaming world that are characteristic of the S.T.A.L.K.E.R. series, using advanced Unreal Engine 5 technologies.",
  "uk": "Це проект з перенесення оригінальної серії ігор S.T.A.L.K.E.R. на рушiй Unreal Engine 5. Він має на меті відтворити постапокаліптичну атмосферу та геймплейний світ, які є характерними для серії S.T.A.L.K.E.R., з використанням передових технологій Unreal Engine 5.",
  "ru": "Это проект по переносу оригинальной серии игр S.T.A.L.K.E.R. на движок Unreal Engine 5. Он призван воссоздать постапокалиптическую атмосферу и игровой мир, характерные для серии S.T.A.L.K.E.R., с использованием передовых технологий Unreal Engine 5.",
};

/** @type {Readonly<Record<Locale, { utmSource: string; text: string; suffix?: string | undefined }>>} */
export const footerTextMap = {
  "en": { utmSource: "s2ue", text: "Powered by" },
  "uk": { utmSource: "s2ue", text: "Працює на" },
  "ru": { utmSource: "s2ue", text: "Работает на" },
};

/** @type {Readonly<Record<Locale, string>>} */
export const feedbackLinkMap = {
  "en": "Question? Give us feedback →",
  "uk": "Запитання? Залишіть нам відгук →",
  "ru": "Вопросы? Оставьте нам отзыв →",
};

/** @type {Readonly<Record<Locale, string>>} */
export const editTextMap = {
  "en": "Edit this page on GitHub →",
  "uk": "Редагувати цю сторінку на GitHub →",
  "ru": "Редактировать эту страницу на GitHub →",
};

/** @type {Readonly<Record<Locale, string>>} */
export const tableOfContentsTitleMap = {
  "en": "On This Page",
  "uk": "На цій сторінці",
  "ru": "На этой странице",
};

/** @type {Readonly<Record<Locale, string>>} */
export const searchPlaceholderMap = {
  "en": "Search documentation...",
  "uk": "Шукати у документації...",
  "ru": "Искать в документации...",
};

/** @type {Readonly<Record<Locale, string>>} */
export const gitTimestampMap = {
  "en": "Last updated on",
  "uk": "Останнє оновлення",
  "ru": "Последнее обновление",
};

/** @type {Readonly<Record<Locale, string>>} */
export const build134AndEditor135Release = {
  "en": "🎉 Game and Editor Builds is released. Read more →",
  "uk": "🎉 Випущені збірки Ігри та Редактора. Читати далі →",
  "ru": "🎉 Выпущены сборки Игры и Редактора. Читать далее →",
};
