import styles from "./FeaturesSection.module.scss";
import Image from "next/image";
import { FadeIn } from "../components/FadeIn";
import { SectionHeader } from "../components/Headings";
import {
  techBlock1,
  techBlock1Sub,
  techBlock2,
  techBlock2Sub,
  techBlock3,
  techBlock3Sub,
  techTitle,
} from "./text";
import { Card } from "../components/Card";
import UeBanner from "../assets/ue-banner.svg";
import UeBanner1 from "../assets/banner-graphic.svg";
import UeBanner2 from "../assets/banner-light.svg";
import UeBanner3 from "../assets/banner-sound.svg";
import useLocalesMap from "utils/use-locales-map";

export default function FeaturesSection() {
  return (
    <>
      <FadeIn
        noVertical
        viewTriggerOffset
        className={`${styles.tech} font-sans w-auto px-6 pb-16 pt-[48px] md:pb-24 lg:pb-20 md:pt-16 lg:pt-20 flex flex-col items-center justify-center relative overflow-hidden`}
        section
      >
        <FadeIn delay={0.3} className="flex flex-col items-center w-full">
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
          className={`${styles.ueBanner} flex gap-6 items-center justify-center w-full flex-col lg:!flex-row`}
        >
          <Card
            title={useLocalesMap(techBlock1)}
            paragraph={useLocalesMap(techBlock1Sub)}
            img={UeBanner1}
          />
          <Card
            title={useLocalesMap(techBlock2)}
            paragraph={useLocalesMap(techBlock2Sub)}
            img={UeBanner2}
          />
          <Card
            title={useLocalesMap(techBlock3)}
            paragraph={useLocalesMap(techBlock3Sub)}
            img={UeBanner3}
            label="Soon"
          />
        </FadeIn>
      </FadeIn>
    </>
  );
}
