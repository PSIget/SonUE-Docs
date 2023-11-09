import styles from "./index.module.scss";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { FadeIn } from "../FadeIn";

interface CardProps {
  title: string;
  paragraph: string;
  img: StaticImageData | string;
  label: string;
}

export function Card({ img, title, paragraph, label }: CardProps) {
  return (
    <FadeIn
      delay={0.3}
      className={
        "flex gap-6 items-center h-full justify-center w-full flex-col lg:!flex-row"
      }
    >
      <article className={styles.card + " light:invert"}>
        {img && (
          <Image
            src={img}
            width={384}
            height={262}
            quality={80}
            alt="UE Banner"
            sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 384px"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{paragraph}</p>
        </div>
      </article>
    </FadeIn>
  );
}
