import cn from "classnames";
import gradients from "./gradients.module.css";

export function HeroText({
  children,
  className,
  h2,
}: {
  children: React.ReactNode;
  className?: string;
  h2?: boolean;
}) {
  const combinedClassname = cn(
    gradients.heroHeading,
    "font-sans font-extrabold tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] text-center text-transparent",
    // max-w-lg md:max-w-xl lg:max-w-4xl
    className
  );

  if (h2) {
    return <h2 className={combinedClassname}>{children}</h2>;
  }
  return <h3 className={combinedClassname}>{children}</h3>;
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
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

export function SectionSubtext({
  noWrap,
  hero,
  children,
}: {
  noWrap?: boolean;
  hero?: boolean;
  children: React.ReactNode;
}) {
  const textClasses = hero
    ? "text-[20px] lg:text-xl"
    : "text-[16px] lg:text-[20px]";
  const textNoWrap = noWrap
    ? "!whitespace-nowrap leading-10"
    : "";

  return (
    <p
      className={`font-sans font-normal leading-snug dark:text-[#FFFFFFB2] text-[#00000080] ${textClasses} ${textNoWrap} max-w-md md:max-w-xl lg:max-w-[792px] text-center`}
    >
      {children}
    </p>
  );
}
