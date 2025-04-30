"use client";

import { useView } from "@/context/ViewContext";
import ProjectsGame from "./ProjectsGame";
import ProjectsText from "./ProjectsText";

export default function Projects() {
  const { viewMode } = useView();
  return viewMode === "game" ? <ProjectsGame /> : <ProjectsText />;
}