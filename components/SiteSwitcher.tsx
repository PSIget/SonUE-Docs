import cn from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import useLocalesMap from "utils/use-locales-map";

export type TurboSite = "editor" | "game";

type SiteSwitcherLinkProps = {
  href: string;
  text: string;
  isActive: boolean;
};

const gameLang = {
  ru: "Игра",
  en: "Game",
  uk: "Гра",
};

const editorLang = {
  ru: "Редактор",
  en: "Editor",
  uk: "Редактор",
};

export function useTurboSite(): TurboSite | undefined {
  const { pathname } = useRouter();

  if (pathname.startsWith("/index") || pathname.startsWith("/game")) {
    return "game";
  }

  if (pathname.startsWith("/editor")) {
    return "editor";
  }

  return undefined;
}

function SiteSwitcherLink({ href, text, isActive }: SiteSwitcherLinkProps) {
  const localizedNameGame = useLocalesMap(gameLang);
  const widthClass = text === localizedNameGame ? "w-[46px]" : "w-[78px]";

  const classes = cn(
    "py-1 transition-colors duration-300 inline-block cursor-pointer hover:text-black dark:hover:text-white",
    widthClass
  );

  const conditionalClasses = {
    "text-black dark:text-white": isActive,
  };

  return (
    <Link href={href} className={cn(classes, conditionalClasses)}>
      {text}
    </Link>
  );
}

function SiteSwitcher() {
  const site = useTurboSite();

  const localizedNameGame = useLocalesMap(gameLang);
  const localizedNameEditor = useLocalesMap(editorLang);

  return (
    <div className="relative flex items-center justify-between p-2 text-xl group">
      <span
        className={cn(
          "flex h-[34px] w-[134px] flex-shrink-0 items-center rounded-[8px] border border-[#dedfde] dark:border-[#333333] p-1 duration-300 ease-in-out",
          "after:h-[24px] after:w-[44px] after:rounded-[4px] dark:after:bg-[#333333] after:shadow-sm after:duration-300 after:border dark:after:border-[#333333] after:border-[#666666]/100 after:bg-[#333333] after:opacity-20 dark:after:opacity-100 dark:after:bg-none",
          "indeterminate:after:hidden",
          {
            "after:hidden": !site,
            "": site === "game",
            "after:!w-[76px] after:translate-x-[48px]": site === "editor",
          }
        )}
      />

      <span
        className={cn(
          "z-50 absolute p-1 text-sm flex justify-between text-center w-[134px] text-[#666666] dark:text-[#888888]",
          { "hover:text-black dark:hover:text-white": site }
        )}
      >
        <SiteSwitcherLink
          href="/"
          text={localizedNameGame}
          isActive={site === "game"}
        />
        <SiteSwitcherLink
          href="/editor"
          text={localizedNameEditor}
          isActive={site === "editor"}
        />
      </span>
    </div>
  );
}

export default SiteSwitcher;
