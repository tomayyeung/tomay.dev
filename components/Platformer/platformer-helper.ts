import { Camera } from "@/context/CameraContext";

// World objects and methods
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PlayerStats extends Rect {
  speed: number,
}

export interface Player extends PlayerStats {
  vx: number,
  vy: number,
  jumping: boolean,
}

export interface Platform extends Rect {
  type: 'solid' | 'oneWay';
}

export interface Door extends Rect {
  redirect: string;
}

export function isColliding(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function doorCollision(door: Door) {
    console.log("Door collide",  door.redirect);
}

// Keybinds
export type Keybinds = {
  left: string;
  right: string;
  jump: string;
};

export const defaultKeybinds = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  jump: ' ',
};

type Keypresses = {
  left: boolean;
  right: boolean;
  jump: boolean;
};

// Game constants
export const FPS = 60;

export const WORLD_WIDTH = 1920;
export const WORLD_HEIGHT = 1080;

const WALL_SIZE = 200; // thickness of world walls
export const defaultPlatforms: Platform[] = [
  { x: -WORLD_WIDTH/2 - WALL_SIZE, y: 0, width: WORLD_WIDTH + WALL_SIZE*2, height: WALL_SIZE, type: 'solid' }, // floor
  { x: -WORLD_WIDTH/2 - WALL_SIZE, y: -WORLD_HEIGHT - WALL_SIZE, width: WALL_SIZE, height: WORLD_HEIGHT + WALL_SIZE*2, type: 'solid' }, // left wall
  { x: WORLD_WIDTH/2, y: -WORLD_HEIGHT - WALL_SIZE, width: WALL_SIZE, height: WORLD_HEIGHT + WALL_SIZE*2, type: 'solid' }, // right wall
  { x: WORLD_WIDTH - WALL_SIZE, y: -WORLD_HEIGHT - WALL_SIZE, width: WORLD_WIDTH + WALL_SIZE*2, height: WALL_SIZE, type: 'solid' }, // ceiling
];

const gravity = 0.5; // higher values make player fall faster
const friction = 0.85; // higher values make player slow down faster
const jumpPower = 12; // higher values make player jump higher
const terminalVelocity = 20;

export function updateMovement(lastTime: number, time: number, keys: Keypresses, player: Player, doors: Door[], platforms: Platform[]) {
  const deltaTime = (time - lastTime) / (1000 / FPS);

  // update player position based on input
  if (keys.left) player.vx = -player.speed;
  else if (keys.right) player.vx = player.speed;
  else { // player is not moving left/right, so apply friciton
    player.vx *= friction;
    if (Math.abs(player.vx) < 0.01) player.vx = 0;
  }

  if (keys.jump && !player.jumping) { // player.jumping so that this doesn't keep hitting while player is midair
    player.vy = -jumpPower;
    player.jumping = true;
  }

  player.vy += gravity;
  if (player.vy > terminalVelocity) player.vy = terminalVelocity;

  player.x += player.vx * deltaTime;

  // Horizontal platform collisions
  platforms.forEach(platform => {
    if (platform.type !== 'solid') return; // only check horizontal collisions on solid platforms

    if (isColliding(player, platform)) {
      if (player.vx > 0) { // from left
        player.x = platform.x - player.width;
      } else if (player.vx < 0) { // from right
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
}

export function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, setCamera: (newCamera: Partial<Camera>) => void, player: Player, doors: Door[], platforms: Platform[]) {
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

  // draw player above platforms & doors
  ctx.fillStyle = '#f24';
  ctx.fillRect(player.x - camX, player.y - camY, player.width, player.height);
}