import { btnDocs, btnDown, downText, firstTitle, firstTitleSub, goBtn, goTitle, origTitle, origTitleList1, origTitleList2, origTitleSub, screensSub, screensTitle, techBlock1, techBlock1Sub, techBlock2, techBlock2Sub, techBlock3, techBlock3Sub, techTitle } from "./text";
import useLocalesMap from "utils/use-locales-map";

import styles from "./index.module.scss"

import Image from "next/image";
import logo from "../assets/logo.png"
import IndexBG from "../assets/index-bg.png"
import UeBanner from "../assets/ue-banner.svg"
import UeBanner1 from "../assets/banner-graphic.png"
import UeBanner2 from "../assets/banner-light.png"
import UeBanner3 from "../assets/banner-sound.png"
import RadImage from "../assets/rad.svg"
import { FadeIn } from "../components/FadeIn";
import { HeroText, SectionHeader, SectionSubtext } from "../components/Headings";
import { CTAButton } from "../components/CTAButton";
import Link from "next/link";
import { Inter } from 'next/font/google'
import classnames from "classnames";
import { Screenshots } from "../components/Screenshots"
import { Block } from "../components/infoBlock";
import { Discord } from "../components/discord";
import { Boosty } from "../components/boosty";
import { EndBlock } from "../components/endBlock";
import Head from "next/head";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function Home() {
  return (
    <>
      <Head>
        <style>
          {`
            footer {
              background-color: white !important;
            }
            .dark footer,
            .dark body {
              background-color: black !important;
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
      </Head>
      <main className={classnames(inter.variable, styles.game) + " relative place-content-center"} id="game-index">
        <h1 className="hidden">{useLocalesMap(firstTitle)}</h1>
        <FadeIn
          noVertical
          className={styles.hero + " hero font-sans w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-20 flex justify-between gap-8 items-center flex-col relative"}
        >
          <div className={styles.content + " flex flex-col gap-6 z-10"}>
            <FadeIn className={styles.logo + " flex flex-col items-center justify-center gap-4 w-full"}>
              <Image
                src={logo}
                alt="Logo"
                width={588}
                quality={100}
                priority
                className="light:invert"
              />
              <p className={styles.sub + " font-sans"}>WORK IN PROGRESS</p>
            </FadeIn>
            <FadeIn
              delay={0.15}
              className="flex flex-col items-center justify-center gap-5 px-6 text-center lg:gap-6"
            >
              <HeroText>{useLocalesMap(firstTitle)}</HeroText>
              <SectionSubtext hero>{useLocalesMap(firstTitleSub)}</SectionSubtext>
            </FadeIn>
          </div>
          <FadeIn
            delay={0.3}
            className="flex flex-col items-center w-full gap-5 px-6 z-10"
          >
            <div className="flex flex-col gap-3 w-full md:w-min md:!flex-row">
              <CTAButton limit>
                <Link
                  href="/download"
                  className="block whitespace-nowrap">
                  {useLocalesMap(btnDown)}
                </Link>
              </CTAButton>
              <CTAButton outline limit>
                <a
                  href="/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="block whitespace-nowrap"
                >
                  {useLocalesMap(btnDocs)}
                </a>
              </CTAButton>
            </div>
            <p className="text-sm text-[#666666]">{useLocalesMap(downText)}</p>
          </FadeIn>
          <Image src={IndexBG}
            alt="BG"
            quality={100}
            placeholder="blur"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            priority
            className="light:invert"
          />
        </FadeIn>

        <FadeIn noVertical viewTriggerOffset className={styles.whiteShadow + " font-sans w-auto px-6 pb-16 pt-[48px] md:pb-24 lg:pb-20 md:pt-16 lg:pt-20 flex flex-col gap-8 items-center relative overflow-hidden"}>
          <FadeIn
            delay={0.3}
            className="flex flex-col items-center w-full gap-5 px-6"
          >
            <div className="flex flex-col items-end gap-2 md:!flex-row">
              <SectionHeader>{useLocalesMap(screensTitle)}</SectionHeader>
              <SectionSubtext noWrap>{useLocalesMap(screensSub)}</SectionSubtext>
            </div>
          </FadeIn>
          <FadeIn
            delay={0.3}
            className="flex flex-col items-center w-full gap-5 px-6"
          >
            <Screenshots />
          </FadeIn>
        </FadeIn>

        <FadeIn noVertical viewTriggerOffset className={styles.tech + " font-sans w-auto px-6 pb-16 pt-[48px] md:pb-24 lg:pb-20 md:pt-16 lg:pt-20 flex flex-col items-center justify-center relative overflow-hidden"}>
          <FadeIn
            delay={0.3}
            className="flex flex-col items-center w-full"
          >
            <div className="pb-6 md:pb-24">
              <SectionHeader>{useLocalesMap(techTitle)}</SectionHeader>
            </div>
            <Image
              src={UeBanner}
              width={818}
              height={224}
              alt="UE Banner"
              className="max-[1280px]:hidden light:invert"
            />
          </FadeIn>
          <FadeIn
            delay={0.3}
            className={styles.ueBanner + " flex gap-6 items-center justify-center w-full flex-col lg:!flex-row"}
          >
            <Block title={useLocalesMap(techBlock1)} paragraph={useLocalesMap(techBlock1Sub)} img={UeBanner1} />
            <Block title={useLocalesMap(techBlock2)} paragraph={useLocalesMap(techBlock2Sub)} img={UeBanner2} />
            <Block title={useLocalesMap(techBlock3)} paragraph={useLocalesMap(techBlock3Sub)} img={UeBanner3} />
          </FadeIn>
        </FadeIn>

        <FadeIn noVertical viewTriggerOffset className={styles.rad + " font-sans w-auto mx-auto px-6 pb-16 pt-[48px] md:pb-24 lg:pb-20 md:pt-16 lg:pt-20 flex flex-col items-center justify-center relative overflow-hidden"}>
          <FadeIn
            delay={0.3}
            className="flex flex-col lg:!flex-row items-center justify-center lg:gap-16 md:gap-0 w-full"
          >
            <div>
              <Image
                src={RadImage}
                width={435}
                alt="UE Banner"
              />
            </div>
            <div className="flex flex-col gap-6">
              <SectionHeader>{useLocalesMap(origTitle)}</SectionHeader>
              <SectionSubtext>{useLocalesMap(origTitleSub)}</SectionSubtext>
              <ul className="flex flex-col gap-4">
                <li>{useLocalesMap(origTitleList1)}</li>
                <li>{useLocalesMap(origTitleList2)}</li>
              </ul>
            </div>
          </FadeIn>
        </FadeIn>

        <Discord />
        <Boosty />
        <EndBlock title={useLocalesMap(goTitle)} buttonText={useLocalesMap(goBtn)} subTitle={useLocalesMap(downText)} />
      </main>
    </>
  );
}
