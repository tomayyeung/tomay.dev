"use client";

// import { useView } from "@/context/ViewContext";
import { Project } from "./page";
// import ProjectsGame from "./ProjectsGame";
import ProjectsText from "./ProjectsText";

export type ProjectsProps = {
  projects: Project[],
  images: string[],
}

export function ProjectsPage({ projects, images }: ProjectsProps) {
  // const { viewMode } = useView();
  // return viewMode === "game" ?
  //   <ProjectsGame projects={projects} images={images}/> :
  //   <ProjectsText projects={projects} images={images}/>;
  return <ProjectsText projects={projects} images={images}/>;
}