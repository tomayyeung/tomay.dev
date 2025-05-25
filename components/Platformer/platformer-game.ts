/**
 * to address small screens: add scrolling or restrict to text mode on small screens
 * 
 * right wall should probably not be based on window size
 */

import { Platform, Door, isColliding, doorCollision, Keybinds, defaultKeybinds, FPS, Player } from "./platformer-helper";

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

let prevHeight: number = 0;
/**
 * when window is resized vertically, things are still drawn relative to the top, meaning they will be hidden if the window is
 * shortened enough. Address this by updating all y-values
*/
function refreshCanvasSize(canvas: HTMLCanvasElement, platforms?: Platform[], doors?: Door[], player?: Player) {
  // update canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // update y-values
  if (platforms !== undefined) platforms.forEach(platform => platform.y += canvas.height - prevHeight);
  if (doors !== undefined) doors.forEach(door => door.y += canvas.height - prevHeight);
  if (player !== undefined) player.y += canvas.height - prevHeight;

  prevHeight = canvas.height;
}

export function startPlatformer(
  canvas: HTMLCanvasElement, platformsList?: Platform[], doorsList?: Door[],
) {
  // remove overflow - hide scroll bar
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  // get context
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  refreshCanvasSize(canvas);

  // define constants
  const gravity = 0.5; // higher values make player fall faster
  const friction = 0.85; // higher values make player slow down faster
  const jumpPower = 12; // higher values make player jump higher
  const terminalVelocity = 20;

  /* 
  * Coordinates of platforms and doors will be inputted by components with the origin at the bottom left corner
  * This makes handling different screen sizes easier; big screens won't have to deal with having high platforms
  * As a result, these coordinates need to be adapted to HTML canvas coordinates
  */
  platformsList?.forEach(platform => platform.y = canvas.height - platform.y);
  doorsList?.forEach(door => door.y = canvas.height - door.y);

  const defaultPlatforms: Platform[] = [
    { x: 0, y: canvas.height - 50, width: canvas.width, height: 50, type: 'solid' }, // floor
    { x: -50, y: 0, width: 50, height: canvas.height, type: 'solid' }, // left wall
    { x: canvas.width, y: 0, width: 50, height: canvas.height, type: 'solid' }, // right wall
    { x: 0, y: 0, width: canvas.width, height: 50, type: 'solid' }, // ceiling
  ];

  const platforms: Platform[] = [
    ...defaultPlatforms,
    ...(platformsList ?? []),
  ];

  const doors = doorsList ?? [];

  const player: Player = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    vx: 0,
    vy: 0,
    speed: 5,
    jumping: false,
  };

  const updateCanvas = () => refreshCanvasSize(canvas, platforms, doors, player);
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
        // player.y + player.height + player.vy * deltaTime >= platform.y && // Bottom of player below top of platform
        // player.y < platform.y && // Top of player above top of platform (to ensure it's a collision from the top)
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

    // Draw platforms, doors, player
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    platforms.forEach(platform => {
      ctx.fillStyle = '#444';
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    doors.forEach(door => {
      ctx.fillStyle = '#0f0';
      ctx.fillRect(door.x, door.y, door.width, door.height);
    });

    ctx.fillStyle = '#f24';
    ctx.fillRect(player.x, player.y, player.width, player.height);

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
