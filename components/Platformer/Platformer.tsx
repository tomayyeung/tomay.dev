"use client";

import { useEffect, useRef } from "react";
// import { redirect } from "next/dist/server/api-utils";

import { Door, Platform, PlayerStats } from "@/components/Platformer/platformer-helper";
import { loadKeybinds, startPlatformer } from "@/components/Platformer/platformer-game";
import { useCamera } from "@/context/CameraContext";

export function Platformer({ player, platforms, doors } : { player: PlayerStats, platforms: Platform[], doors: Door[] }) {
  const { setCamera } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    loadKeybinds();

    const cleanup = startPlatformer(canvasRef.current, setCamera, player, platforms, doors);
    return cleanup;
  }, [setCamera, player, doors, platforms]);

  return (
    <canvas
    ref={canvasRef}
    />
  );
}