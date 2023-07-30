import styles from "./index.module.scss"
import React from 'react';
import { Item } from './Item';
import useLocalesMap from "utils/use-locales-map";
import { setup, unpacked } from "./text";
import { motion } from 'framer-motion';

interface Additional {
  icon: string;
  external_link: boolean;
}

interface DownloadFile {
  name: string;
  description: string;
  size: number;
  url: string;
  additional: Additional;
}

interface Group {
  groupType: string;
  files: DownloadFile[];
}

interface Version {
  version: string;
  groups: Group[];
}

interface DownloadListProps {
  data: Version[];
}

const MotionDiv = motion.div;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const DownloadList: React.FC<DownloadListProps> = ({ data }) => {
  const groupTypeMapping = {
    "setup": useLocalesMap(setup),
    "unpacked": useLocalesMap(unpacked),
    // добавьте сюда другие строки при необходимости
  };

  return (
    <MotionDiv variants={container} initial="hidden" animate="show">
      {data.map((version) => (
        <MotionDiv className={styles.verison} key={version.version} variants={item}>
          <h2>Версия {version.version}</h2>
          {version.groups.map((group) => (
            <div className={styles.group} key={group.groupType}>
              <h3>{groupTypeMapping[group.groupType] || group.groupType}</h3>
              <MotionDiv className={styles.items} variants={item}>
                {group.files.map((file, i) => (
                  <Item {...file} key={i} />
                ))}
              </MotionDiv>
            </div>
          ))}
        </MotionDiv>
      ))}
    </MotionDiv>
  );
};

export default DownloadList;
