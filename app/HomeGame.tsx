import { useEffect, useRef } from "react";

import { startPlatformer } from "./platformer";

export function HomeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    const cleanup = startPlatformer(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <canvas
    ref={canvasRef}
    />
  );
}