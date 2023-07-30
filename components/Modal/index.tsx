import styles from "./index.module.scss";
import React, { ReactNode, MouseEvent, useEffect } from 'react'; // Импортируем useEffect
import { motion } from 'framer-motion';
import { useRef } from 'react'; // Добавьте импорт useRef

interface ModalProps {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  onClose: (event: MouseEvent<HTMLDivElement>) => void;
  hideCloseButton?: boolean;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MotionDiv = motion.div;

export const Modal: React.FC<ModalProps> = ({ title, subTitle, children, onClose, hideCloseButton = false }) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null); // Создайте ссылку

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const blockScroll = (e: TouchEvent) => {
      // Проверка на то, что событие происходит внутри модального окна
      let target: EventTarget | null = e.target;
      while (target) {
        if (target === modalContentRef.current) {
          return; // Если это так, то не предотвращаем событие
        }
        target = (target as HTMLElement).parentElement;
      }
      e.preventDefault(); // Иначе предотвращаем событие
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
      {/* Добавьте привязку к ссылке */}
      <MotionDiv
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
      >
        {(title || subTitle) && (
          <div className={styles.header}>
            <MotionDiv variants={item} className={styles.text}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
            </MotionDiv>
          </div>
        )}
        {!hideCloseButton && <span className={styles.close} onClick={onClose} />}
        <div className={styles.content} ref={modalContentRef}>
          {children}
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};

export default Modal;
