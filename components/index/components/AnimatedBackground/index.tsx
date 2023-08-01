import cn from "classnames";
import styles from "./index.module.scss";

export function AnimatedBackground(): JSX.Element {
  return (
    <>
      <div
        className={`${styles.gradient} -z-10 absolute inset-0 [--gradient-stop-1:0px] [--gradient-stop-2:50%]`}
      />
      <div
        className={cn(
          "![perspective:1000px] sm:![perspective:1000px] md:![perspective:1000px] lg:![perspective:1000px]",
          styles.container
        )}
      >
        <div
          style={{
            transform: "rotateX(83deg)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <div className={styles.lines} />
          <div className={cn(styles.lines, styles.linesBackground)} />
        </div>
      </div>
    </>
  );
}
