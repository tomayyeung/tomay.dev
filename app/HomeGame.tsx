import { useEffect, useRef } from "react";

import { Platform, Door } from "./platformer-helper";
import { loadKeybinds, startPlatformer } from "./platformer";
// import { redirect } from "next/dist/server/api-utils";

export function HomeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    loadKeybinds();

    const platforms: Platform[] = [
      { x: 200, y: 180, width: 150, height: 20, type: 'oneWay' },
      { x: 450, y: 125, width: 100, height: 20, type: 'oneWay' },
    ];
    const doors: Door[] = [
      { x: 200, y: 230, width: 50, height: 50, redirect: "/projects" },
      { x: 450, y: 175, width: 50, height: 50, redirect: "/canvas-demo" },
    ];

    const cleanup = startPlatformer(canvasRef.current, platforms, doors);
    return cleanup;
  }, []);

  return (
    <canvas
    ref={canvasRef}
    />
  );
}