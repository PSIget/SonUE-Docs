import styles from "./FeaturesSection.module.scss";
import Image from "next/image";
import { FadeIn } from "../components/FadeIn";
import { SectionHeader } from "../components/Headings";
import { Card as CardComponent } from "../components/Card";
import UeBanner from "../assets/ue-banner.svg";
import useLocalesMap from "utils/use-locales-map";

type Locale = "en" | "uk" | "ru";

type LocalizedText = Record<Locale, string>;

interface CardData {
  title: LocalizedText;
  paragraph: LocalizedText;
  img?: string;
  label?: string;
}

interface FeaturesSectionProps {
  techTitle: LocalizedText;
  features: CardData[];
}

const Card = ({ title, paragraph, img, label }: CardData) => {
  const localizedTitle = useLocalesMap(title);
  const localizedParagraph = useLocalesMap(paragraph);

  const cardProps: any = {
    title: localizedTitle,
    paragraph: localizedParagraph,
  };

  if (img !== undefined) {
    cardProps.img = img;
  }

  if (label !== undefined) {
    cardProps.label = label;
  }

  return <CardComponent {...cardProps} />;
};

export default function FeaturesSection({
  techTitle,
  features,
}: FeaturesSectionProps) {
  const localizedTechTitle = useLocalesMap(techTitle);

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
            <SectionHeader>{localizedTechTitle}</SectionHeader>
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
          className={`${styles.ueBanner} grid grid-cols-1 lg:grid-cols-3 gap-6 w-full `}
        >
          {features.map((feature) => (
            <Card
              key={feature.title.en} // Assuming the title in English is unique, otherwise use a proper unique id
              {...feature}
            />
          ))}
        </FadeIn>
      </FadeIn>
    </>
  );
}
