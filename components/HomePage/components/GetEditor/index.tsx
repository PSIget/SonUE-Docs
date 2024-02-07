import Image from "next/image";
import { FadeIn } from "../FadeIn";
import { SectionHeader, SectionSubtext } from "../Headings";
import useLocalesMap from "utils/use-locales-map";
import { Button, SubTitle, Title } from "./text";
import Link from "next/link";
// import styles from "./index.module.scss";

export function GetEditor() {
  return (
    <FadeIn
      delay={0.3}
      className={
        "font-sans m-auto max-w-5xl p-6 flex flex-col relative z-0 bg-black rounded-xl border border-zinc-800"
      }
      section
    >
      <FadeIn delay={0.3} className="flex flex-col w-full gap-6 !text-left">
        <SectionHeader textAlign="left">{useLocalesMap(Title)}</SectionHeader>
        <SectionSubtext textAlign="left">
          {useLocalesMap(SubTitle)}
        </SectionSubtext>

        <Link
          href="/discord"
          target="_blank"
          rel="noreferrer"
          className={" block whitespace-nowrap"}
        >
          {useLocalesMap(Button)}
        </Link>
      </FadeIn>
    </FadeIn>
  );
}
