import path from "path";
import fs from "fs/promises"
import { ProjectsPage } from "./ProjectsPage";

export interface Project {
  name: string,
  folder: string, // images are got from @/public/project_images/{folder}
  captions: string[], // Depending on image size, these need to be limited in length
  description: string[],
  repo: string, // link to repo
  link?: string,
};

const projects: Project[] = [
  {
    name: "Newsflash",
    folder: "newsflash",
    captions: [
      "Home page with preferences",
      "Selecting some preferences",
      "AI-generated summaries"
    ],
    description: [
      "An AI-powered news debrief, with access to current events among a large range of categories. Users can enter \
      search preferences and create short, digestible summaries of all the recent news.",
      "Tech Stack: Next.js, GNews.io, ChatGPT",
      "This project won third place at the DEPLOY/24 hackathon!"],
    repo: "https://github.com/nishoof/newsflash",
  },
  {
    name: "creg CLI",
    folder: "creg_cli",
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
    ],    description: ["A two-part project with a separate website aspect to aid course registration at USF. The CLI is targeted \
      towards more experienced students, and has various commands, including searching, planning, and viewing potential \
      schedules. Course and section information was obtained with a web scraper.",
      "Tech Stack: C, MongoDB, Python (scraper)",
      "This project won the \"Best Website\" category at the DonsHack 25 hackathon!",
    ],
    repo: "https://github.com/tomayyeung/c-reg",
  },
  {
    name: "creg Website",
    folder: "creg_web",
    captions: [
      "Home page, with AI chatbot open",
      "",
    ],
    description: ["A two-part project with a separate CLI aspect to aid course registration at USF. The website is targeted \
      towards newer students, including features to aid students in finding courses to take. The website provides links to \
      helpful videos, tools to provide AP or placement test credit, and an AI assistant for any questions the user may have.",
      "Tech Stack: Next.js, MongoDB, NextAuth.js, Python",
      "This project won the \"Best Website\" category at the DonsHack 25 hackathon!",
    ],
    repo: "https://github.com/nishoof/creg",
    link: "https://creg-web.vercel.app/",
  },
  {
    name: "crts.io",
    folder: "crts",
    captions: [
      "Main menu",
      "Loaded in / Global leaderboard",
      "Upgraded vehicle and character / Lap times",
      "General gameplay / Current acceleration in bottom right",
    ],
    description: ["crts.io is a fast-paced game, a racing and combat hybrid. Its 2-D vector graphics are inspired by diep.io, \
      and it includes upgrades to the player's vehicle (for racing) and character (for combat). Similarly to diep.io, objects \
      spawn around the map and provide experience for the player to level up.",
      "Though the game is singleplayer, a leaderboard tracks fastest laps completed globally.",
      "Tech Stack: HTML, CSS, TypeScript, Firebase",
      "This project won first place at the 2025 BLOOM hackathon."
    ],
    repo: "https://github.com/nishoof/crts",
    link: "https://crts.nishilanand.com/",
  }
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