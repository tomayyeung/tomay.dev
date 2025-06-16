import path from "path";
import fs from "fs/promises"
import { ProjectsPage } from "./ProjectsPage";

export interface Project {
  name: string,
  folder: string, // images are got from @/public/project_images/{folder}
  description: string[],
  captions: string[], // Depending on image size, these need to be limited in length
  link: string, // link to repo
};

const projects: Project[] = [
  {
    name: "Newsflash",
    folder: "newsflash",
    description: [
      "An AI-powered news debrief, with access to current events among a large range of categories. Users can enter \
      search preferences and create short, digestible summaries of all the recent news.",
      "This project won third place at the DEPLOY/24 hackathon!"],
    captions: [
      "Home page with preferences",
      "Selecting some preferences",
      "AI-generated summaries"
    ],
    link: "https://github.com/nishoof/newsflash",
  },
  {
    name: "creg CLI",
    folder: "creg_cli",
    description: ["tbd"],
    captions: [
      "Craig, mascot of creg",
      "Help manual",
      "Logging in",
      "Browsing catalog, searching in CS subject",
      "Adding courses",
      "Getting help on view command",
      "Viewing a plan",
      "Viewing a plan as a weekly schedule",
      "Viewing all plans",
      "Error on removing a course",
      "Removing class and plan, and logging out"
    ],
    link: "https://github.com/tomayyeung/c-reg"
  },
];

const imgExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Get all images - then send to client component ProjectsPage, which will sort through the images
async function getImages() {
  const allFiles = await fs.readdir(path.join(process.cwd(), "public", "project_images"), {recursive: true});
  const imgs = allFiles.filter((file) => {
    for (const ext of imgExtensions) {
      if (file.endsWith(ext)) {
        return true;
      }
    }
    return false;
  });

  return imgs.map((name) => `/project_images/${name}`);
}

export default async function Projects() {
  const images = await getImages();
  return <ProjectsPage projects={projects} images={images} />;
}