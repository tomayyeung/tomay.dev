import { InfoSection } from "@/components/InfoSection";
import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="float">
        <h1>Hey there! 😺</h1>
        <p>I&apos;m Thomas, a second-year student at the University of San Francisco.</p>
        <p>Some of my interests include:</p>
        <ul className={styles.ul}>
          <li>Game development</li>
          <li>Artificial intelligence</li>
          <li>Web development</li>
        </ul>
      </div>

      <div className="float">
        <Link className={`internal-link ${styles.projectsLink}`} href={"/projects"}>Click here to view my projects! →</Link>
        <div style={{borderTop: "1px solid white", margin: "2em 0"}}></div>
      </div>

      <h2 className="float">A little more about me:</h2>
      <InfoSection title="I have 2 cats" info={["Aslan (orange)", "Jiji (black)"]} picture="cats.jpg" />
      <InfoSection title="I like running" info={["I did cross country and track in high school", "Now I run on my own for fun", "Golden Gate Park is an amazing place to run"]} />
      <InfoSection title="I play chess" info={["Chess Club president in high school", "Chess Club vice president in college", "thoomass on lichess"]} />

      <div className="float">
        <div style={{borderTop: "1px solid white", margin: "2em 0"}}></div>
        <h2>Miscellaneous Items</h2>
        <ul className={styles.ul}>
          <li><Link className={`internal-link ${styles.miscLink}`} href={"/phreaking"}>Phreaking</Link> - A quiz-style game of
          guessing dial tones. Created for an in-class presentation.
          on <Link className="external-link" href={"https://en.wikipedia.org/wiki/Phreaking"} target="_blank">phreaking</Link>.</li>
          <li><Link className={`internal-link ${styles.miscLink}`} href={"/canvas-demo"}>Canvas demo</Link> - A basic demo of
          canvas functionality in built in preparation for crts.io (see projects).</li>
        </ul>
      </div>
    </>
  )
}
