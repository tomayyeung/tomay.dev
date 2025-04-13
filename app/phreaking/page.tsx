"use client";

import { useEffect } from 'react';

import styles from "./page.module.css";

export default function Phreaking() {
  useEffect(() => {
    import('./phreaking');
  }, []);

  return (
    <div id={styles.main}>
      <h1>Phreaking Quiz</h1>

      <div id="info" className={styles.info}>
        <p id="progress"></p>
        <p id="incorrect"></p>
      </div>

      <div id={styles["switches-container"]} className={styles["switches-container"]}>
        <div className={styles["switch-container"]}>
          <p className={styles["switch-text"]}>Practice</p>
          <label id={styles["mode-switch"]} className={styles.switch}>
            <input type="checkbox" id="mode-switch-checkbox" className={styles["mode-switch-checkbox"]} defaultChecked />
            <span id={styles["mode-switch-slider"]} className={styles.slider}></span>
          </label>
          <p className={styles["switch-text"]}>Quiz</p>
        </div>

        <div className={styles["switch-container"]}>
          <p className={styles["switch-text"]}>Easy Mode</p>
          <label id={styles["hard-switch"]} className={styles.switch}>
            <input type="checkbox" id="hard-switch-checkbox" className={styles["hard-switch-checkbox"]} />
            <span id={styles["hard-switch-slider"]} className={styles.slider}></span>
          </label>
          <p className={styles["switch-text"]}>Hard Mode</p>
        </div>
      </div>

      <div id="main-quiz" className={styles["main-quiz"]}>
        <button id="play-sound" className={styles["play-sound"]}>Play Sound</button>

        <div id="mf-container" className={styles["mf-container"]}>
          <h2>Multi Frequency Tones</h2>

          <div id={styles.mf} className={styles["phone-button-container"]}>
            <div className={styles["phone-button-row"]}>
              <button id="mf1" className={styles["mf-phone-button"]}>1</button>
              <button id="mf2" className={styles["mf-phone-button"]}>2</button>
              <button id="mf3" className={styles["mf-phone-button"]}>3</button>
            </div>

            <div className={styles["phone-button-row"]}>
              <button id="mf4" className={styles["mf-phone-button"]}>4</button>
              <button id="mf5" className={styles["mf-phone-button"]}>5</button>
              <button id="mf6" className={styles["mf-phone-button"]}>6</button>
            </div>

            <div className={styles["phone-button-row"]}>
              <button id="mf7" className={styles["mf-phone-button"]}>7</button>
              <button id="mf8" className={styles["mf-phone-button"]}>8</button>
              <button id="mf9" className={styles["mf-phone-button"]}>9</button>
            </div>

            <div className={styles["phone-button-row"]}>
              <button id="mfkp" className={styles["mf-phone-button"]}>KP</button>
              <button id="mf0" className={styles["mf-phone-button"]}>0</button>
              <button id="mfst" className={styles["mf-phone-button"]}>ST</button>
            </div>
          </div>
        </div>

        <h2>Dual-Tone Multi-Frequency Tones</h2>
        <div id={styles.dtmf} className={styles["phone-button-container"]}>

          <div className={styles["phone-button-row"]}>
            <button id="dtmf1" className={styles["dtmf-phone-button"]}>1</button>
            <button id="dtmf2" className={styles["dtmf-phone-button"]}>2</button>
            <button id="dtmf3" className={styles["dtmf-phone-button"]}>3</button>
            <button id="dtmfA" className={styles["dtmf-phone-button"]}>A</button>
          </div>

          <div className={styles["phone-button-row"]}>
            <button id="dtmf4" className={styles["dtmf-phone-button"]}>4</button>
            <button id="dtmf5" className={styles["dtmf-phone-button"]}>5</button>
            <button id="dtmf6" className={styles["dtmf-phone-button"]}>6</button>
            <button id="dtmfB" className={styles["dtmf-phone-button"]}>B</button>
          </div>

          <div className={styles["phone-button-row"]}>
            <button id="dtmf7" className={styles["dtmf-phone-button"]}>7</button>
            <button id="dtmf8" className={styles["dtmf-phone-button"]}>8</button>
            <button id="dtmf9" className={styles["dtmf-phone-button"]}>9</button>
            <button id="dtmfC" className={styles["dtmf-phone-button"]}>C</button>
          </div>

          <div className={styles["phone-button-row"]}>
            <button id="dtmfstar" className={styles["dtmf-phone-button"]}>*</button>
            <button id="dtmf0" className={styles["dtmf-phone-button"]}>0</button>
            <button id="dtmfpound" className={styles["dtmf-phone-button"]}>#</button>
            <button id="dtmfD" className={styles["dtmf-phone-button"]}>D</button>
          </div>
        </div>

        <h2>Coin Demonination Tones</h2>
        <div id={styles.coins}>
          <button id="5cent" className={styles["coin-button"]}>5&cent;</button>
          <button id="10cent" className={styles["coin-button"]}>10&cent;</button>
          <button id="25cent" className={styles["coin-button"]}>25&cent;</button>
        </div>

        <h2>Other</h2>
        <div id={styles.other}>
          <button id="2600hz" className={styles["other-button"]}>2600 hz</button>
        </div>
      </div>

      <div id="indicator" className={styles.indicator}>
        <button id="indicator-button" className={styles["indicator-button"]}>&times;</button>
        <p id="indicator-text" className={styles["indicator-text"]}>Incorrect</p>
        <div id="indicator-progress-bar" className={styles["indicator-progress-bar"]}></div>
      </div>

      <p id="complete" className={styles.complete}>Quiz complete. Congratulations! <br/>
        Your total incorrect guesses: </p>

    </div>
  )
}
