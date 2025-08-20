import Image from "next/image";
import Link from "next/link";

import styles from "./TextWrapper.module.css";

/**
 * All pages in text mode have the same format, so we create a wrapper for them
 */
export function TextWrapper({ children }: { children: React.ReactNode} ) {
  return (
    <>
      {/* Background */}

      {/* Body */}
      <div className={styles.body}>
        {children}
      </div>

      {/* Header */}
      {/* <div className={styles.header}>
        <div>
          updated 4/5
        </div>
      </div> */}

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.left}>Thomas Yeung</div>

        <div className={styles.right}>
          <Link className={styles.link} href="https://github.com/tomayyeung" target="_blank">
            <Image className={styles.social} src="icons/github.svg" alt="Github" width={25} height={25} />
          </Link>

          <Link className={styles.link} href="https://www.linkedin.com/in/thomas-h-yeung/" target="_blank">
            <Image className={styles.social} src="icons/linkedin.svg" alt="LinkedIn" width={25} height={25} />
          </Link>

          <Link className={styles.link} href="https://leetcode.com/u/thyeung/" target="_blank">
            <Image className={styles.social} src="icons/leetcode.svg" alt="LeetCode" width={25} height={25} />
          </Link>
        </div>
      </div>
    </>
  );
}