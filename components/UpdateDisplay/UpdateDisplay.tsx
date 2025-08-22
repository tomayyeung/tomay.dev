"use client";

import { useEffect, useState } from "react";

import localFont from "next/font/local";
import styles from "./UpdateDisplay.module.css";
import Link from "next/link";

const menlo = localFont({
  src: "../../public/fonts/Menlo.ttf",
});

export function UpdateDisplay() {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/latest-commit")
      .then((res) => res.json())
      .then((data) => {
        const d = new Date(data.latestCommitDate);

        setDate(d.toLocaleDateString() + ` (${Math.ceil((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24))} days ago)`);
      });
  }, []);

  return (
    <Link className={styles.link} href="https://github.com/tomayyeung/tomay.dev" target="_blank">
      <div className={`${menlo.className} ${styles.update}`}>last updated: {date ?? "loading..."}</div>
    </Link>
  );
}
