import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import Logo from "./components/logo";
import useLocalesMap from "./components/use-locales-map";
import {
  editTextMap,
  feedbackLinkMap,
  footerTextMap,
  gitTimestampMap,
  headDescriptionMap,
  languageMap,
  searchPlaceholderMap,
  tableOfContentsTitleMap,
  titleMap,
} from "./translations/text";

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
const themeConfig = {
  project: {
    link: "https://github.com/psiget/s2ue-docs",
  },
  docsRepositoryBase: "https://github.com/psiget/s2ue-docs/blob/main",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – STALKER2UE",
    };
  },
  toc: {
    float: true,
    title: () => useLocalesMap(tableOfContentsTitleMap),
  },
  search: {
    placeholder: () => useLocalesMap(searchPlaceholderMap),
  },
  editLink: {
    text: () => useLocalesMap(editTextMap),
  },
  feedback: {
    content: () => useLocalesMap(feedbackLinkMap),
  },
  logo: () => {
    const title = useLocalesMap(titleMap);
    return (
      <>
        <Logo height={12} />
        <span
          className="mx-2 font-bold hidden md:inline select-none"
          title={`STALKER2UE: ${title}`}
        >
          STALKER2UE
        </span>
      </>
    );
  },
  head: () => {
    const { route, locales, locale } = useRouter();
    const { frontMatter, title } = useConfig();
    const titleSuffix = useLocalesMap(titleMap);
    const description = useLocalesMap(headDescriptionMap);

    // const imageUrl = new URL("https://og.s2ue.org");

    // if (!/\/index\.+/.test(route)) {
    //   imageUrl.searchParams.set("title", title || titleSuffix);
    // }


    const imageUrl = new URL("https://s2ue.org/favicon/og-image.png");

    if (!/\/index\.+/.test(route)) {
      imageUrl;
    }

    const contentLanguage = locales.join(", ");
    const ogTitle = title ? `${title} – STALKER2UE` : `STALKER2UE: ${titleSuffix}`;
    const ogDescription = frontMatter.description || description;
    const ogImage = frontMatter.image || imageUrl.toString();

    return (
      <>
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta httpEquiv="Content-Language" content={contentLanguage} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="STALKER2UE" />
        <meta name="description" content={ogDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content={locale} />
        {locales
          .filter((l) => l !== locale)
          .map((l) => (
            <meta property="og:locale:alternate" content={l} key={l} />
          ))}
          <link rel="alternate" hreflang="x-default" href="https://s2ue.org/" />
          <link rel="alternate" hreflang="en" href="https://s2ue.org/en" />
          <link rel="alternate" hreflang="ua" href="https://s2ue.org/ua" />
      </>
    );
  },
  footer: {
    text: () => {
      const { utmSource, text, suffix } = useLocalesMap(footerTextMap);

      return (
        <span>STALKER2UE</span>
      );
    },
  },
  gitTimestamp({ timestamp }) {
    const { locale } = useRouter();
    const lastUpdatedOn = useLocalesMap(gitTimestampMap);

    return (
      <>
        {lastUpdatedOn}{" "}
        <time dateTime={timestamp.toISOString()}>
          {timestamp.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </>
    );
  },
  i18n: Object.entries(languageMap).map(([locale, text]) => ({
    locale,
    text,
  })),
};

export default themeConfig;
