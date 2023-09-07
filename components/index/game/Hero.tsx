import styles from "./Hero.module.scss";
import { FadeIn } from "../components/FadeIn";
import { HeroText, SectionSubtext } from "../components/Headings";
import { btnDocs, btnDown, downText, firstTitle, firstTitleSub } from "./text";
import { CTAButton } from "../components/CTAButton";
import Link from "next/link";
import { DownloadModal } from "./DownloadModal";
import useLocalesMap from "utils/use-locales-map";
import { AnimatedBackground } from "../components/AnimatedBackground";
import Logo from "components/Logo";

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
        className={`hero font-sans w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-20 flex justify-between gap-8 items-center flex-col relative ${styles.hero}`}
        section
      >
        <div className={`flex flex-col gap-6 ${styles.content}`}>
          <FadeIn className="flex flex-col items-center justify-center gap-4 w-full">
            <Logo height={320} className={styles.mainLogo} />
            <p className={`font-sans ${styles.sub}`}>WORK IN PROGRESS</p>
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
          className="flex flex-col items-center w-full gap-5 px-6"
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
        <AnimatedBackground />
      </FadeIn>
    </>
  );
}
