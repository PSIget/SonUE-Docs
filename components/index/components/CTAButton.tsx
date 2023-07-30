import cn from "classnames";
import { MouseEventHandler } from "react";
import gradients from "./gradients.module.scss";

export function CTAButton({
  children,
  outline,
  onClick,
  monospace,
  limit,
}: {
  outline?: boolean;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  monospace?: boolean;
  limit?: boolean;
}) {
  const outlineClasses =
    "border dark:border-neutral-400 dark:text-neutral-200 dark:hover:border-white dark:hover:text-white border-[#EAEAEA] text-neutral-800 hover:border-black hover:text-black";
  const filledClasses =
    "dark:text-black text-white border-transparent bg-black dark:bg-white";

  return (
    <div className="relative w-full group">
      <button
        onClick={onClick}
        className={`flex justify-center lg:min-w-[120px] ${limit ? "lg:max-w-[214px] lg:w-[214px]" : ""} w-full text-base font-medium px-12 py-3 no-underline md:max-w-none ${outline ? outlineClasses : filledClasses
          } rounded-lg md:leading-6 transition-all duration-300 ${monospace ? "font-mono" : ""
          }`}
      >
        {children}
      </button>
    </div>
  );
}
