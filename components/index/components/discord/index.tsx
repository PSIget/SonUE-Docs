import Image from 'next/image';
import { FadeIn } from "../FadeIn";
import DiscordBig from "./assets/discord-big.svg"
import { SectionHeader, SectionSubtext } from '../Headings';
import useLocalesMap from 'utils/use-locales-map';
import { Button, SubTitle, Title } from './text';
import Link from "next/link";
import styles from "./index.module.scss"

export function Discord() {
  return (
    <FadeIn
      delay={0.3}
      className={"font-sans w-auto py-20 flex justify-between items-center flex-col relative z-0 px-6"}
    >
      <Image
        src={DiscordBig}
        width={800}
        alt="Discord Logo"
        className='light:invert'
      />

      <FadeIn
        delay={0.3}
        className="flex flex-col items-center gap-6 w-full"
      >
        <SectionHeader>{useLocalesMap(Title)}</SectionHeader>
        <SectionSubtext>{useLocalesMap(SubTitle)}</SectionSubtext>

        <Link
          href="/discord"
          target="_blank"
          rel="noreferrer"
          className={styles.button + " block whitespace-nowrap"}
        >
          {useLocalesMap(Button)}
        </Link>

      </FadeIn>
    </FadeIn>
  );
}
