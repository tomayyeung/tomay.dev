import { ReactNode } from "react";

import styles from "./TextWrapper.module.css";

/**
 * All pages in text mode have the same format, so we create a wrapper for them
 */
export function TextWrapper({ children }: { children: ReactNode} ) {
  return (
    <>
      {/* Background */}

      {/* Body */}
      <div className={styles.body}>
        {children}
      </div>
    </>
  );
}