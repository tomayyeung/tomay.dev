import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={`${styles.intro} float`}>
        <h1>Hey there!</h1>
        <p className={styles.lede}>
          I&apos;m Thomas, a third-year student at the University of San
          Francisco.
        </p>
        <p className={styles.interestsLabel}>
          I like building fun projects and things I would use! Some of my
          interests include backend development, artificial intelligence, and
          web development.
        </p>
      </section>

      <section className={`${styles.projectsCallout} float`}>
        <Link
          className={`internal-link ${styles.projectsLink}`}
          href={"/projects"}
        >
          View my projects <span aria-hidden="true">→</span>
        </Link>
      </section>

      <h2 className={`${styles.sectionHeading} float`}>
        A little more about me
      </h2>
      <ul className={`${styles.ul} float`}>
        <li>I have two cats: Aslan (an orange cat) and Jiji (a black cat)</li>
        <li>
          I like running - I ran in high school, and now I enjoy running various
          trails around San Francisco.
        </li>
        <li>I play chess - I&apos;m president of the chess club at USF!</li>
      </ul>
    </main>
  );
}
