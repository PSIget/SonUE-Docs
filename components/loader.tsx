import classNames from "classnames";
import styles from "./Loader.module.scss"

export const Loader = () => (
  <div className={classNames(styles.ldsRing, styles.mxAuto)} aria-label="Loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
