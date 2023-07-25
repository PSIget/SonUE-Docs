import styles from "./index.module.scss";
import { FadeIn } from "../FadeIn";
import { SectionHeader } from "../Headings";
import { CTAButton } from "../CTAButton";
import Link from "next/link";

interface BaseProps {
  title: string;
  buttonText: string;
  subTitle: string;
}

export function EndBlock({ title, buttonText, subTitle }: BaseProps) {
  return (
    <FadeIn
      delay={0.3}
      className={"font-sans w-auto py-20 flex justify-between items-center flex-col relative px-6 gap-6"}
    >
      <SectionHeader>{title}</SectionHeader>
      <div className="flex flex-col w-full md:w-min md:!flex-row">
        <CTAButton>
          <Link
            href="/download"
            className="block whitespace-nowrap">
            {buttonText}
          </Link>
        </CTAButton>
      </div>
      <p className="text-sm text-[#666666]">{subTitle}</p>
    </FadeIn>
  );
}
