"use client";

import { ViewToggle } from "./ViewToggle";

import styles from "./Settings.module.css"
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function Settings() {
  return (
    <>
      <div className={styles.wrapper}>
        {/* Settings icon */}
        <div className={styles.iconContainer}>
          <Image src="settings_white.svg" alt="Settings" width={40} height={40} className={styles.icon}/>
        </div>


        <div className={styles.container}>
          {/* Title */}
          {/* <div className={styles.containerTitle}>Settings</div> */}

          {/* Selectors */}
          <ViewToggle />
          <div style={{borderBottom: "1px solid white"}}></div>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
