import { Camera } from "@/context/CameraContext";
import styles from "./PlatformerLabel.module.css"

export enum Alignment {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
  CenterTop,
  CenterLeft,
  CenterRight,
  CenterBottom,
};

export interface Label {
  x: number,
  y: number,
  text: string,
  align: Alignment
};

/**
 * @param label x, y are world coordinates, not screen coordinates
 */
export function PlatformerLabel({ label, camera }: { label: Label, camera: Camera }) {
  let transform = "";
  switch (label.align) {
    case Alignment.TopLeft:
      break;
    case Alignment.TopRight:
      transform = "translateX(-100%)";
      break;
    case Alignment.BottomLeft:
      transform = "translateY(-100%)"
      break;
    case Alignment.BottomRight:
      transform = "translateX(-100%) translateY(100%)";
      break;
    case Alignment.CenterTop:
      transform = "translateX(-50%)";
      break;
    case Alignment.CenterLeft:
      transform = "translateY(-50%)";
      break;
    case Alignment.CenterRight:
      transform = "translateX(-100%) translateY(-50%)";
      break;
    case Alignment.CenterBottom:
      transform = "translateX(-50%) translateY(-100%)";
      break;
  }

  return (
    <div
    className={styles.label} 
    style={{ left: label.x - camera.x, top: label.y - camera.y, transform }}>
      {label.text}
    </div>
  );
}