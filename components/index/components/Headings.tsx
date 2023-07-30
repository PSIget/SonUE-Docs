import React from 'react';
import cn from "classnames";
import gradients from "./gradients.module.scss";

interface HeroTextProps {
  children: React.ReactNode;
  className?: string;
  h2?: boolean;
}

export const HeroText: React.FC<HeroTextProps> = ({ children, className, h2 = false }) => {
  const combinedClassname = cn(
    gradients.heroHeading,
    "font-sans font-extrabold tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] text-center text-transparent",
    className
  );

  const Tag = h2 ? 'h2' : 'h3';

  return <Tag className={combinedClassname}>{children}</Tag>;
}

interface SectionHeaderProps {
  children: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => {
  return (
    <h2
      className={cn(
        gradients.heroHeading,
        "font-sans font-bold w-full tracking-[-0.01em] text-[32px] text-center text-transparent overflow-visible"
      )}
    >
      {children}
    </h2>
  );
}

interface SectionSubtextProps {
  noWrap?: boolean;
  hero?: boolean;
  children: React.ReactNode;
}

export const SectionSubtext: React.FC<SectionSubtextProps> = ({ noWrap = false, hero = false, children }) => {
  const textClasses = cn({
    'text-[20px] lg:text-xl': hero,
    'text-[16px] lg:text-[20px]': !hero,
    '!whitespace-nowrap leading-10': noWrap,
    'font-sans font-normal leading-snug dark:text-[#FFFFFFB2] text-[#00000080] text-center': true,
  });

  return <p className={cn(textClasses, 'max-w-md md:max-w-xl lg:max-w-[792px]')}>{children}</p>;
}
