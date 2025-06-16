import { TextWrapper } from "@/components/TextWrapper";
import { ProjectSection } from "@/components/ProjectSection";
import { ProjectsProps } from "./ProjectsPage";

export default function ProjectsText({ projects, images }: ProjectsProps) {
  return (
    <TextWrapper>
      <h1>Projects</h1>
      {projects.map((project, index) => {
        return (
          <ProjectSection
            key={index}
            project={project}
            images={images.filter((path) => path.split("/").at(-2) === project.folder)} // -2 for proj directory
          />);
      })}
    </TextWrapper>
  );
}