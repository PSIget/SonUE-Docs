import cn from "classnames";
import { MouseEventHandler, PropsWithChildren } from "react";

interface CTAButtonProps {
  outline?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  monospace?: boolean;
  limit?: boolean;
}

export function CTAButton({
  outline,
  onClick,
  monospace,
  limit,
  children,
}: PropsWithChildren<CTAButtonProps>) {
  return (
    <div className="relative w-full group">
      <button
        onClick={onClick}
        className={cn(
          "flex justify-center lg:min-w-[120px] w-full text-base font-medium px-12 py-3 no-underline md:max-w-none rounded-lg md:leading-6 transition-all duration-300 whitespace-nowrap",
          limit && "lg:max-w-[214px] lg:w-[214px]",
          outline
            ? "border dark:border-neutral-400 dark:text-neutral-200 dark:hover:border-white dark:hover:text-white border-[#EAEAEA] text-neutral-800 hover:border-black hover:text-black"
            : "dark:text-black text-white border-transparent bg-black dark:bg-white",
          monospace && "font-mono"
        )}
      >
        {children}
      </button>
    </div>
  );
}
