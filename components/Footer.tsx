import Link from "next/link";
import { ReactNode, ReactElement } from "react";
import cn from "classnames";
import { ThemeSwitch, LocaleSwitch } from "nextra-theme-docs";
import useLocalesMap from "utils/use-locales-map";
import { getPagesUnderRoute } from "nextra/context";

type Locale = "en" | "uk" | "ru";

function FooterLink({
  href,
  names,
}: {
  href: string;
  names: Record<Locale, string>;
}) {
  const classes =
    "text-sm text-[#666666] dark:text-[#888888] hover:text-gray-700 hover:dark:text-white transition";

  const localizedNames = useLocalesMap(names);

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {localizedNames}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {localizedNames}
    </Link>
  );
}

function FooterHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const classNames = `text-sm text-black dark:text-white ${className || ""}`;
  return <h3 className={classNames}>{children}</h3>;
}

function FooterHeaderLocalized({
  children,
  className,
}: {
  children: Record<Locale, string>;
  className?: string;
}) {
  const localizedHeader = useLocalesMap(children);
  const classNames = `text-sm text-black dark:text-white ${className || ""}`;

  return <h3 className={classNames}>{localizedHeader}</h3>;
}

const navigation = [
  {
    title: {
      ru: "Ресурсы",
      en: "Resources",
      uk: "Ресурси",
    },
    items: [
      {
        name: {
          ru: "Блог",
          en: "Blog",
          uk: "Блог",
        },
        href: "/blog",
      },
      // {
      //   name: {
      //     ru: "Релизы",
      //     en: "Releases",
      //     uk: "Релізи",
      //   },
      //   href: "/releases",
      // },
    ],
  },
  {
    title: {
      ru: "Игра",
      en: "Game",
      uk: "Гра",
    },
    items: [
      {
        name: {
          ru: "Установка",
          en: "Installation",
          uk: "Встановлення",
        },
        href: "/game/docs/install",
      },
      {
        name: {
          ru: "Оптимизация",
          en: "Optimization",
          uk: "Оптимізація",
        },
        href: "/game/docs/optimization",
      },
      {
        name: {
          ru: "FAQ",
          en: "FAQ",
          uk: "FAQ",
        },
        href: "/game/docs/faq",
      },
    ],
  },
  {
    title: {
      ru: "Редактор",
      en: "Editor",
      uk: "Редактор",
    },
    items: [
      {
        name: {
          ru: "Начало работы",
          en: "Getting Started",
          uk: "Початок роботи",
        },
        href: "/editor/docs/getting-started",
      },
      {
        name: {
          ru: "Импорт контента",
          en: "Importing Content",
          uk: "Імпорт контенту",
        },
        href: "/editor/docs/install-and-build/import-content",
      },
      {
        name: {
          ru: "Создание уровня",
          en: "Creating Levels",
          uk: "Створення рівнів",
        },
        href: "/editor/docs/examples/simple-level",
      },
    ],
  },
  {
    title: {
      ru: "Наполнение",
      en: "Content",
      uk: "Зміст",
    },
    items: [
      {
        name: {
          ru: "Начало работы",
          en: "Getting Started",
          uk: "Початок роботи",
        },
        href: "/filling/getting-started",
      },
      {
        name: {
          ru: "Markdown",
          en: "Markdown",
          uk: "Markdown",
        },
        href: "/filling/blocs/markdown",
      },
      {
        name: {
          ru: "Публикация",
          en: "Publishing",
          uk: "Публікація",
        },
        href: "/filling/public",
      },
    ],
  },
  {
    title: {
      ru: "Поддержка",
      en: "Support",
      uk: "Підтримка",
    },
    items: [
      {
        name: {
          ru: "Discord",
          en: "Discord",
          uk: "Discord",
        },
        href: "/discord",
      },
      {
        name: {
          ru: "Open Source",
          en: "Open Source",
          uk: "Відкритий код",
        },
        href: "/sources",
      },
      {
        name: {
          ru: "AP-PRO",
          en: "AP-PRO",
          uk: "AP-PRO",
        },
        href: "https://ap-pro.ru/forums/topic/3988-stalker%C2%A0na-unreal-engine-5",
      },
    ],
  },
  {
    title: {
      ru: "Юридическое",
      en: "Legal",
      uk: "Юридичне",
    },
    items: [
      {
        name: {
          ru: "Политика конф.",
          en: "Privacy Policy",
          uk: "Політика конф.",
        },
        href: "/legal/privacy",
      },
      {
        name: {
          ru: "Условия польз.",
          en: "Terms of Service",
          uk: "Умови корист.",
        },
        href: "/legal/terms",
      },
      {
        name: {
          ru: "Политика DMCA",
          en: "DMCA Policy",
          uk: "Політика DMCA",
        },
        href: "/legal/dmca",
      },
    ],
  },
];

