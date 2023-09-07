import styles from "./index.module.scss";

import { DiscordSection } from "../components/DiscordSection";
import { BoostySection } from "../components/BoostySection";
import { LastSection } from "../components/LastSection";
import HeroSection from "./HeroSection";
import ScreenshotsSection from "../components/ScreenshotsSection";
import FeaturesSection from "./FeaturesSection";
import OriginalStorySection from "./OriginalStorySection";
import { DownloadModal } from "./DownloadModal";
import classnames from "classnames";
import Head from "next/head";
import useLocalesMap from "utils/use-locales-map";
import { downText, firstTitle, firstTitleSub, goBtn, goTitle } from "./text";
import { LazyMotion, domAnimation } from "framer-motion";

export default function Home() {
  const title = useLocalesMap(firstTitle);
  const titleSub = useLocalesMap(firstTitleSub);
  const subtitle = useLocalesMap(downText);
  const buttonText = useLocalesMap(goBtn);

  const jsonldData = {
    "@context": "http://schema.org",
    "@type": "VideoGame",
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    description: titleSub,
    operatingSystem: "Windows",
    gamePlatform: "PC",
    applicationCategory: "Game",
    genre: "Action, First-Person Shooter",
    image: "/favicon/apple-touch-icon.png",
    url: "/",
    publisher: {
      "@type": "Organization",
      name: "Red Projects",
    },
  };

  return (
    <>
      <Head>
        <style>
          {`
            footer {
              background-color: white !important;
            }

            .dark footer {
              background-color: black !important;
              --tw-border-opacity: 1;
              border-top: 1px solid rgba(38,38,38,var(--tw-border-opacity));
            }

            .dark body {
              background-color: black !important;
              --tw-border-opacity: 1;
            }

            .dark .nextra-nav-container .nextra-nav-container-blur  {
              background-color: rgba(0,0,0,.5) !important;
            }

            html:not([class~="dark"]) {
              .hero{
                border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.08) !important;
              }
            }
          `}
        </style>
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonldData) }}
        />
      </Head>
      <main
        className={classnames(styles.game) + " relative place-content-center"}
        id="game-index"
      >
        <h1 className="hidden">{title}</h1>
        <LazyMotion features={domAnimation}>
          <HeroSection />
          <ScreenshotsSection />
          <FeaturesSection />
          <OriginalStorySection />
          <DiscordSection />
          <BoostySection />
          <LastSection
            title={useLocalesMap(goTitle)}
            subTitle={subtitle}
            button={<DownloadModal buttonText={buttonText} limit={false} />}
          />
        </LazyMotion>
      </main>
    </>
  );
}
