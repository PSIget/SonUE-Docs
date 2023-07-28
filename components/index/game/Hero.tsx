import styles from "./Hero.module.scss"

import { FadeIn } from "../components/FadeIn";
import Image from "next/image";
import { HeroText, SectionSubtext } from "../components/Headings";
import useLocalesMap from "utils/use-locales-map";
import { btnDocs, btnDown, downText, firstTitle, firstTitleSub } from "./text";
import logo from "../assets/logo.png"
import IndexBG from "../assets/index-bg.png"
import { CTAButton } from "../components/CTAButton";
import Link from "next/link";

export default function Hero() {
  return (
    <>
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
    </>
  );
}
