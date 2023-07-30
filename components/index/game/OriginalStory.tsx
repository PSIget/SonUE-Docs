import styles from "./OriginalStory.module.scss"

import Image from "next/image";
import { FadeIn } from "../components/FadeIn";
import RadImage from "../assets/rad.svg"
import { SectionHeader, SectionSubtext } from "../components/Headings";
import useLocalesMap from "utils/use-locales-map";
import { origTitle, origTitleList1, origTitleList2, origTitleSub } from "./text";

interface ListItemProps {
  text: string;
}

const ListItem: React.FC<ListItemProps> = ({ text }) => <li>{text}</li>;

export default function OriginalStory() {
  const origTitleText = useLocalesMap(origTitle);
  const origTitleSubText = useLocalesMap(origTitleSub);
  const origTitleList1Text = useLocalesMap(origTitleList1);
  const origTitleList2Text = useLocalesMap(origTitleList2);

  return (
    <>
      <FadeIn noVertical viewTriggerOffset className={styles.rad + " font-sans w-auto mx-auto px-6 pb-16 pt-[48px] md:pb-24 lg:pb-20 md:pt-16 lg:pt-20 flex flex-col items-center justify-center relative overflow-hidden"}>
        <FadeIn
          delay={0.3}
          className="flex flex-col lg:!flex-row items-center justify-center lg:gap-16 md:gap-0 w-full"
        >
          <div>
            <Image
              src={RadImage}
              width={435}
              alt="UE Banner"
            />
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeader>{origTitleText}</SectionHeader>
            <SectionSubtext>{origTitleSubText}</SectionSubtext>
            <ul className="flex flex-col gap-4">
              <ListItem text={origTitleList1Text} />
              <ListItem text={origTitleList2Text} />
            </ul>
          </div>
        </FadeIn>
      </FadeIn>
    </>
  );
}
