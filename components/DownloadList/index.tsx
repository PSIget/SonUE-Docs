import styles from "./index.module.scss";
import React, { useMemo } from "react";
import { Item } from "./Item";
import useLocalesMap from "utils/use-locales-map";
import { setup, unpacked, ver } from "./text";
import { m, useReducedMotion } from "framer-motion";

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

const MotionDiv = m.div;

const DownloadList: React.FC<DownloadListProps> = ({ data }) => {
  const shouldReduceMotion = useReducedMotion();

  const setupTranslation = useLocalesMap(setup);
  const unpackedTranslation = useLocalesMap(unpacked);
  const verTranslation = useLocalesMap(ver);

  const groupTypeMapping: { [key: string]: string } = useMemo(
    () => ({
      setup: setupTranslation,
      unpacked: unpackedTranslation,
    }),
    [setupTranslation, unpackedTranslation]
  );

  const container = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.3,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const item = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    show: { opacity: 1, y: 0 },
  };

  const formattedData = useMemo(() => {
    return data.map((version) => ({
      ...version,
      groups: version.groups.map((group) => ({
        ...group,
        groupType: groupTypeMapping[group.groupType] || group.groupType,
      })),
    }));
  }, [data, groupTypeMapping]);

  return (
    <MotionDiv variants={container} initial="hidden" animate="show">
      {formattedData.map((version) => (
        <MotionDiv
          key={version.version}
          variants={item}
          className={`${styles.verison} bg-black rounded-xl border border-zinc-800 p-4`}
        >
          <h2>
            {verTranslation} {version.version}
          </h2>
          {version.groups.map((group) => (
            <div key={group.groupType} className={styles.group}>
              <h3>{group.groupType}</h3>
              <MotionDiv variants={item} className={styles.items}>
                {group.files.map((file) => (
                  <Item {...file} key={file.name} />
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
