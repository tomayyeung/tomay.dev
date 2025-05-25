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
 * As our platformer uses the bottom left corner as the origin, labels' y positions will be measured from the bottom;
 * i.e. all labels will have left: label.x, bottom: label.y;
 * the transform property will be how we align
 */
export function PlatformerLabel({ label, alignment }: { label: Label, alignment: Alignment }) {
  let transform = "";
  switch (alignment) {
    case Alignment.TopLeft:
      transform = "translateY(100%)";
      break;
    case Alignment.TopRight:
      transform = "translateX(-100%) translateY(100%)";
      break;
    case Alignment.BottomLeft:
      break;
    case Alignment.BottomRight:
      transform = "translateX(-100%)";
      break;
    case Alignment.CenterTop:
      transform = "translateX(-50%) translateY(100%)";
      break;
    case Alignment.CenterLeft:
      transform = "translateY(50%)";
      break;
    case Alignment.CenterRight:
      transform = "translateX(-100%) translateY(50%)";
      break;
    case Alignment.CenterBottom:
      transform = "translateX(-50%)";
      break;
  }

  return <div className={styles.label} style={{left: label.x, bottom: label.y, transform: transform}}>{label.text}</div>
}