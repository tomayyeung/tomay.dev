import path from "path";
import fs from "fs/promises"
import { ProjectsPage } from "./ProjectsPage";

export interface Project {
  name: string, // images are got from @/public/project_images/{name}
  description: string,
  link: string, // link to repo
};

const projects: Project[] = [
  {
    name: "Newsflash",
    description: "AI-powered news debrief, with access to current events",
    link: "https://github.com/nishoof/newsflash",
  },
];

  // const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

  // const imagesDir = path.join(process.cwd(), 'public', dir);
  // return (await fs.readdir(imagesDir)).filter((file) => {
  //   console.log(file);
  //   for (const ext of imageExtensions) {
  //     if (file.endsWith(ext)) {
  //       console.log("ends");
  //       return true;
  //     }
  //   }
  //   return false;
  // }).map((name) => `/${dir}/${name}`);

// Get all images - then send to client component ProjectsPage, which will sort through the images
async function getImagesFromDir(dir: string) {
  return (await fs.readdir(path.join(process.cwd(), 'public', dir))).filter((file) => {
    for (const ext of ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']) {
      if (file.endsWith(ext)) {
        return true;
      }
    }
    return false;
  }).map((name) => `/${dir}/${name}`);
}

export default async function Projects() {
  const images = await getImagesFromDir("project_images/newsflash");
  return <ProjectsPage projects={projects} images={images} />;
}