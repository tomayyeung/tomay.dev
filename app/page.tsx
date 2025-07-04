"use client";

// import { HomeGame } from "./HomeGame";
// import { useView } from "@/context/ViewContext";
import { HomeText } from "./HomeText";

export default function Home() {
  // const { viewMode } = useView();
  // return viewMode === "game" ? <HomeGame /> : <HomeText />;
  return <HomeText />;
}
