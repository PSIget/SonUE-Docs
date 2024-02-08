import styles from "./HeroSection.module.scss";
import { HeroText, SectionSubtext } from "../components/Headings";
import { btnInfo, btnDown, downText, firstTitle, firstTitleSub } from "./text";
import { CTAButton } from "../components/CTAButton";
import Link from "next/link";
import { DownloadModal } from "./DownloadModal";
import useLocalesMap from "utils/use-locales-map";
import { AnimatedBackground } from "../components/AnimatedBackground";
import Logo from "components/Logo";

export default function HeroSection() {
  const buttonText = useLocalesMap(btnDown);
  const downloadText = useLocalesMap(downText);
  const firstTitleText = useLocalesMap(firstTitle);
  const firstTitleSubText = useLocalesMap(firstTitleSub);
  const btnInfoText = useLocalesMap(btnInfo);

  return (
    <section
      className={`hero font-sans w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-20 flex justify-between gap-8 items-center flex-col relative ${styles.hero}`}
    >
      <div className={`flex flex-col gap-6 ${styles.content}`}>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Logo height={320} className={styles.mainLogo} />
          <p className={`font-sans ${styles.sub}`}>WORK IN PROGRESS</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 px-6 text-center lg:gap-6">
          <HeroText>{firstTitleText}</HeroText>
          <SectionSubtext hero>{firstTitleSubText}</SectionSubtext>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-5 px-6">
        <div className="flex flex-col gap-3 w-full md:w-min md:!flex-row">
          <DownloadModal buttonText={buttonText} />

          <Link href="/game/docs" className="block whitespace-nowrap">
            <CTAButton outline limit>
              {btnInfoText}
            </CTAButton>
          </Link>
        </div>
        <p className="text-sm text-[#666666]">{downloadText}</p>
      </div>
      <AnimatedBackground />
    </section>
  );
}
