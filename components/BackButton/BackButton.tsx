import Link from "next/link";

import styles from "./BackButton.module.css";

export function BackButton({page}: {page?: boolean}) {
  const link = <Link className={`internal-link ${styles.back}`} href={"/"}>← Back to Home</Link>;

  if (page) return link;
  else return <div className={styles.container}>{link}</div>;
}