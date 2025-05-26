import { useCamera } from "@/context/CameraContext";
import styles from "./PlatformerLabel.module.css"

export interface Label {
  x: number,
  y: number,
  text: string,
};

// where the label is aligned to
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

/**
 * @param label x, y are world coordinates, not screen coordinates
 */
export function PlatformerLabel({ label, alignment }: { label: Label, alignment: Alignment }) {
  let transform = "";
  switch (alignment) {
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

  const { camera } = useCamera();

  return <div className={styles.label} style={{ left: label.x - camera.x, top: label.y - camera.y, transform }}>{label.text}</div>
}