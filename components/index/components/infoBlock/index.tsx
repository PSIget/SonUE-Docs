import styles from "./index.module.scss";
import Image from "next/image";
import { StaticImageData } from 'next/image';
import { FadeIn } from "../FadeIn";


interface BaseProps {
  title: string;
  paragraph: string;
}

interface PropsWithImgAndLabel extends BaseProps {
  img: StaticImageData | string;
  label: string;
}

interface PropsWithImgWithoutLabel extends BaseProps {
  img: StaticImageData | string;
  label?: never;
}

interface PropsWithoutImgAndLabel extends BaseProps {
  img?: never;
  label?: never;
}

type CardProps = PropsWithImgAndLabel | PropsWithImgWithoutLabel | PropsWithoutImgAndLabel;

export function Block({ img, title, paragraph, label }: CardProps) {
  if (img === undefined && label !== undefined) {
    throw new Error("Cannot use 'label' without 'img'.");
  }
  return (
    <FadeIn
      delay={0.3}
      className={"flex gap-6 items-center h-full justify-center w-full flex-col lg:!flex-row"}
    >
      <div className={styles.block + " light:invert"}>
        {label && img && <div className={styles.label}>{label}</div>}
        {img &&
          <Image
            src={img}
            width={384}
            height={262}
            quality={1}
            alt="UE Banner"
            sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 384px"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        }
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{paragraph}</p>
        </div>
      </div>
    </FadeIn>
  );
}
