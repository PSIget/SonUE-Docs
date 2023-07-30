
import Image from 'next/image';
import { FadeIn } from "../FadeIn";

import styles from "./index.module.scss"
import { HeroText } from '../Headings';
import useLocalesMap from 'utils/use-locales-map';
import { Button, Paragraph1N, Paragraph2N, Paragraph3N, Title } from './text';

export function Boosty() {
  return (
    <FadeIn
      delay={0.3}
      className={styles.boosty + " font-sans w-auto py-20 flex justify-between items-center flex-col relative z-0 px-6 gap-12 overflow-hidden"}
    >
      <HeroText>{useLocalesMap(Title)}</HeroText>
      <FadeIn
        delay={0.3}
        className="flex flex-col gap-5 font-sans font-normal leading-7 sm:w-full lg:max-w-[792px] text-[16px] lg:text-[20px]"
      >
        <p>{useLocalesMap(Paragraph1N)}</p>
        <p>{useLocalesMap(Paragraph2N)}</p>
        <p>{useLocalesMap(Paragraph3N)}</p>
      </FadeIn>
      <div className={styles.line} />
      <a
        href="/boosty"
        target="_blank"
        rel="noreferrer"
        className="block whitespace-nowrap"
      >
        <button className={styles.button}>
          {useLocalesMap(Button)}
        </button>
      </a>
    </FadeIn>
  );
}
