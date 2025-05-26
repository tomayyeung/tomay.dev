import { Platformer } from "@/components/Platformer";
import { Alignment, PlatformerLabel } from "@/components/PlatformerLabel";
import { CameraProvider } from "@/context/CameraContext";

export function HomeGame() {
  return (
    <CameraProvider>
      <Platformer
      platforms={[
        { x: -200, y: -180, width: 150, height: 20, type: 'oneWay' },
        { x: 50, y: -125, width: 100, height: 20, type: 'oneWay' },
      ]}
      doors = {[
        { x: -200, y: -230, width: 50, height: 50, redirect: "/projects" },
        { x: 50, y:- 175, width: 50, height: 50, redirect: "/canvas-demo" },
        ]}/>

      <PlatformerLabel label={{ x: -200, y: -180, text: "Projects" }} alignment={Alignment.TopLeft}></PlatformerLabel>
    </CameraProvider>
  );
}