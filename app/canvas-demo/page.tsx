"use client";

import { useEffect } from "react";

import styles from "./page.module.css";

export default function CanvasDemo() {
  useEffect(() => {
    import("./colored-square");
  }, []);

  return (
    <>
      <div id="canvas-support" className={styles["canvas-support"]}>Sorry, your browser does not support HTML canvas.</div>
      <canvas id="colored-square"></canvas>
    </>
  )
}