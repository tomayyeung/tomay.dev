"use client";

import { useEffect, useState } from "react";

import styles from "./UpdateDisplay.module.css";
import Link from "next/link";

export function UpdateDisplay() {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/latest-commit")
      .then((res) => res.json())
      .then((data) => {
        const d = new Date(data.latestCommitDate);
        const daysAgo = Math.ceil((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));

        setDate(d.toLocaleDateString() + ` (${daysAgo} ${daysAgo == 1 ? "day" : "days"} ago)`);
      });
  }, []);

  return (
    <code className={styles.update}>
      <Link className={styles.link} href="https://github.com/tomayyeung/tomay.dev" target="_blank">
        last updated: {date ?? "loading..."}
      </Link>
    </code>
  );
}
