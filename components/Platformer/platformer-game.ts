import { Platform, Door, Keybinds, defaultKeybinds, Player, updateMovement, draw, PlayerStats, defaultPlatforms } from "./platformer-helper";
import { Camera } from "@/context/CameraContext";

let keybinds: Keybinds = { ...defaultKeybinds };

export function updateKeybind(action: keyof Keybinds, newKey: string) {
  keybinds[action] = newKey;
  saveKeybinds();
}

function saveKeybinds() {
  localStorage.setItem('keybinds', JSON.stringify(keybinds));
}

export function loadKeybinds() {
  const savedKeybinds = localStorage.getItem('keybinds');
  if (savedKeybinds) {
    keybinds = JSON.parse(savedKeybinds);
  }
}

export function startPlatformer(
  canvas: HTMLCanvasElement,
  setCamera: (newCamera: Partial<Camera>) => void,
  playerStats: PlayerStats,
  platformsList?: Platform[],
  doorsList?: Door[],
) {
  let inGame = true; // are we in this instance of platformer?

  // remove overflow - hide scroll bar
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  // get context
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const updateCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  updateCanvas();
  window.addEventListener('resize', updateCanvas);

  const player: Player = {
    ...playerStats,
    vx: 0, vy: 0, jumping: false,
  };

  const platforms: Platform[] = [
    ...defaultPlatforms,
    ...(platformsList ?? []),
  ];

  const doors = doorsList ?? [];

  const keys = {
    left: false,
    right: false,
    jump: false,
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === keybinds.left) keys.left = true;
    if (e.key === keybinds.right) keys.right = true;
    if (e.key === keybinds.jump && !player.jumping) keys.jump = true;
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === keybinds.left) keys.left = false;
    if (e.key === keybinds.right) keys.right = false;
    if (e.key === keybinds.jump) keys.jump = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  let lastTime = performance.now();
  const update = (time: number) => {
    updateMovement(lastTime, time, keys, player, doors, platforms);
    lastTime = time;

    draw(canvas, ctx, setCamera, player, doors, platforms);

    if (inGame) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);

  return () => {
    console.log("cleanup");
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('resize', updateCanvas);
    document.body.style.overflow = originalOverflow;
    inGame = false;
  };
}
