export function startPlatformer(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const gravity = 0.5;
    const friction = 0.8;
    const floorY = 300;
    const keys = {
      left: false,
      right: false,
    };
  
    const player = {
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      vx: 0,
      vy: 0,
      speed: 5,
      jumping: false,
      rotation: 0,
    };
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.left = true;
      if (e.key === 'ArrowRight') keys.right = true;
      if (e.key === ' ' && !player.jumping) {
        player.vy = -12;
        player.jumping = true;
      }
    };
  
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.left = false;
      if (e.key === 'ArrowRight') keys.right = false;
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    const update = () => {
      if (keys.left) player.vx = -player.speed;
      else if (keys.right) player.vx = player.speed;
      else player.vx *= friction;
  
      player.vy += gravity;
      player.x += player.vx;
      player.y += player.vy;
  
      if (player.y + player.height >= floorY) {
        player.y = floorY - player.height;
        player.vy = 0;
        player.jumping = false;
        player.rotation = 0;
      } else {
        player.rotation += 0.1;
      }
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = '#444';
      ctx.fillRect(0, floorY, canvas.width, canvas.height - floorY);
  
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      ctx.rotate(player.rotation);
      ctx.fillStyle = '#f24';
      ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
      ctx.restore();
  
      requestAnimationFrame(update);
    };
  
    update();
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.style.overflow = originalOverflow;
    };
  }
  