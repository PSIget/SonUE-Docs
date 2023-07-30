import styles from "./index.module.scss";
import React, { useEffect, useMemo, useState } from 'react';
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

interface FormattedVersion extends Version {
  groups: FormattedGroup[];
}

interface FormattedGroup extends Group {
  groupType: string;
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
  const groupTypeMapping: {
    [key: string]: string; // This allows any string key with a string value
  } = {
    "setup": useLocalesMap(setup),
    "unpacked": useLocalesMap(unpacked),
    // добавьте сюда другие строки при необходимости
  };

  const formattedData = useMemo(() => {
    return data.map(version => ({
      ...version,
      groups: version.groups.map(group => ({
        ...group,
        groupType: groupTypeMapping[group.groupType] || group.groupType,
      })),
    }));
  }, [data, groupTypeMapping]);

  return (
    <MotionDiv variants={container} initial="hidden" animate="show">
      {formattedData.map((version) => (
        <MotionDiv key={version.version} variants={item} className={styles.verison}>
          <h2>Версия {version.version}</h2>
          {version.groups.map((group) => (
            <div key={group.groupType} className={styles.group}>
              <h3>{group.groupType}</h3>
              <MotionDiv variants={item} className={styles.items}>
                {group.files.map((file) => (
                  <Item {...file} key={file.name} />  // используйте уникальный ключ, если возможно
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
