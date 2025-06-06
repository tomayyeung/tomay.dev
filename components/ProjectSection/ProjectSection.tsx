// import { Carousel } from "./CarouselA";

import { Project } from "@/app/projects/page";
import Carousel from "./Carousel";
// import Link from "next/link";

// function findImagesforProject() {

// }
/**
 * 
 * @returns A section of a singular project for /projects on text mode
 */
export function ProjectSection({ project, images }: { project: Project, images: string[] }) {
  return (
    <>
      <h3>{project.name}</h3>
      <Carousel images={images}/>
      <p>{project.description}</p>
      <a href={project.link}></a>
    </>
  )
}