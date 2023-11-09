import Image from "next/image";
import XrayImage from "./assets/xray.svg";
import useLocalesMap from "utils/use-locales-map";
import { SubTitle, Title } from "./text";
import { FadeIn } from "components/HomePage/components/FadeIn";
import {
  SectionHeader,
  SectionSubtext,
} from "components/HomePage/components/Headings";

export function XraySection() {
  return (
    <FadeIn
      delay={0.3}
      className={
        "font-sans w-auto py-20 flex justify-between items-center flex-col relative z-0 px-6"
      }
      section
    >
      <Image
        src={XrayImage}
        width={360}
        alt="Discord Logo"
        className="light:invert"
      />

      <FadeIn delay={0.3} className="flex flex-col items-center gap-6 w-full">
        <SectionHeader>{useLocalesMap(Title)}</SectionHeader>
        <SectionSubtext>{useLocalesMap(SubTitle)}</SectionSubtext>
      </FadeIn>
    </FadeIn>
  );
}
