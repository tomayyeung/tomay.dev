"use client";

import { usePathname } from "next/navigation";

import { useView } from "@/context/ViewContext";
import { Toggle } from "./Toggle";

// import styles from "./ViewToggle.module.css"

export function ViewToggle() {
  const { toggleViewMode } = useView();

  const pathname = usePathname();
  const hideOn = ["/phreaking", "/canvas-demo"];
  if (hideOn.includes(pathname)) return <></>;

  return (
    <Toggle name="View" left="Game" leftColor="#cdc" right="Text" rightColor="#343" func={toggleViewMode}/>
  );
}