import { Project } from "@/app/projects/page";
import Carousel from "./Carousel";
import Link from "next/link";
import Image from "next/image";

import styles from "./ProjectSection.module.css"

export function ProjectSection({ project, images }: { project: Project, images: string[] }) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.name}>{project.name}</h3>

        <Link className={styles.link} href={project.link} target="_blank">
          <button className={styles.copy}>
            <Image src="github.svg" alt="GitHub logo" width={22} height={22}/>
            <span id="tooltip" className={styles.tooltip}>{project.link}</span>
          </button>
        </Link>
      </div>

      <Carousel images={images} captions={project.captions}/>

      <div className={styles.desc}>
        {project.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </div>
  );
}