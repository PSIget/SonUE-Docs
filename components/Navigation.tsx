import { Navbar } from "nextra-theme-docs";
import { useTurboSite } from "./SiteSwitcher";
import useLocalesMap from "utils/use-locales-map";

function Navigation(props: any) {
  const site = useTurboSite();

  const docsLang = {
    ru: "Документация",
    en: "Docs",
    uk: "Документація",
  };

  const localizedName = useLocalesMap(docsLang);

  /*
    Inject a dynamic docs link when NOT on root
    1. Points to /repo/docs when on /repo
    2. Points to /pack/docs when on /pack
  */
  const leadingItem = props.items[0];
  if (leadingItem?.id !== "contextual-docs" && site) {
    props.items.unshift({
      title: `${localizedName}`,
      type: "page",
      route: `/${site}/docs`,
      id: "contextual-docs",
      key: "contextual-docs",
    });
  }

  // remove the top level repo and pack links
  const headerItems = props.items.filter((item: any) => {
    return item.name !== "game" && item.name !== "editor";
  });

  // items last to override the default
  return <Navbar {...props} items={headerItems} />;
}

export default Navigation;
