"use client";

import { useEffect } from "react";

import styles from "./page.module.css";

export default function CanvasDemo() {
  useEffect(() => {
    import("./colored-square");

    // disable scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      <div id="canvas-support" className={styles["canvas-support"]}>Sorry, your browser does not support HTML canvas.</div>
      <canvas id="colored-square"></canvas>
    </>
  )
}