interface Page {
  name: string;
  route: string;
  children?: Page[];
  meta?: any;
  frontMatter?: any;
}

function sortByDate(a: Page, b: Page) {
  return (
    new Date(b.frontMatter?.date).getTime() -
    new Date(a.frontMatter?.date).getTime()
  );
}

export function FooterContent() {
  const currentYear = new Date().getFullYear();
  const localizedFooterText = useLocalesMap({
    en: `Footer`,
    uk: `Підвал`,
    ru: `Подвал`,
  });
  const localizedRightsText = useLocalesMap({
    en: `© ${currentYear} Red Projects. All rights to the S.T.A.L.K.E.R. and X-Ray Engine belong to GSC Game World.`,
    uk: `© ${currentYear} Red Projects. Усі права на S.T.A.L.K.E.R. і X-Ray Engine належать GSC Game World.`,
    ru: `© ${currentYear} Red Projects. Все права на S.T.A.L.K.E.R. и X-Ray Engine принадлежат GSC Game World.`,
  });
  const localizedHeaderText = {
    en: `Latest blog post`,
    uk: `Останній запис у блозі`,
    ru: `Последняя запись в блоге`,
  };

  return (
    <div className="w-full" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {localizedFooterText}
      </h2>
      <div className="w-full py-8 mx-auto">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-1 gap-8 xl:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:gap-6">
              {navigation.map((category) => (
                <div className="mt-12 md:!mt-0" key={category.title.en}>
                  <FooterHeaderLocalized>
                    {category.title}
                  </FooterHeaderLocalized>
                  <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                    {category.items.map((item) => (
                      <li key={item.name.en}>
                        <FooterLink href={item.href} names={item.name} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {getPagesUnderRoute("/blog")
            .sort(sortByDate)
            .slice(0, 1)
            .map((page: Page) => (
              <Link key={page.route} href={page.route}>
                <div className="dark:bg-neutral-950 bg-neutral-100 mt-12 xl:!mt-0 p-6 overflow-hidden no-underline rounded-lg transition-all hover:opacity-80 border dark:border-neutral-400 dark:text-neutral-200 dark:hover:border-white dark:hover:text-white border-[#EAEAEA] text-neutral-800 hover:border-black hover:text-black">
                  <FooterHeader className="font-bold">
                    {page.meta.title || page.frontMatter.title || page.name}
                  </FooterHeader>
                  <p className="mt-4 text-sm text-gray-600 dark:text-[#888888] line-clamp-2  overflow-hidden">
                    {page.frontMatter.description}{" "}
                  </p>
                </div>
              </Link>
            ))}
        </div>
        <div className="pt-8 mt-8 sm:flex sm:items-center sm:justify-between">
          <p className="mt-4 text-xs text-gray-500 dark:text-[#888888] text-center">
            {localizedRightsText}
          </p>
          <p className="mt-4 text-xs text-gray-500 dark:text-[#888888] hover:text-gray-700 hover:dark:text-white transition text-center">
            <a href="mailto:dmca@s2ue.org">DMCA</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Footer({ menu }: { menu?: boolean }): ReactElement {
  return (
    <footer className="bg-[#FAFAFA] pb-[env(safe-area-inset-bottom)] relative dark:bg-[#171717]">
      <div
        className={cn(
          "mx-auto max-w-[90rem] py-2 px-4 flex gap-2",
          menu ? "flex" : "hidden"
        )}
      >
        <LocaleSwitch />
        <ThemeSwitch />
      </div>
      <hr className="dark:border-neutral-800" />
      <div
        className={cn(
          "mx-auto max-w-[90rem] py-12 flex justify-center md:justify-center text-black dark:text-white",
          "pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]"
        )}
      >
        <FooterContent />
      </div>
    </footer>
  );
}
