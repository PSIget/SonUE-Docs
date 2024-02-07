import React from "react";
import cn from "classnames";
import gradients from "./gradients.module.scss";

interface HeroTextProps {
  children: React.ReactNode;
  className?: string;
  h2?: boolean;
  textAlign?: string; // Добавленный пропс
}

export const HeroText: React.FC<HeroTextProps> = ({
  children,
  className,
  h2 = false,
  textAlign = "center", // Значение по умолчанию
}) => {
  const combinedClassname = cn(
    gradients.heroHeading,
    `font-sans font-extrabold tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] text-${textAlign} text-transparent`,
    className
  );

  const Tag = h2 ? "h2" : "h3";

  return <Tag className={combinedClassname}>{children}</Tag>;
};

interface SectionHeaderProps {
  children: React.ReactNode;
  textAlign?: string; // Добавленный пропс
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  textAlign = "center",
  className,
}) => {
  return (
    <h2
      className={cn(
        gradients.heroHeading,
        `font-sans font-bold w-full tracking-[-0.01em] text-[32px] text-${textAlign} text-transparent overflow-visible`,
        className
      )}
    >
      {children}
    </h2>
  );
};

interface SectionSubtextProps {
  noWrap?: boolean;
  hero?: boolean;
  children: React.ReactNode;
  className?: string;
  textAlign?: string; // Добавленный пропс
}

export const SectionSubtext: React.FC<SectionSubtextProps> = ({
  noWrap = false,
  hero = false,
  children,
  className,
  textAlign = "center", // Значение по умолчанию
}) => {
  // Сначала создаем базовые классы без учета textAlign
  const baseClasses = cn({
    "text-[20px] lg:text-xl": hero,
    "text-[16px] lg:text-[20px]": !hero,
    "leading-snug": !noWrap,
    "!whitespace-nowrap leading-10": noWrap,
    "font-sans font-normal dark:text-[#FFFFFFB2] text-[#00000080]": true,
    className,
  });

  // Затем добавляем классы для textAlign динамически
  const textAlignClass = `text-${textAlign}`;

  // Объединяем базовые классы с классом для выравнивания текста
  const textClasses = cn(baseClasses, textAlignClass);

  return (
    <p className={cn(textClasses, "max-w-md md:max-w-xl lg:max-w-[792px]")}>
      {children}
    </p>
  );
};
