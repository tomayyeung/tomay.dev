"use client";

import { useView } from "@/context/ViewContext";
import ProjectsGame from "./ProjectsGame";
import ProjectsText from "./ProjectsText";

export interface Project {
  name: string, // images are got from @/public/project_images/{name}
  description: string,
  link: string, // link to repo
};

export default function Projects() {
  const { viewMode } = useView();
  return viewMode === "game" ? <ProjectsGame /> : <ProjectsText />;
}