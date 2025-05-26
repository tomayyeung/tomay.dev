/**
 * to address small screens: add scrolling or restrict to text mode on small screens
 * 
 * right wall should probably not be based on window size
 */

import { Platform, Door, isColliding, doorCollision, Keybinds, defaultKeybinds, FPS, Player, WORLD_WIDTH, WORLD_HEIGHT } from "./platformer-helper";
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
  platformsList?: Platform[],
  doorsList?: Door[]
) {
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

  // define constants
  const gravity = 0.5; // higher values make player fall faster
  const friction = 0.85; // higher values make player slow down faster
  const jumpPower = 12; // higher values make player jump higher
  const terminalVelocity = 20;

  /* 
  * Coordinates of platforms and doors will be inputted by components with the origin at the center bottom of world
  * This makes handling different screen sizes easier; big screens won't have to deal with having high platforms
  * As a result, these coordinates need to be adapted to HTML canvas coordinates
  */
  const WALL_SIZE = 200; // thickness of world walls
  const defaultPlatforms: Platform[] = [
    { x: -WORLD_WIDTH/2 - WALL_SIZE, y: 0, width: WORLD_WIDTH + WALL_SIZE*2, height: WALL_SIZE, type: 'solid' }, // floor
    { x: -WORLD_WIDTH/2 - WALL_SIZE, y: -WORLD_HEIGHT - WALL_SIZE, width: WALL_SIZE, height: WORLD_HEIGHT + WALL_SIZE*2, type: 'solid' }, // left wall
    { x: WORLD_WIDTH/2, y: -WORLD_HEIGHT - WALL_SIZE, width: WALL_SIZE, height: WORLD_HEIGHT + WALL_SIZE*2, type: 'solid' }, // right wall
    { x: WORLD_WIDTH - WALL_SIZE, y: -WORLD_HEIGHT - WALL_SIZE, width: WORLD_WIDTH + WALL_SIZE*2, height: WALL_SIZE, type: 'solid' }, // ceiling
  ];

  const platforms: Platform[] = [
    ...defaultPlatforms,
    ...(platformsList ?? []),
  ];

  const doors = doorsList ?? [];

  const player: Player = {
    x: 0,
    y: -500,
    width: 50,
    height: 50,
    vx: 0,
    vy: 0,
    speed: 5,
    jumping: false,
  };

  window.addEventListener('resize', updateCanvas);

  const keys = {
    left: false,
    right: false,
    jump: false,
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === keybinds.left) keys.left = true;
    if (e.key === keybinds.right) keys.right = true;
    if (e.key === keybinds.jump && !player.jumping) {
      keys.jump = true;
      player.vy = -jumpPower;
      player.jumping = true;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === keybinds.left) keys.left = false;
    if (e.key === keybinds.right) keys.right = false;
    if (e.key === keybinds.jump) keys.jump = false;
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  let lastTime = performance.now(); // handle changes in FPS
  const update = (time: number) => {
    const deltaTime = (time - lastTime) / (1000 / FPS);
    lastTime = time;

    // update player position based on input
    if (keys.left) player.vx = -player.speed;
    else if (keys.right) player.vx = player.speed;
    else {
      player.vx *= friction;
      if (Math.abs(player.vx) < 0.01) player.vx = 0;
    }

    player.vy += gravity;
    if (player.vy > terminalVelocity) player.vy = terminalVelocity;

    player.x += player.vx * deltaTime;

    // Horizontal platform collisions
    platforms.forEach(platform => {
      if (platform.type !== 'solid') return;

      if (isColliding(player, platform)) {
        if (player.vx > 0) {
          player.x = platform.x - player.width;
        } else if (player.vx < 0) {
          player.x = platform.x + platform.width;
        }
        player.vx = 0;
      }
    });

    // Vertical platform collisions
    player.y += player.vy * deltaTime;
    platforms.forEach(platform => {
      // Player is falling down onto platform - this applies to both solid and one-way platforms
      if (
        // player.y + player.vy*deltaTime + player.height <= platform.y && // Player is above platform
        player.vy > 0 && // Player is falling
        isColliding(player, platform)
      ) {
        player.y = platform.y - player.height;  // Player lands on top of the platform
        player.vy = 0;  // Stop vertical movement
        player.jumping = false;
      }

      // Player is coming from under platform - this applies to only solid platforms
      if (platform.type === "solid") {
        if (
          player.y + player.vy * deltaTime <= platform.y + platform.height &&
          isColliding(player, platform)
        ) {
          player.y = platform.y + platform.height; // Player is stopped at the platform
          player.vy = 0;
        }
      }
    });

    // Door collisions
    doors.forEach(door => {
      if (isColliding(player, door)) {
        doorCollision(door);
      }
    });

    // Draw platforms, doors, player centered on player
    const camX = player.x + player.width/2 - canvas.width/2; // centered horizontally
    const camY = player.y - canvas.height * 3/5; // ~3/5ths down vertically
    setCamera({ x: camX,  y: camY });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    platforms.forEach(platform => {
      ctx.fillStyle = '#444';
      ctx.fillRect(platform.x - camX, platform.y - camY, platform.width, platform.height);
    });

    doors.forEach(door => {
      ctx.fillStyle = '#0f0';
      ctx.fillRect(door.x - camX, door.y - camY, door.width, door.height);
    });

    ctx.fillStyle = '#f24';
    ctx.fillRect(player.x - camX, player.y - camY, player.width, player.height);

    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('resize', updateCanvas);
    document.body.style.overflow = originalOverflow;
  };
}
