"use client";

import { Platformer } from "./Platformer";
import { PlayerStats, Platform, Door } from "./platformer-helper";
import { useCamera } from "@/context/CameraContext";
import { Label, PlatformerLabel } from "../PlatformerLabel/PlatformerLabel";

interface PlatformerProps {
  player: PlayerStats,
  platforms: Platform[],
  doors: Door[],
  labels: (Label)[],
};

/**
 * Wrapper of all Platformer pages, creates Platformer Game & Platformer Labels
 */
export default function PlatformerWrapper({ player, platforms, doors, labels } : PlatformerProps) {
  const { camera } = useCamera(); // pass in camera to elems so that they don't have to all useCamera

  return (
    <>
      <Platformer player={player} platforms={platforms} doors={doors}/>

      {labels.map((label, index) => <PlatformerLabel key={index} label={label} camera={camera} />)}
    </>
  );
}
