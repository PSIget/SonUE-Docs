import SiteSwitcher from "./SiteSwitcher";
import Link from "next/link";
import styles from "./HeaderLogo.module.scss";
import Logo from "./Logo";

function HeaderLogo() {
  return (
    <>
      <Link href="/" title="Home" className="hover:opacity-75">
        <Logo height={24} showText />
      </Link>
      <div className={styles.siteSwitcher}>
        <SiteSwitcher />
      </div>
    </>
  );
}

export default HeaderLogo;
