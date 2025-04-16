"use client";

import { usePathname } from "next/navigation";

import { useView } from "@/context/ViewContext";

export function ViewToggle() {
  const { viewMode, toggleViewMode } = useView();

  const pathname = usePathname();
  const hideOn = ["/phreaking", "/canvas-demo"];
  if (hideOn.includes(pathname)) return null;

  return (
    <button onClick={toggleViewMode}>
      Switch view mode to {viewMode === "game" ? "text" : "game"}
    </button>
  )
}