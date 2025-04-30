import { Platformer } from "@/components/Platformer";

export function HomeGame() {
  return (
    <Platformer
    platforms={[
      { x: 200, y: 180, width: 150, height: 20, type: 'oneWay' },
      { x: 450, y: 125, width: 100, height: 20, type: 'oneWay' },
    ]}
    doors = {[
      { x: 200, y: 230, width: 50, height: 50, redirect: "/projects" },
      { x: 450, y: 175, width: 50, height: 50, redirect: "/canvas-demo" },
    ]}/>
  );
}