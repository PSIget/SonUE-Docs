import Link from "next/link";
import styles from "./Item.module.scss";
import { ArrowDown, ExternalLink, File } from "react-feather";
import React from "react";

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

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const Item: React.FC<DownloadFile> = ({
  name,
  description,
  size,
  url,
  additional,
}) => {
  // Проверяем, содержит ли url подстроку "https://boosty.to/"
  const isBoosty = /^https:\/\/(www\.)?boosty\.to/.test(url);

  // Проверяем, содержит ли url подстроку "https://www.patreon.com/"
  const isPatreon = /^https:\/\/(www\.)?patreon\.com/.test(url);

  // Создаем классы для элемента в зависимости от условий
  const itemClasses = `${styles.item} ${isBoosty ? styles.boosty : ""} ${
    isPatreon ? styles.patreon : ""
  }`;

  return (
    <Link
      href={url}
      {...(additional.external_link
        ? { rel: "noreferrer", target: "_blank" }
        : {})}
      className={itemClasses}
    >
      <div className={styles.icon}>
        <File size={24} color="white" />
      </div>

      <div className={styles.text}>
        <h4>{name}</h4>
        <p>
          {description} · {formatBytes(size)}
        </p>
      </div>

      <div className={styles.downIcon}>
        {additional.external_link ? (
          <ExternalLink size={16} color="white" />
        ) : (
          <ArrowDown size={16} color="white" />
        )}
      </div>
    </Link>
  );
};
