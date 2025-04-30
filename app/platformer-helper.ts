interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
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

export const FPS = 60;
