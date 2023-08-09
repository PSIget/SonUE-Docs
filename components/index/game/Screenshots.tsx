import styles from "./Screenshots.module.scss";

import useLocalesMap from "utils/use-locales-map";
import { FadeIn } from "../components/FadeIn";
import { SectionHeader, SectionSubtext } from "../components/Headings";
import { screensSub, screensTitle } from "./text";
import { ScreenshotsSlider } from "../components/ScreenshotsSlider";

export default function Screenshots() {
  const screensTitleText = useLocalesMap(screensTitle);
  const screensSubText = useLocalesMap(screensSub);

  return (
    <FadeIn
      noVertical
      viewTriggerOffset
      className={`${styles.whiteShadow} font-sans w-auto px-6 pb-16 pt-[48px] md:pb-24 lg:pb-20 md:pt-16 lg:pt-20 flex flex-col gap-8 items-center relative overflow-hidden`}
      section
    >
      <FadeIn delay={0.3} className="flex flex-col items-end gap-2 md:!flex-row">
        <SectionHeader>{screensTitleText}</SectionHeader>
        <SectionSubtext noWrap>{screensSubText}</SectionSubtext>
      </FadeIn>
      <FadeIn delay={0.3} className="flex flex-col items-center w-full gap-5 px-6">
        <ScreenshotsSlider />
      </FadeIn>
    </FadeIn>
  );
}
