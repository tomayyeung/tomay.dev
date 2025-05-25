"use client";

import { useEffect, useRef } from "react";
// import { redirect } from "next/dist/server/api-utils";

import { Door, Platform } from "@/components/Platformer/platformer-helper";
import { loadKeybinds, startPlatformer } from "@/components/Platformer/platformer-game";

export function Platformer({ platforms, doors } : { platforms: Platform[], doors: Door[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    loadKeybinds();

    const cleanup = startPlatformer(canvasRef.current, platforms, doors);
    return cleanup;
  }, [doors, platforms]);

  return (
    <canvas
    ref={canvasRef}
    />
  );
}