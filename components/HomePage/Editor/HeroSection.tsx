import styles from "./HeroSection.module.scss";
import { FadeIn } from "../components/FadeIn";
import { HeroText, SectionSubtext } from "../components/Headings";
import { btnInfo, btnDown, downText, firstTitle, firstTitleSub } from "./text";
import { CTAButton } from "../components/CTAButton";
import Link from "next/link";
import { DownloadModal } from "./DownloadModal";
import useLocalesMap from "utils/use-locales-map";
import { AnimatedBackground } from "../components/AnimatedBackground";
import Logo from "components/Logo";

import Image from "next/image";

import ueScreenshot from "../assets/ue-screenshot.png";

export default function HeroSection() {
  const buttonText = useLocalesMap(btnDown);
  const downloadText = useLocalesMap(downText);
  const firstTitleText = useLocalesMap(firstTitle);
  const firstTitleSubText = useLocalesMap(firstTitleSub);
  const btnInfoText = useLocalesMap(btnInfo);

  return (
    <>
      <FadeIn
        noVertical
        className={`font-sans w-auto pt-16 md:pt-24 lg:pt-32 flex justify-between gap-8 items-center flex-col relative ${styles.hero}`}
        section
      >
        <div className={`flex flex-col gap-6 ${styles.content}`}>
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
          className={`flex flex-col items-center w-full gap-5 px-6`}
        >
          <div className="flex flex-col gap-3 w-full md:w-min md:!flex-row">
            <DownloadModal buttonText={buttonText} />

            <Link href="/editor/docs" className="block whitespace-nowrap">
              <CTAButton outline limit>
                {btnInfoText}
              </CTAButton>
            </Link>
          </div>
          <p className="text-sm text-[#666666]">{downloadText}</p>
        </FadeIn>
        <FadeIn
          className={`flex flex-col overflow-hidden items-center justify-center gap-4 w-full ![perspective:1000px] sm:![perspective:1000px] md:![perspective:1000px] lg:![perspective:1000px] ${styles.editorImage} `}
          delay={0.5}
        >
          <Image
            src={ueScreenshot}
            width={1200}
            alt="Unreal Engine 5 Editor with STALKER on UE"
            quality={100}
            priority
            style={{
              transform: "rotateX(35deg)",
              marginBottom: "-100px",
              zIndex: -1,
            }}
          />
        </FadeIn>
        <AnimatedBackground />
      </FadeIn>
    </>
  );
}
