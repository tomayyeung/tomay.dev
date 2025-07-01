import PlatformerWrapper from "@/components/Platformer/PlatformerWrapper";
import { Alignment } from "@/components/PlatformerLabel";
import { CameraProvider } from "@/context/CameraContext";
import { Label } from "@/components/PlatformerLabel/PlatformerLabel";

export function HomeGame() {
  const labels: Label[] = [
    {
      x: -175, y: -180, text: "Projects", align: Alignment.CenterTop
    }
  ];
  return (
    <CameraProvider>
      <PlatformerWrapper
        player = {{ x: 0, y: -500, width: 50, height: 50, speed: 5,
        }}
        platforms = {[
          { x: -200, y: -180, width: 150, height: 20, type: 'oneWay' },
          { x: 50, y: -125, width: 100, height: 20, type: 'oneWay' },
        ]}
        doors = {[
          { x: -200, y: -230, width: 50, height: 50, redirect: "/projects" },
          { x: 50, y:- 175, width: 50, height: 50, redirect: "/canvas-demo" },
          ]}
        labels={labels}
        />
    </CameraProvider>
  );
}