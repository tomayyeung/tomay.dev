import { TextWrapper } from "@/components/TextWrapper";
import { ProjectSection } from "@/components/ProjectSection";
import { ProjectsProps } from "./ProjectsPage";

export default function ProjectsText({ projects, images }: ProjectsProps) {
  return (
    <TextWrapper>
      <h1>Projects</h1>
      {projects.map((project, index) => {
        return <ProjectSection key={index} project={project} images={images}/>
      })}
    </TextWrapper>
  );
}