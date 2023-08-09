import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

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

  const fadeUpVariants = {
    initial: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : (noVertical ? 0 : 24),
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
      animate={inView ? "animate" : "initial"}
      variants={fadeUpVariants}
      className={className}
      initial="initial"
      transition={{
        duration: shouldReduceMotion ? 0 : 1,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </Component>
  );
};
