import styles from "./Logo.module.scss";
import React from "react";
import Image from "next/image";

import Image1 from "./images/Icon.svg";
import Image2 from "./images/Text.svg";

interface LogoProps {
  height: number;
  showText?: boolean;
  column?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ height, showText, column, className }) => {
  const adjustedHeight = Math.floor(height - 4);

  return (
    <div className={`${column ? styles.column : styles.row} ${className}`}>
      <Image
        src={Image1}
        alt="STALKER on UE Icon"
        height={height}
        width={height}
        priority
      />
      {showText && (
        <Image
          src={Image2}
          alt="STALKER on UE Logo"
          height={adjustedHeight}
          className={styles.hideOnMobile}
          priority
        />
      )}
    </div>
  );
};

export default Logo;
