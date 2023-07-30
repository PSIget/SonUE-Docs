import styles from "./Hero.module.scss"
import { FadeIn } from "../components/FadeIn";
import Image from "next/image";
import { HeroText, SectionSubtext } from "../components/Headings";
import useLocalesMap from "utils/use-locales-map";
import { btnDocs, btnDown, downText, firstTitle, firstTitleSub, modalSubtitle, modalTitle } from "./text";
import logo from "../assets/logo.png"
import IndexBG from "../assets/index-bg.png"
import { CTAButton } from "../components/CTAButton";
import Link from "next/link";
import { DownloadModal } from "./DownloadModal";

export default function Hero() {
  const buttonText = useLocalesMap(btnDown);
  const downloadText = useLocalesMap(downText);
  const firstTitleText = useLocalesMap(firstTitle);
  const firstTitleSubText = useLocalesMap(firstTitleSub);
  const btnDocsText = useLocalesMap(btnDocs);

  return (
    <>
      <FadeIn
        noVertical
        className={`${styles.hero} hero font-sans w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-20 flex justify-between gap-8 items-center flex-col relative`}
      >
        <div className={`${styles.content} flex flex-col gap-6 z-10`}>
          <FadeIn className={`${styles.logo} flex flex-col items-center justify-center gap-4 w-full`}>
            <Image
              src={logo}
              alt="Logo"
              width={588}
              quality={100}
              priority
              className="light:invert"
            />
            <p className={`${styles.sub} font-sans`}>WORK IN PROGRESS</p>
          </FadeIn>
          <FadeIn
            delay={0.15}
            className="flex flex-col items-center justify-center gap-5 px-6 text-center lg:gap-6"
          >
            <HeroText>{firstTitleText}</HeroText>
            <SectionSubtext hero>{firstTitleSubText}</SectionSubtext>
          </FadeIn>
        </div>
        <FadeIn
          delay={0.3}
          className="flex flex-col items-center w-full gap-5 px-6 z-10"
        >
          <div className="flex flex-col gap-3 w-full md:w-min md:!flex-row">
            <DownloadModal buttonText={buttonText} />

            <Link
              href="/docs/getting-started"
              className="block whitespace-nowrap"
            >
              <CTAButton outline limit>
                {btnDocsText}
              </CTAButton>
            </Link>
          </div>
          <p className="text-sm text-[#666666]">{downloadText}</p>
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
