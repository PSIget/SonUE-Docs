import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  noVertical?: boolean;
  delay?: number;
  viewTriggerOffset?: boolean;
  section?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  noVertical = false,
  delay = 0,
  viewTriggerOffset = false,
  section = false,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: viewTriggerOffset ? "-128px" : "0px",
  });
  const shouldReduceMotion = useReducedMotion();
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  useEffect(() => {
    setIsJsEnabled(true); // Это будет установлено только если JavaScript включен
  }, []);

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: noVertical ? 0 : 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const Component = section ? m.section : m.div;

  return (
    <Component
      ref={ref}
      animate={isJsEnabled ? (inView ? "animate" : "initial") : ""}
      variants={isJsEnabled ? fadeUpVariants : {}}
      className={className}
      initial={isJsEnabled ? "initial" : ""}
      transition={
        isJsEnabled
          ? {
              duration: shouldReduceMotion ? 0 : 1,
              delay: delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            }
          : {}
      }
      style={!isJsEnabled ? { opacity: 1, transform: "translateY(0px)" } : {}}
    >
      {children}
    </Component>
  );
};
