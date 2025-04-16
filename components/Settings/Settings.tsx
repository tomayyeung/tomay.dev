"use client";

import { ViewToggle } from "./ViewToggle";

import styles from "./Settings.module.css"

export function Settings() {
  return (
    <div id={styles.wrapper}>
      <ViewToggle />
    </div>
  );
}
