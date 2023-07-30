import styles from "./index.module.scss";
import React, { ReactNode, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
  hideCloseButton?: boolean;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MotionDiv = motion.div;

const Header = ({ title, subTitle }: Pick<ModalProps, 'title' | 'subTitle'>) => (
  (title || subTitle) && (
    <div className={styles.header}>
      <MotionDiv variants={item} className={styles.text}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
      </MotionDiv>
    </div>
  )
)

export const Modal: React.FC<ModalProps> = ({ title, subTitle, children, onClose, hideCloseButton = false }) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const blockScroll = (e: TouchEvent) => {
      let target: EventTarget | null = e.target;
      while (target) {
        if (target === modalContentRef.current) {
          return;
        }
        target = (target as HTMLElement).parentElement;
      }
      e.preventDefault();
    };

    document.addEventListener('touchmove', blockScroll, { passive: false });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('touchmove', blockScroll);
    };
  }, []);

  return (
    <MotionDiv
      className={styles.modal}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionDiv
        className={styles.modalContent}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
        ref={modalContentRef}
      >
        <Header title={title} subTitle={subTitle} />
        {!hideCloseButton && <span className={styles.close} onClick={onClose} />}
        <div className={styles.content}>
          {children}
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};

export default Modal;
