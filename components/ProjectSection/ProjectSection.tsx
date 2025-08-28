import { Project } from "@/app/projects/page";
import Carousel from "./Carousel";
import Link from "next/link";
import Image from "next/image";

import styles from "./ProjectSection.module.css"

export function ProjectSection({ project, images }: { project: Project, images: string[] }) {
  return (
    <div className={`${styles.section} float`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{project.name}</h3>

        <div className={styles.links}>
          {project.link && 
            <Link className={styles.link} href={project.link} target="_blank">
                <Image className={styles.icon} src="icons/link.svg" alt="Link" width={22} height={22}/>
            </Link>
          }

          <Link className={styles.link} href={project.repo} target="_blank">
              <Image className={styles.icon} src="icons/github.svg" alt="GitHub logo" width={22} height={22}/>
          </Link>
        </div>
      </div>

      <Carousel images={images} captions={project.captions}/>

      <div className={styles.desc}>
        {project.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </div>
  );
}