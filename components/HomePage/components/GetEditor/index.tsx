import Image from "next/image";
import { FadeIn } from "../FadeIn";
import { SectionHeader, SectionSubtext } from "../Headings";
import useLocalesMap from "utils/use-locales-map";
import { Button, SubTitle, Title } from "./text";
import Link from "next/link";
import ueScreenshot from "../../assets/ue-screenshot.png";
import { CTAButton } from "../CTAButton";
// import styles from "./index.module.scss";

export function GetEditor() {
  return (
    <FadeIn
      delay={0.3}
      className={
        "font-sans xl:mx-auto max-w-[1200px] p-8 my-20 mx-6 max-sm:p-4 flex max-lg:flex-col-reverse relative z-0 bg-neutral-950 rounded-xl border border-zinc-800 overflow-hidden"
      }
      section
    >
      <div className="flex flex-col w-full gap-6 max-lg:gap-4 !text-left">
        <SectionHeader className="text-[24px]" textAlign="left">
          {useLocalesMap(Title)}
        </SectionHeader>
        <SectionSubtext
          className="!text-[16px] mr-[550px] max-lg:!mr-0 max-lg:!max-w-full "
          textAlign="left"
        >
          {useLocalesMap(SubTitle)}
        </SectionSubtext>

        <Link href="/editor">
          <CTAButton limit>{useLocalesMap(Button)}</CTAButton>
        </Link>
      </div>
      <Image
        src={ueScreenshot}
        sizes="(min-width: 1024px) 500px, 100vw"
        alt="Unreal Engine 5 Editor with STALKER on UE"
        quality={100}
        className="absolute max-lg:relative w-[500px] max-lg:w-auto rounded-md max-lg:right-0 max-lg:mb-4 max-lg:mx-0 max-lg:top-0 right-8 top-8 -z-10 border border-zinc-800"
      />
    </FadeIn>
  );
}
