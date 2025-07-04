import { useEffect } from "react";
import styles from "./Toggle.module.css"

interface ToggleProps {
  name: string;
  left: string;
  leftColor: string;
  right: string;
  rightColor: string;
  func: () => void;
}

export function Toggle(props: ToggleProps) {
  useEffect(() => {
    const root = document.getElementById(props.name)!;
    root.style.setProperty("--left", props.leftColor);
    root.style.setProperty("--right", props.rightColor)
  });

  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.name}</div>
      <div id={props.name} className={styles.switchContainer}>
        <p className={styles.switchText}>{props.left}</p>

        <label className={styles.switch}>
          <input type="checkbox" className={styles.checkbox} id="" onClick={props.func}/>
          <span className={styles.slider} />
        </label>

        <p className={styles.switchText}>{props.right}</p>
      </div>
    </div>
  );
}